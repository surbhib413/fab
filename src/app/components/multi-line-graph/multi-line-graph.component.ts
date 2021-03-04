import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-multi-line-graph",
  templateUrl: "./multi-line-graph.component.html",
  styleUrls: ["./multi-line-graph.component.scss"]
})
export class MultiLineGraphComponent implements OnInit {
  constructor() {}

  @ViewChild("lineChart") chart: ElementRef;

  lineChart = [];

  ngOnInit() {
    const ctx = this.chart.nativeElement.getContext("2d");
    const lineColor1 = "#4dd3e3";
    const lineColor2 = "#b182f2";
    const fillGrad1 = ctx.createLinearGradient(0, 500, 0, 200);
    fillGrad1.addColorStop(0, "rgba(255, 255, 255,0.1)");
    fillGrad1.addColorStop(1, "rgba(	77, 211, 227,0.1)");
    var fillGrad2 = ctx.createLinearGradient(0, 500, 0, 200);
    fillGrad2.addColorStop(0, "rgba(255, 255, 255,0.1)");
    fillGrad2.addColorStop(1, "rgba(	177, 130, 242,0.1)");
    this.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "Line1",
            data: [20, 30, 40, 35, 45, 40, 50, 55, 50, 60, 55, 45],
            backgroundColor: fillGrad1,
            lineTension: 0.2,
            borderWidth: 2,
            borderColor: lineColor1,
            // pointBorderColor: grad1,
            // pointBackgroundColor: grad1,
            pointHoverBackgroundColor: "white",
            pointHoverBorderColor: lineColor1,
            pointHoverRadius: 8
          },
          {
            label: "Line2",
            data: [40, 45, 35, 30, 35, 30, 25, 30, 20, 15, 10, 15, 5],
            backgroundColor: fillGrad2,
            lineTension: 0.2,
            borderWidth: 2,
            borderColor: lineColor2,
            // pointBorderColor: grad2,
            // pointBackgroundColor: grad2,
            pointHoverBackgroundColor: "white",
            pointHoverBorderColor: lineColor2,
            pointHoverRadius: 8
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
  }
}
