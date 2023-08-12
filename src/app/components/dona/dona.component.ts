import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'component-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnChanges{


  @Input('titulo') titleGraphic: string = 'Sin Titulo';
  @Input('labels') labelsDoughbut: string[] = ['Label1','Label2','Label3'];
  @Input('data') dataDoughbut: number[] = [1,2,3]


  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: []
  }


  ngOnChanges(): void {
    this.doughnutChartData = {
      labels: this.labelsDoughbut,
      datasets: [{
        data: this.dataDoughbut,
        backgroundColor: [
          '#6857e6',
          '#009fee',
          '#f02059'
        ],
      }],
    };
  }
}
