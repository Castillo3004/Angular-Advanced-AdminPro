import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public invtervalSubs: Subscription | undefined;


  constructor(){

    // this.retornaObservale().pipe(
    //   retry(1)
    // )
    // .subscribe( valor => console.log('Subs:', valor),
    //             err => console.warn('Error', err),
    //             () => console.info('Obs completado')
    // )

    this.invtervalSubs = this.retornaIntervalo()
      .subscribe( console.log )
  }


  ngOnDestroy(): void {
    this.invtervalSubs?.unsubscribe();
  }


  retornaIntervalo(): Observable<number> {

    return interval( 100 ).pipe(
      // take(10),
      map( val => val + 1),
      filter( val => (val % 2 === 0) ? true : false),
    );
  }


  retornaObservale(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next( i );

        if( i === 4 ){
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2){
          observer.error('i llego al valor de 2');
          clearInterval( intervalo );
        }

      }, 1000);

    });

    return obs$;

  }

}
