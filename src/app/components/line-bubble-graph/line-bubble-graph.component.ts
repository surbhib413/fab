import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import ChartAnnotationsPlugin from "chartjs-plugin-annotation";

@Component({
  selector: 'app-line-bubble-graph',
  templateUrl: './line-bubble-graph.component.html',
  styleUrls: ['./line-bubble-graph.component.scss']
})
export class LineBubbleGraphComponent implements OnInit {

  constructor() {
    Chart.plugins.register(ChartAnnotationsPlugin);
  }

  @ViewChild("bubbleLine") chart: ElementRef;
  bubbleLine: any;

  ngOnInit() {
    setTimeout(() => {
      const ctx = this.chart.nativeElement.getContext("2d");
      let borderColor = "#996ed5";
      const fillGrad = ctx.createLinearGradient(0, 600, 0, 100);
      fillGrad.addColorStop(0, "rgba(255,255,255,0.1)");
      fillGrad.addColorStop(1, "rgba(	153, 110, 213,0.1)");
      let options = {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
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
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 40,
              borderColor: "#da291c",
              borderWidth: 1
              // label: {
              //   enabled: false,
              //   content: "Test label"
              // }
            }
          ]
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
      };
      this.bubbleLine = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              data: [10, 20, 15, 30, 20, 25, 15, 20, 30, 20, 25, 15],
              backgroundColor: fillGrad,
              lineTension: 0.2,
              borderWidth: 2,
              borderColor: borderColor,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: borderColor,
              pointHoverRadius: 8
            },
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
                  y: 60
                },
                {
                  y: null
                },
                {
                  y: 50
                },
                {
                  y: null
                },
                {
                  y: 65
                },
                {
                  y: null
                },
                {
                  y: 60
                },
                {
                  y: null
                }
              ],
              backgroundColor: "#ffffff",
              borderColor: "#8ad75e",
              borderWidth: 2,
              radius: 7,
              hoverBackgroundColor: "#ffffff",
              hoverRadius: 0
            },
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
                  y: 35
                },
                {
                  y: null
                },
                {
                  y: 30
                },
                {
                  y: null
                },
                {
                  y: 35
                },
                {
                  y: null
                },
                {
                  y: 50
                },
                {
                  y: null
                },
                {
                  y: 35
                },
                {
                  y: null
                }
              ],
              backgroundColor: "#ffffff",
              borderColor: "#da291c",
              borderWidth: 2,
              radius: 7,
              hoverBackgroundColor: "#ffffff",
              hoverRadius: 0
            }
          ],
          labels: ["18 Oct", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
        },
        options: options
      });
    }, 500);
  }

}
