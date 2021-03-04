import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from "chart.js";
import ChartDataLabels from "node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js";
@Component({
  selector: 'app-mirror-chart',
  templateUrl: './mirror-chart.component.html',
  styleUrls: ['./mirror-chart.component.scss']
})
export class MirrorChartComponent implements OnInit {

  constructor() {
    Chart.plugins.unregister(ChartDataLabels);
  }

  @Input() mirrorChartData: any;
  @ViewChild("mirroChart") chart: ElementRef;
  mirroChart: any;

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.mirrorChartData) {

      console.log("mirror chart data", this.mirrorChartData);

      const ctx = this.chart.nativeElement.getContext("2d");

      const grad2 = ctx.createLinearGradient(500, 0, 100, 0);
      grad2.addColorStop(0, "#ffffff");
      grad2.addColorStop(1, "rgba(	138, 215, 94,0.5)");
      const grad1 = ctx.createLinearGradient(400, 0, 100, 0);
      grad1.addColorStop(0, "rgba(230, 89, 89,0.4)");
      grad1.addColorStop(1, "#ffffff");
      let labels = [];
      for (let i = 0; i < this.mirrorChartData.maxRecords; i++) {
        labels.push(i);
      }
      let beneficiaryData = this.mirrorChartData.beneficiaryData;
      let payerData = this.mirrorChartData.payerData;
      let currencyType = this.mirrorChartData.currencyType;

      var options = {
        layout: {
          padding: {
            top: 5
          }
        },
        tooltips: false,
        scales: {
          yAxes: [
            {
              display: true,
              barThickness: 28,
              ticks: {
                fontSize: 12,
                display: false
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              stacked: true
            }
          ],
          xAxes: [
            {
              stacked: true,
              ticks: {
                callback: function (t, i) {
                  return t < 0 ? Math.abs(t) : t;
                },
                display: false
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ]
        },
        responsive: true,
        legend: {
          display: false
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      };

      let dataSet = [
        {
          label: "Beneficiary",
          data: beneficiaryData,
          backgroundColor: grad1,
          borderColor: "#e65959",
          borderWidth: {
            top: 0,
            right: 2,
            bottom: 0,
            left: 0
          },
          datalabels: {
            formatter: (value, ctx) => {
              return value + currencyType + " AED";
            },
            color: "#4e5f73",
            font: {
              size: 10,
              family: "fs_matthew_light"
            },
            align: "start",
            anchor: "end"
          }
        },
        {
          label: "Payer",
          data: payerData,
          backgroundColor: grad2,
          borderColor: "#8ad75e",
          borderWidth: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 2
          },
          datalabels: {
            formatter: (value, ctx) => {
              return Math.abs(value) + currencyType + "AED";
            },
            color: "#4e5f73",
            font: {
              size: 10,
              family: "fs_matthew_light"
            },
            align: "end",
            anchor: "start"
          }
        }
      ];

      this.mirroChart = new Chart(ctx, {
        type: "horizontalBar",
        data: {
          labels: labels,
          datasets: dataSet
        },
        plugins: [ChartDataLabels],
        options: options
      });
    }
  }



}
