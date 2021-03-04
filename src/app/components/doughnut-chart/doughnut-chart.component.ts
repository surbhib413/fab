import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Chart } from "chart.js";
// import "chartjs-plugin-style";
import "chartjs-plugin-doughnutlabel";
import "chartjs-plugin-labels";
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.scss"]
})
export class DoughnutChartComponent implements OnInit {
  constructor(private sharedService: SharedService) { }

  @ViewChild("donutChart") chart: ElementRef;
  @Input() doughnutData: any;
  @Input() abc: any;
  updateGraph: boolean;
  donutChart: Chart;
  ngOnInit() {

    this.sharedService.updateDoughnutChartService.subscribe(res => {
      this.updateGraph = res;
    });

  }

  ngOnChanges(changes) {
    if (Object.keys(this.doughnutData).length > 0) {
      const ctx = this.chart.nativeElement.getContext("2d");
      const grad1 = ctx.createRadialGradient(250, 133, 60, 250, 133, 130);
      grad1.addColorStop(0, "rgba(255,255,255,0.2)");
      grad1.addColorStop(1, "rgba(	138, 215, 94,0.3)");
      const grad2 = ctx.createRadialGradient(250, 133, 60, 250, 133, 130);
      grad2.addColorStop(0, "rgba(255,255,255,0.2)");
      grad2.addColorStop(1, "rgba(	251, 147, 101,0.3)");
      var grad3 = ctx.createRadialGradient(250, 133, 60, 250, 133, 130);
      grad3.addColorStop(0, "rgba(255,255,255,0.2)");
      grad3.addColorStop(1, "rgba(	41, 121, 255,0.3)");
      var grad4 = ctx.createRadialGradient(250, 133, 60, 250, 133, 130);
      grad4.addColorStop(0, "rgba(255,255,255,0.2)");
      grad4.addColorStop(1, "rgba(177,130,242,0.3)");
      const grad5 = ctx.createRadialGradient(250, 133, 60, 250, 133, 130);
      grad5.addColorStop(0, "rgba(255,255,255,0.2)");
      grad5.addColorStop(1, "rgba(	77, 211, 227,0.3)");

      const gradArray = [grad1, grad2, grad3, grad4, grad5];
      let bgColor = gradArray.slice(0, 5);


      const borderColorArray = [
        "#8ad75e",
        "#fb9365",
        "#2979ff",
        "#b182f2",
        "#4dd3e3"
      ];

      let borderColors = borderColorArray.slice(0, 5);

      let centerText = this.doughnutData.centerText;
      let dataCurrency = this.doughnutData.dataCurrency;
      let options = {
        responsive: true,
        legend: {
          display: false
        },
        // cutoutPercentage: 40,
        elements: {
          arc: {
            // borderWidth: 0,
            // borderColor: "black",
            // //borderAlign: "inner",
            // borderSkipped: false
          }
        },
        plugins: {
          labels: {
            render: function (args) {
              return args.percentage + "%\n" + "AED " + args.value + " " + dataCurrency;
            },
            fontSize: 10,
            fontColor: "#0c2340",
            fontFamily: "fs_matthew_medium"
          },
          doughnutlabel: {
            labels: [
              {
                text: centerText,
                font: {
                  family: "fs_matthew_bold",
                  size: "14"
                },
                color: "#11284a"
              },
              {
                text: "Total Transactions",
                font: {
                  family: "fs_matthew_light",
                  size: "10"
                },
                color: "#32457a"
              }
            ]
          }
        }
      };
      let data1 = {
        labels: this.doughnutData.labels,
        datasets: [
          {
            data: this.doughnutData.data,
            backgroundColor: bgColor,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      };

      if (this.updateGraph) {
        this.donutChart.data = data1;
        this.donutChart.options = options;
        this.donutChart.update();
        this.sharedService.updatedoughnutChart(false);
      } else {
        // const ctx = this.chart.nativeElement.getContext("2d");
        this.donutChart = new Chart(ctx, {
          type: "doughnut",
          data: data1,
          options: options
        });
      }

    }
  }


}
