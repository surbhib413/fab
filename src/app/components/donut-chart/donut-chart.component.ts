import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import * as d3 from "d3";
import { AccountService } from "src/app/service/account.service";

@Component({
  selector: "app-donut-chart",
  templateUrl: "./donut-chart.component.html",
  styleUrls: ["./donut-chart.component.scss"]
})
export class DonutChartComponent implements OnInit {
  private htmlElement: HTMLElement;
  @Input() details;
  entityList = [
    "All Entity",
    "Consulting",
    "Tax",
    "Audit & Assurance",
    "Shared Service"
  ];
  bankList = ["All Bank", "FAB", "ENBD", "ADCB"];
  options = ["Account Currency", "Converted Value"];
  currencyList = ["AED", "USD", "INR", "EURO"];
  dropdownList = [];
  seedData: any;
  amount: number;
  currency: string;
  donutText: string;
  legend: any;
  colorCodes = ["#f5ddbc", "#d0e7b7", "#b1e9cc", "#c3d4eb", "#edbcbe"];
  showFilters: boolean = true;
  showFirstFilter: boolean = true;
  @ViewChild("donutChart") elementRef: ElementRef;

  constructor(private accountService: AccountService) {}

  dropDownChange(value) {
    let key = "";
    if (value === this.dropdownList[0]) {
      value = "";
    } else {
      key = this.details.dropDownType;
    }
    this.getAccountDataForDonut(this.details.groupName, key, value);
  }

  getDonutData(response) {
    const length = response.keys.length;
    const data = [];
    let totalVal = 0;
    if (length !== 0) {
      for (let i = 0; i < length; i++) {
        const obj = {
          label: Math.round(response.percentages[i]) + "%",
          value: response.percentages[i]
        };
        data.push(obj);
        totalVal += response.sum_values;
      }
      //this.amount = totalVal / 1000000000;
      this.legend = response.keys;
    }
    return data;
  }

  getAccountDataForDonut(groupName, key, value) {
    this.accountService.getAccountsData(
      (response, err) => {
        if (response) {
          this.seedData = this.getDonutData(response);
        } else {
          this.seedData = [];
        }
        //console.log(this.seedData);
        this.updateDonutChart(
          this.seedData,
          this.amount,
          this.currency,
          this.donutText
        );
        if (err) {
          console.log("error", err);
        }
      },
      groupName,
      key,
      value
    );
  }

  ngOnInit() {
    this.htmlElement = this.elementRef.nativeElement;
    this.amount = 3.44;
    this.currency = "AED";
    this.donutText = "Total Balance";
    if (this.details.dropDownType === "entity_name") {
      this.dropdownList = this.entityList;
    } else if (this.details.dropDownType === "bank_name") {
      this.dropdownList = this.bankList;
    } else if (this.details.dropDownType === "none") {
      this.showFilters = false;
    } else if (this.details.dropDownType === "currency") {
      this.showFirstFilter = false;
    }

    if (this.details.groupName === "account") {
      //Hardcoded
      this.seedData = this.getDummyData();
      this.legend = ["FAB", "ENBD", "ADCB", "SBI", "ABC"];
      this.updateDonutChart(
        this.seedData,
        this.amount,
        this.currency,
        this.donutText
      );
    } else if (this.details.groupName === "cards") {
      //Hardcoded
      this.seedData = this.getDummyData1();
      this.legend = ["FAB", "ENBD", "ADCB", "SBI", "ABC"];
      this.updateDonutChart(
        this.seedData,
        this.amount,
        this.currency,
        this.donutText
      );
    } else if (this.details.groupName === "loan") {
      //Hardcoded
      this.seedData = this.getDummyData2();
      this.legend = ["FAB", "ENBD", "ADCB", "SBI", "ABC"];
      this.updateDonutChart(
        this.seedData,
        this.amount,
        this.currency,
        this.donutText
      );
    } else if (this.details.groupName === "deposit") {
      //Hardcoded
      this.seedData = this.getDummyData3();
      this.legend = ["AED", "USD", "SAR", "EURO", "INR"];
      this.updateDonutChart(
        this.seedData,
        this.amount,
        this.currency,
        this.donutText
      );
    } else if (this.details.groupName === "charges") {
      //Hardcoded
      this.seedData = this.getDummyData();
      this.legend = [
        "FX",
        "Overdraft",
        "Transaction",
        "Subscription",
        "Others"
      ];
      this.updateDonutChart(
        this.seedData,
        this.amount,
        this.currency,
        this.donutText
      );
    } else {
      //Functional graph
      this.getAccountDataForDonut(this.details.groupName, "", "");
    }
  }

