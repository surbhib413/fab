import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from "chart.js";
import ChartDataLabels from "node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js";
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {

  @Input() heatMapData: any;
  @Output() updatelegend: EventEmitter<any> = new EventEmitter();


  @ViewChild("stackedHeatMap") chart: ElementRef;
  stackedHeatMap: any;
  updateGraph: boolean;

  labels = [];
  dataset = [];
  heatMapOptions = {};
  backgroundColors = ["#ECF2FA", "#DAE5F6", "#BBD1F3", "#8EA8D3", "#537DC1"];
  max = 0;
  data = [];
  regionNames = [];
  // max = 1000000;

  // data = [
  //   [90, 70, 50, 30, 10],
  //   [73, 59, 90, 65, 23],
  //   [12, 87, 0, 76, 33],
  //   [90, 89, 99, 0, 46],
  //   [67, 33, 54, 9, 87]
  // ];

  // data = [
  //   [90, 70, 50, 30, 10],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [90, 70, 50, 30, 10],
  //   [0, 0, 0, 0, 0],
  // ];

  // regionNames = ["N.America", "S.America", "Africa", "Europe", "Middle East"];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.updateHeatMapService.subscribe(res => {
      this.updateGraph = res;
    });
  }
  ngOnChanges(changes) {
    if (Object.keys(this.heatMapData).length > 0) {

      this.data = this.heatMapData.data;
      this.regionNames = this.heatMapData.regionNames;
      this.max = this.heatMapData.max;

      let interval = Math.round(this.max / 5);

      let ranges = [];
      let minVal = 0;
      let maxVal = 0;
      for (let i = 0; i < 5; i++) {
        maxVal = minVal + interval;
        ranges.push({ min: minVal, max: maxVal, bgColor: this.backgroundColors[i] });
        minVal = maxVal;
      }
      this.updatelegend.emit(ranges);
      const ctx = this.chart.nativeElement.getContext("2d");

      // const grad1 = ctx.createLinearGradient(0, 0, 10, 20);
      // grad1.addColorStop(0, "rgba(113, 173, 255,0.1)");
      // grad1.addColorStop(1, "rgba(0, 48, 135,0.1)");

      // const grad2 = ctx.createLinearGradient(200, 0, 0, 0);
      // grad2.addColorStop(0, "rgba(113, 173, 255,0.2)");
      // grad2.addColorStop(1, "rgba(0, 48, 135,0.2)");

      // const grad3 = ctx.createLinearGradient(200, 0, 0, 0);
      // grad3.addColorStop(0, "rgba(113, 173, 255,0.5)");
      // grad3.addColorStop(1, "rgba(0, 48, 135,0.5)");

      // const grad4 = ctx.createLinearGradient(200, 0, 0, 0);
      // grad4.addColorStop(0, "rgba(113, 173, 255,0.8)");
      // grad4.addColorStop(1, "rgba(0, 48, 135,0.8)");

      // const grad5 = ctx.createLinearGradient(0, 100, 0, 0);
      // grad5.addColorStop(0, "rgba(113, 173, 255,1)");
      // grad5.addColorStop(1, "rgba(0, 48, 135,1)");

      let ticks = [];

      if (this.heatMapData.regionNames)
        for (let i = 0, val = 0; i <= this.heatMapData.regionNames.length; i++ , val += 10) {
          ticks.push(val);
        }
      this.heatMapOptions = {
        events: [],
        tooltips: {
          enabled: false
        },
        showTooltips: false,
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
                max: ticks[ticks.length - 1]
              },
              afterBuildTicks: function (scale) {
                scale.ticks = ticks;
                return;
              },
              scaleLabel: {
                display: false
              },
              gridLines: {
                borderDash: [3, 3],
                color: "#9b9b9b",
                drawBorder: true
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              barPercentage: 1.25,
              gridLines: {
                borderDash: [3, 3],
                color: "#9b9b9b",
                drawBorder: false
              },
              ticks: {
                fontFamily: "fs_matthew_light",
                fontSize: 10,
                color: "#485465"
              },
              stacked: true
            }
          ]
        },
        legend: {
          display: false
        }
      };

      if (this.heatMapData.labels) {
        this.labels = [];
        this.heatMapData.labels.forEach(ele => {
          if (ele.length > 10) {
            this.labels.push(
              ele.charAt(0).toUpperCase() + ele.substring(1, 7) + ".."
            );
          } else {
            this.labels.push(ele.charAt(0).toUpperCase() + ele.slice(1));
          }
        });
      }

      // this.labels = this.heatMapData.labels;

      const dataset = [];

      if (this.data)
        this.data.forEach(dataArr => {
          let data = [10];
          let backgroundColor = ["#ffffff"];
          dataArr.forEach(val => {

            data.push(10);


            if (val == 0) {
              backgroundColor.push("#FFFFFF");
            }
            else if (val > ranges[0].min && val <= ranges[0].max) {
              backgroundColor.push(this.backgroundColors[0]);
            }
            else if (val > ranges[1].min && val <= ranges[1].max) {
              backgroundColor.push(this.backgroundColors[1]);
            }
            else if (val > ranges[2].min && val <= ranges[2].max) {
              backgroundColor.push(this.backgroundColors[2]);
            }
            else if (val > ranges[3].min && val <= ranges[3].max) {
              backgroundColor.push(this.backgroundColors[3]);
            }
            else if (val > ranges[4].min && val <= ranges[4].max) {
              backgroundColor.push(this.backgroundColors[4]);
            }

          });
          dataset.push({
            data: data,
            backgroundColor: backgroundColor,
            datalabels: {
              formatter: (value, ctx) => {
                if (ctx.dataIndex == 0) {
                  return this.regionNames[ctx.datasetIndex];
                } else {
                  return "";
                }
              },
              align: "center",
              anchor: "center",
              color: "#485465",
              font: {
                size: "10",
                family: "fs_matthew_light"
              }
            }
          });
        });

      this.dataset = dataset;

      if (this.updateGraph) {
        this.stackedHeatMap.data.labels = this.labels;
        this.stackedHeatMap.data.datasets = this.dataset;
        this.stackedHeatMap.options = this.heatMapOptions;
        this.stackedHeatMap.update();
        this.sharedService.updateHeatMap(false);
      } else {
        this.stackedHeatMap = new Chart(ctx, {
          type: "horizontalBar",
          data: {
            labels: this.labels,
            datasets: this.dataset
          },
          plugins: [ChartDataLabels],
          options: this.heatMapOptions
        });
      }
    }
  }

}
