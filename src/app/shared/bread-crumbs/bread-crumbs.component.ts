import { Component, OnDestroy, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [
  ]
})
export class BreadCrumbsComponent implements OnDestroy{

  private router = inject( Router );

  public title: string = 'AdminPro';
  public titleSubs$: Subscription = new Subscription;

  constructor() {
    this.titleSubs$ =  this.getDataRoute()
      .subscribe( ({ title }) => {
        this.title = title;
        document.title = ` AdminPro | ${ title }`;
      });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getDataRoute(){

    return this.router.events.pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild == null),
      map( (event:ActivationEnd) => event.snapshot.data )
    );
  }

}