  getDummyData() {
    let d = [
      { label: "35%", value: 35 },
      { label: "10%", value: 10 },
      { label: "15%", value: 15 },
      { label: "20%", value: 20 },
      { label: "20%", value: 20 }
    ];
    return d;
  }

  getDummyData1() {
    let d = [
      { label: "25%", value: 25 },
      { label: "20%", value: 20 },
      { label: "15%", value: 15 },
      { label: "10%", value: 10 },
      { label: "30%", value: 30 }
    ];
    return d;
  }

  getDummyData2() {
    let d = [
      { label: "35%", value: 35 },
      { label: "10%", value: 10 },
      { label: "5%", value: 5 },
      { label: "20%", value: 20 },
      { label: "10%", value: 10 }
    ];
    return d;
  }

  getDummyData3() {
    let d = [
      { label: "35%", value: 35 },
      { label: "20%", value: 20 },
      { label: "25%", value: 25 },
      { label: "20%", value: 20 }
    ];
    return d;
  }

  updateDonutChart(seedData, amount, currency, donutText) {
    //console.log('seeddata',seedData,amount,currency,donutText);
    // tslint:disable-next-line: one-variable-per-declaration
    // Define size & radius of donut pie chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Define arc colours
    // const colour = d3.scaleOrdinal(d3.schemeBlues[9]);
    // const colour = d3.scaleOrdinal(d3.schemeCategory10);
    const colour = d3.scaleOrdinal(this.colorCodes);
    // Define arc ranges
    const arcText = d3.scaleOrdinal().range([0, width]);

    // Determine size of arcs
    const arc = d3
      .arc()
      .innerRadius(radius - 80)
      .outerRadius(radius - 10);

    // Create the donut pie chart layout
    const pie = d3
      .pie()
      .value(function(d) {
        return d["value"];
      })
      .sort(null);

    //console.log('pie',pie);

    // Append SVG attributes and append g to the SVG
    // const svg = d3.select('#donut-chart')
    const svg = d3
      .select(this.htmlElement)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    //console.log('svg',svg);
    // Define inner circle
    svg
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 100)
      .attr("fill", "#fff");

    // Calculate SVG paths and fill in the colours
    const g = svg
      .selectAll(".arc")
      .data(pie(<any>seedData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Append the path to each g
    g.append("path")
      .attr("d", <any>arc)
      .attr("fill", function(d, i) {
        return colour(<any>i);
      })
      .attr("stroke", "#fff") // <-- THIS
      .attr("stroke-width", "6"); // <-- THIS;

    // Append text labels to each arc
    g.append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(<any>d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .attr("fill", "#fff")
      .text(function(d, i) {
        return seedData[i].label;
      });

    g.selectAll(".arc text")
      .attr("fill", "#969995")
      .style("font", "14px fs_matthew_medium")
      .call(this.wrap, arcText.range([0, width]));

    // Append text to the inner circle
    svg
      .append("text")
      .attr("dy", "-0.5em")
      .style("text-anchor", "middle")
      .attr("class", "inner-circle small-text")
      .attr("fill", "#36454f")
      .text(function(d) {
        return donutText;
      });

    svg
      .append("text")
      .attr("dy", "1.0em")
      .style("text-anchor", "middle")
      .attr("class", "inner-circle big-text")
      .attr("fill", "#36454f")
      .text(function(d) {
        return amount + " " + currency;
      });
  }
  wrap(text, width) {
    text.each(function() {
      let text = d3.select(this);
      let words = text
        .text()
        .split(/\s+/)
        .reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      let lineHeight = 1.1; // ems
      let y = text.attr("y");
      let dy = parseFloat(text.attr("dy"));
      let tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > 90) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }
}
