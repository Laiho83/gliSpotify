import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((snap: any) => {
      console.log(snap.params.id)
    })
  }

  ngOnInit(): void {
  }

}
