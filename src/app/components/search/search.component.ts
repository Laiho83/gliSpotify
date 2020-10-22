import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, mergeMap, map } from 'rxjs/operators';
import { Store } from'@ngxs/store';
import { AddArtist } from './../../state/artist.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  public keyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription;

  constructor(
    private store: Store
  ) { 
    this.subscription = this.keyUp.pipe(
      map(event => event),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.store.dispatch(new AddArtist({name: value.toString()}));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
