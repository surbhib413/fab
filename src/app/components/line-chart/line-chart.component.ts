import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"]
})
export class LineChartComponent implements OnInit {
  constructor() { }

  @ViewChild("lineChart") chart: ElementRef;
  @Input() data: any;
  // @Input() grad: any;
  lineChart = [];

  ngOnChanges(changes) {
    if (this.data) {
      const ctx = this.chart.nativeElement.getContext("2d");
      var lineColor = "";
      const fillGrad = ctx.createLinearGradient(0, 500, 0, 200);
      // if (this.grad === "grad1") {
      //   lineColor = "#4dd3e3";
      //   fillGrad.addColorStop(0, "rgba(255, 255, 255,0.05)");
      //   fillGrad.addColorStop(1, "rgba(	77, 211, 227,0.05)");
      // } else if (this.grad === "grad2") {
      //   lineColor = "#fb9365";
      //   fillGrad.addColorStop(0, "rgba(255, 255, 255,0.05)");
      //   fillGrad.addColorStop(1, "rgba(244, 165, 130,0.05)");
      // } else if (this.grad === "grad3") {
      //   lineColor = "#2979ff";
      //   fillGrad.addColorStop(0, "rgba(255, 255, 255,0.05)");
      //   fillGrad.addColorStop(1, "rgba(	41, 121, 255,0.05)");
      // } else if (this.grad === "grad4") {
      //   lineColor = "#8ad75e";
      //   fillGrad.addColorStop(0, "rgba(255, 255, 255,0.05)");
      //   fillGrad.addColorStop(1, "rgba(	138, 215, 94,0.05)");
      // }

      lineColor = "rgba(0, 48, 135,0.4)";
      fillGrad.addColorStop(0, "rgba(113, 173, 255, 0.49)");
      fillGrad.addColorStop(1, "rgba(0, 48, 135,0.05)");
      let max = 0;
      if (typeof this.data !== 'undefined' && this.data.length > 0) {
        max = this.data.reduce(function (a, b) {
          return Math.max(a, b);
        });
      }

      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun", "a"],
          datasets: [
            {
              type: "bubble",
              data: [
                {
                  y: null
                },
                {
                  y: null
                },
                {
                  y: null
                },
                {
                  y: null
                },
                {
                  y: null
                },
                {
                  y: null
                },
                {
                  y: this.data[this.data.length - 1]
                }
              ],
              backgroundColor: "#ffffff",
              borderColor: "rgba(0, 48, 135,0.4)",
              borderWidth: 1,
              radius: 7,
              hoverBackgroundColor: "#ffffff",
              hoverRadius: 0
            },
            {
              label: "Line2",
              data: this.data,
              backgroundColor: fillGrad,
              lineTension: 0.3,
              borderWidth: 1,
              borderColor: lineColor
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
          plugins: {
            datalabels: {
              display: false
            }
          },
          tooltips: {
            filter: function (tooltipItem, data) {
              const type = data.datasets[tooltipItem.datasetIndex].type;
              // console.log(type);
              if (type === "line") {
                return true;
              } else {
                return false;
              }
            }
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false
                }
              }
            ]
          }
        }
      });
    }
  }
  ngOnInit() { }
}
