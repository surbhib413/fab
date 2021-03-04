import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Chart } from "chart.js";
import ChartDataLabels from "node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js";
import { forEach } from "@angular/router/src/utils/collection";
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: "app-stacked-hori-bar-chart",
  templateUrl: "./stacked-hori-bar-chart.component.html",
  styleUrls: ["./stacked-hori-bar-chart.component.scss"]
})
export class StackedHoriBarChartComponent implements OnInit {
  constructor(private sharedService: SharedService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  @Input() stackedData: any;
  @ViewChild("stackedChart") chart: ElementRef;

  stackedChart: Chart;
  // barValues = [
  //   "720M AED +6%",
  //   "630.45M AED -2%",
  //   "516.3M AED +2%",
  //   "335M AED -1%",
  //   "221M AED +3%"
  // ];
  barValues = [];
  maxVal = 0;
  backgroundColors = [
    "rgba(77, 211, 227, 0.2)",
    "rgba(177, 130, 242, 0.2)",
    "rgba(251, 147, 101, 0.2)",
    "rgba(41, 121, 255, 0.2)",
    "rgba(138, 215, 94, 0.2)"
  ];
  borderColors = ["#4dd3e3", "#b182f2", "#fb9365", "#2979ff", "#8ad75e"];
  barLabelTestData = [10, 10, 10, 10, 10];
  labels = [];
  dataset = [];
  barThickness = 32;
  updateGraph: boolean;

  ngOnInit() {
    this.sharedService.updateStackedGraphService.subscribe(res => {
      this.updateGraph = res;
    });
  }

  ngOnChanges(changes) {
    if (this.stackedData) {
      this.maxVal = this.stackedData.max;
      this.barValues = this.stackedData.barValues;
      this.labels = [];
      this.stackedData.entityNames.forEach(ele => {
        if (ele.length > 10) {
          this.labels.push(
            ele.charAt(0).toUpperCase() + ele.substring(1, 7) + ".."
          );
        } else {
          this.labels.push(ele.charAt(0).toUpperCase() + ele.slice(1));
        }
      });
      this.dataset = [];
      let dSet = [];
      for (var k in this.stackedData.graphData) {
        let obj = {};
        obj["data"] = this.stackedData.graphData[k];
        obj["label"] = k;
        obj["backgroundColor"] = this.backgroundColors.slice(
          0,
          this.labels.length
        );
        obj["borderColor"] = this.borderColors.slice(0, this.labels.length);
        obj["borderWidth"] = {
          top: 0,
          right: 1,
          bottom: 0,
          left: 0
        };
        dSet.push(obj);
      }
      dSet.push({
        data: this.barLabelTestData.slice(0, this.labels.length),
        backgroundColor: "#fff",
        datalabels: {
          formatter: (value, ctx) => {
            return this.barValues[ctx.dataIndex];
          },
          align: "end",
          anchor: "end"
        }
      });
      //console.log("datasettttt", dSet);
      this.dataset = dSet;

      var barOptions_stacked = {
        tooltips: {
          enabled: false
        },
        plugins: {
          datalabels: {
            color: "#4e5f73",
            anchor: "start",
            align: "end",
            font: {
              size: "10",
              family: "fs_matthew_light"
            },
            formatter: function (value, context) {
              return context.dataset.label;
            }
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: "fs_matthew_light",
                fontSize: 10,
                max: this.maxVal
              },
              scaleLabel: {
                display: false
              },
              gridLines: {
                display: false
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              //barPercentage: this.barPercentage,
              barThickness: this.barThickness,
              gridLines: {
                display: false
              },
              ticks: {
                fontFamily: "fs_matthew_light",
                fontSize: 10
              },
              stacked: true
            }
          ]
        },
        legend: {
          display: false
        }
      };
      if (this.updateGraph) {
        this.stackedChart.data.labels = this.labels;
        this.stackedChart.data.datasets = this.dataset;
        this.stackedChart.update();
        this.sharedService.updateStackedGraph(false);
      } else {
        const ctx = this.chart.nativeElement.getContext("2d");
        this.stackedChart = new Chart(ctx, {
          type: "horizontalBar",
          data: {
            labels: this.labels,
            datasets: this.dataset
          },
          plugins: [ChartDataLabels],

          options: barOptions_stacked
        });
      }
    }
  }
}
