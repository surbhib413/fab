import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  @ViewChild('barChart') elementRef: ElementRef;

  private htmlElement: HTMLElement;
  @Input() details;
  entityList = ['All Entity', 'Consulting', 'Tax', 'Audit & Assurance', 'Shared Service'];
  bankList = ['All Bank', 'FAB', 'ENBD', 'ADCB'];
  options = ['Account Currency', 'Converted Value'];
  currencyList = ['AED', 'USD', 'INR', 'EURO'];
  dropdownList = [];
  data = [];
  keysArray = [];
  colorCodes = ['#f5ddbc', '#d0e7b7', '#b1e9cc','#c3d4eb'];

  ngOnInit() {

    this.htmlElement = this.elementRef.nativeElement;
    if (this.details.dropDownType === 'entity_name') {
      this.dropdownList = this.entityList;
    } else if (this.details.dropDownType === 'bank_name') {
      this.dropdownList = this.bankList;
    }
    if(this.details.groupName === 'beneficiary'){
      this.transactionService.getTransactionsDataByBeneficiary().subscribe(
        response => {
          //console.log("Beneficiary chart data -- ", response);
          this.getBarChartData(response);
          this.updateBarChart(this.data);
        },
        err => {
          console.log("Error occured in getTransactionsDataByBeneficiary" + err);
        });
    }
    else{
      this.data = [
      
        {
            'key': 'Payee1',
        'value': {'bank1':20, 'bank2':10, 'bank3': 10, 'total': 40, 'yAxisName': 'Payee1' }
          },
          {
            'key': 'Payee2',
        'value': {'bank1':20, 'bank2':20, 'bank3': 20, 'total': 60, 'yAxisName': 'Payee2'}
          },
        {
            'key': 'Payee3',
        'value': {'bank1':30, 'bank2':30, 'bank3': 30, 'total': 90, 'yAxisName': 'Payee3'}
          },
        {
            'key': 'Payee4',
        'value': {'bank1':5, 'bank2':5, 'bank3': 15, 'total': 25, 'yAxisName': 'Payee4'}
          },
        {
            'key': 'Payee5',
        'value': {'bank1':10, 'bank2':5, 'bank3': 5, 'total': 20, 'yAxisName': 'Payee5'}
          }
        
        ];
      this.keysArray = ['bank1','bank2','bank3'];
      this.updateBarChart(this.data);
    }
  }

  getBarChartData(dataArray){
    let dataObj = [];
    let bankNames = [];
    dataArray.forEach(element => {
      let obj = {};
      let val = {};
      let totalSum = 0;
      for(let i=0; i<element.banks.length; i++){
        val[element.banks[i]] = element.transaction_sum[i];
        totalSum += element.transaction_sum[i];
        bankNames.push(element.banks[i]);
      }
      val['yAxisName'] = element.beneficiary.split(" ")[0];
      val['total'] = totalSum;
      obj = {
        key: element.beneficiary,
        value: val
      }
      dataObj.push(obj);
    });
    //console.log('Formatted Bar Data Object',dataObj);
    this.keysArray = bankNames.filter((el, i, a) => i === a.indexOf(el));
    this.data = dataObj;
  }

  updateBarChart(data) {
    
    let width = 470;
    let height = 300;
    
    const margin = {top: 20, right: 20, bottom: 30, left: 60};

    const svg = d3.select(this.htmlElement)
    .attr('width', width)
    .attr('height', height);

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
    	.domain([0, d3.max(data, function(d: any) { return parseInt(d.value.total)})])
      .range([1, width]).nice()

    const y = d3.scaleBand()
    .domain(data.map(d => {
      let k = d.key.split(" ")[0];
      return k}))
    .range([height, 0])
    .padding(0.5);

    const z = d3.scaleOrdinal()
    .range(this.colorCodes);

    let c = 0;

    g.append('g')
    .attr('class', 'axis x-axis')
    .attr('stroke-opacity', 0)
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(
    function(d){
		  c++;
      return d+ ''
    }).ticks(7));

    g.append('g')
    .attr('class', 'axis y-axis')
    .attr('stroke-opacity', 0)
    .call(d3.axisLeft(y).ticks(null, 's'));
    
    g.append('g')
    .selectAll('g')
    .data(d3.stack().keys(this.keysArray)(data.map(d => d.value)))
    .enter().append('g')
    .attr('fill',
    // @ts-ignore: Unreachable code error
    function(d) {return z(d.key); })
    // .attr('fill', 'red')
    .selectAll('rect')
      .data(d =>  {
        //console.log("dataaaaaaaa",d);
        return d})
    .enter().append('rect')
    .attr('x', d => x(d[0]))
    .attr('y', d => y(<any>d.data.yAxisName))
    .attr('height', y.bandwidth())
    .attr('width', d => {
      return (x(d[1]) - x(d[0]));
    });

    var h= height+20;
 // add the X gridlines
    svg.append("g")		
      .attr("transform", "translate(60," + h + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          // @ts-ignore: Unreachable code error
          .tickFormat('')
      )

    svg.selectAll("line")
    .attr('stroke','#e3e3e4')
    .attr('shape-rendering','crispEdges')

    svg.selectAll("path")
    .attr('stroke-width',0);

    svg.selectAll('text')
    .attr('fill','#323232')
    .style('font', '12px fs_matthew_light');

      function make_x_gridlines() {	
        //console.log(c);	
            return d3.axisBottom(x)
                .ticks(7)
        }
  }
  
}
