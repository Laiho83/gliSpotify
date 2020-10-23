import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Store } from'@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  albumNavActive: string = '';
  history$;
  historyList = [];
  historyActive = false;

  constructor(
    private router: Router,
    private store: Store
  ) { 
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.historyActive = false;
        if(this.router.url.includes('/artist/album/')) {
          const temp = this.router.url.substr(this.router.url.lastIndexOf('/')+1).split(':')[0];
          this.albumNavActive = this.router.url.split('album/')[0]+temp;
        } else {
          this.albumNavActive = '';
        }
      }
    })
  }

  showHistory() {
    this.history$ = this.store.select(state => state.spotify);
    this.history$.subscribe(i => {
      this.historyList = [];
      if(i.artists) {
        Object.keys(i.artists).map(a => {
          this.historyList.push({
            name: a,
            artists: i.artists[a]
          })
        });
      }
    });
    this.historyActive = !this.historyActive;
  }

}
