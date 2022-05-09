import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('feedChart', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  title = 'angular13';
  ngOnInit(){
    Chart.defaults.elements.bar.borderWidth = 0;
    Chart.defaults.elements.bar.borderRadius = 10;
    this.context = this.canvas.nativeElement.getContext('2d');

    Chart.defaults.color = 'white'
    // @ts-ignore
    Chart.defaults.datasets.doughnut.cutout = '83%';
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--bs-chart-default-color');
    Chart.defaults.font.family = 'Cerebri Sans';

    // @ts-ignore
    new Chart('feedChart', {
      type: 'bar',
      options: {
        scales: {
          x: {
            grid: {
              display: false
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                console.log(value)
                return '$' + value + 'k';
              },
              stepSize: 10
            },
            stacked: true,

          },
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          maxBarThickness:10,
          label: 'Sales',
          data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32],
          backgroundColor: '#2c7be5',
          hoverBackgroundColor: '#2c7be5',
        }]
      },

    });

  }
}
