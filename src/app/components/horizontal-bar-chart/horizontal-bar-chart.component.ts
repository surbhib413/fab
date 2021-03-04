import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {

  @ViewChild('horiBarChart') elementRef: ElementRef;
  private htmlElement: HTMLElement;

  data =	[
    {"beneficiary": "Payroll ", "value": 300},
    {"beneficiary": "Travel ", "value": 150},
    {"beneficiary": "Utilities ", "value": 50},
    {"beneficiary": "Vendor ", "value": 160},
    {"beneficiary": "Lease ", "value": 230},
  ];
  dropdownList = ['All Entity', 'Consulting', 'Tax', 'Audit & Assurance', 'Deloitte Shared Service'];
  options = ['Account Currency', 'Converted Value'];
  currencyList = ['AED', 'USD', 'INR', 'EURO'];
  colorCodes = ['#c3d4eb', '#f5ddbc', '#d0e7b7','#b1e9cc','#edbcbe'];

  constructor() { }

  ngOnInit() {
    this.htmlElement = this.elementRef.nativeElement;
    this.updateHorizontalBarChart(this.data);
  }

  updateHorizontalBarChart(data){

    let width = 470;
    let height = 300;
    
    const margin = {top: 20, right: 20, bottom: 30, left: 60};
    

    const svg = d3.select(this.htmlElement)
    .attr('width', width)
    .attr('height', height);

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain([0, d3.max(data, function(d: any) { return parseInt(d.value); })]);
    y.domain(data.map(function(d) { return d.beneficiary; })).padding(0.5);

    const colour = d3.scaleOrdinal(this.colorCodes);

    g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));
        
        g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr('fill', function(d, i) {
          return colour(<any>i);
        })
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", function(d:any) { return y(d.beneficiary); })
        .attr("width", function(d:any) { return x(d.value); });

        var h= height+20;
 // add the X gridlines
    svg.append("g")		
      .attr("transform", "translate(60," + h + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          // @ts-ignore: Unreachable code error
          .tickFormat('')
      )

      function make_x_gridlines() {	
            return d3.axisBottom(x)
                .ticks(7)
        }

    svg.selectAll("line")
    .attr('stroke','#e3e3e4')
    .attr('stroke-opacity', 0.7)
    .attr('shape-rendering','crispEdges')

    svg.selectAll("path")
    .attr('stroke-width',0);

    svg.selectAll('text')
    .attr('fill','#323232')
    .style('font', '12px fs_matthew_light');
  }

}
