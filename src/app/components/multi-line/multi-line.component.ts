import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import "chartjs-plugin-style";

@Component({
  selector: 'app-multi-line',
  templateUrl: './multi-line.component.html',
  styleUrls: ['./multi-line.component.scss']
})
export class MultiLineComponent implements OnInit {

  constructor() { }

  @ViewChild("lineChart") chart: ElementRef;

  lineChart: any;

  ngOnInit() {

    setTimeout(() => {
      const ctx = this.chart.nativeElement.getContext("2d");
      const grad1 = ctx.createLinearGradient(600, 0, 100, 0);
      grad1.addColorStop(0, "#76b1ff");
      grad1.addColorStop(1, "#7676ff");
      const grad2 = ctx.createLinearGradient(600, 0, 100, 0);
      grad2.addColorStop(0, "#fba361");
      grad2.addColorStop(1, "#fb61e2");
      const fillGrad1 = ctx.createLinearGradient(600, 0, 100, 0);
      fillGrad1.addColorStop(0, "rgba(118,177,255,0.1)");
      fillGrad1.addColorStop(1, "rgba(118,118,255,0.1)");
      var fillGrad2 = ctx.createLinearGradient(600, 0, 100, 0);
      fillGrad2.addColorStop(0, "rgba(251, 97, 226,0.1)");
      fillGrad2.addColorStop(1, "rgba(251,163,97,0.1)");
      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1 Oct", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          datasets: [
            {
              label: "Line1",
              data: [20, 30, 40, 35, 45, 40, 50, 55, 50, 60, 55, 45],
              backgroundColor: fillGrad1,
              lineTension: 0.2,
              borderWidth: 2,
              borderColor: grad1,
              // pointBorderColor: grad1,
              // pointBackgroundColor: grad1,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: grad1,
              pointHoverRadius: 8
              //shadowOffsetX: 4,
              //shadowOffsetY: 6,
              // shadowBlur: 9,
              // shadowColor: "#88d5ff"
            },
            {
              label: "Line2",
              data: [40, 45, 35, 30, 35, 30, 25, 30, 20, 15, 10, 15, 5],
              backgroundColor: fillGrad2,
              lineTension: 0.2,
              borderWidth: 2,
              borderColor: grad2,
              pointBorderColor: grad2,
              pointBackgroundColor: grad2,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: grad2,
              pointHoverRadius: 8
              // shadowOffsetX: 4,
              // shadowOffsetY: 6,
              // shadowBlur: 9,
              // shadowColor: "#88d5ff"
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          },
          // tooltips: {
          //   mode: "index",
          //   intersect: false
          // },
          // hover: {
          //   mode: "index",
          //   intersect: false
          // },
          tooltips: {
            mode: "x-axis",
            intersect: false
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  borderDash: [3, 8],
                  color: "#9b9b9b",
                  drawBorder: false
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  borderDash: [3, 8],
                  color: "#9b9b9b",
                  drawBorder: false
                }
              }
            ]
          }
        }
      });
    }, 1500);


  }

}
