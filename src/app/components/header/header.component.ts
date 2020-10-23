import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  albumNavActive: string = '';

  constructor(private router: Router) { 
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url.includes('/artist/album/')) {
          const temp = this.router.url.substr(this.router.url.lastIndexOf('/')+1).split(':')[0];
          this.albumNavActive = this.router.url.split('album/')[0]+temp;
        } else {
          this.albumNavActive = '';
        }
      }
    })
  }

  ngOnInit() { 
  }

}
