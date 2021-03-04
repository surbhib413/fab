import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import * as D3 from 'd3';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.scss']
})
export class MultiLineChartComponent implements OnInit {

  @Input() displayFilters;
  dropdownList = ['All Entity', 'Consulting', 'Tax', 'Audit & Assurance', 'Deloitte Shared Service'];
  options = ['Account Currency', 'Converted Value'];
  currencyList = ['AED', 'INR', 'DOLLAR'];
  seedData: any;

  @ViewChild('multilineChart') elementRef: ElementRef;
  private htmlElement: HTMLElement;
  constructor(private accountService: AccountService, private datePipe: DatePipe) { }

  ngOnInit() {
    // get forecast data
    this.getForecastData();
    // for sending by default date range
    let currentDate = new Date().toISOString();
    let oneWeekAgo = new Date();
    let oneWeekAgoIso = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)).toISOString();
    // for sending by default date range ends

    this.getAccountDataForLineChart(oneWeekAgoIso, currentDate);
    this.htmlElement = this.elementRef.nativeElement;
  }


  // get data and feed to line graph library
  getAccountDataForLineChart(start_date, end_date) {
    this.accountService.getLineChartData((response, err) => {
      if (response) {
        this.seedData = this.massageLineChartData(response);
        console.log('line chart response' + this.seedData);
        if (this.seedData.length > 0) {
          // this.setup(this.seedData);
        }
      } else {
        this.seedData = [];
      }
      //   this.updateDonutChart(this.seedData, this.amount, this.currency, this.donutText);
      if (err) {
        console.log('error in line chart data', err);
      }
    }, start_date, end_date);
  }


  // massaging data to convert into iso format
  massageLineChartData(rawData) {
    let massagedData = [];
    rawData.forEach(element => {
      element = { ...element, transaction_date: (new Date(parseInt(element.transaction_date)).toISOString()).split("T")[0] }
      console.log(new Date(parseInt(element.transaction_date)).toISOString());
      massagedData.push(element);
    });
    console.log('massagedData' + massagedData)
    return massagedData;
  }


  // line chart library code
  setup(historyData, data) {
    if (D3.select("#multi-line-chart")) {
      D3.select("#multi-line-chart").selectAll("*").remove();
    }

    
    let history = historyData;
    let forecast;
    
    forecast = data;

    let forecast1 = [
      { available_balance: "0.7261022599", transaction_date: "2018-12-30" },
      { available_balance: "1", transaction_date: "2018-12-31" },
      { available_balance: "1", transaction_date: "2019-01-01" },
      { available_balance: "1", transaction_date: "2019-02-01" },
      { available_balance: "1", transaction_date: "2019-03-01" },
      { available_balance: "1", transaction_date: "2019-04-01" },
      { available_balance: "1", transaction_date: "2019-05-30" },
      { available_balance: "1", transaction_date: "2019-06-30" },
      { available_balance: "1", transaction_date: "2019-07-29" },
      { available_balance: "1", transaction_date: "2019-08-01" },
      { available_balance: "1", transaction_date: "2019-09-01" },
      { available_balance: "1", transaction_date: "2019-10-01" },
    ]
    

    let forecast2 = [
      { transaction_date: '2019-08-25' },
      { transaction_date: '2019-08-26' },
      { transaction_date: '2019-08-27' },
      { transaction_date: '2019-08-28' },
      { transaction_date: '2019-08-29' },
      { transaction_date: '2019-08-30' },
    ];

    let history1 = [
      { available_balance: "10616159.4605323", transaction_date: "2017-01-30" },
      { available_balance: "10608939.450952299", transaction_date: "2017-02-27" },
      { available_balance: "10027436.894512299", transaction_date: "2017-03-30" },
      { available_balance: "10019354.983193401", transaction_date: "2017-04-29" },
      { available_balance: "10027356.236327801", transaction_date: "2017-05-30" },
      { available_balance: "10012261.924358699", transaction_date: "2017-06-29" },
      { available_balance: "9348858.103476699", transaction_date: "2017-07-30" },
      { available_balance: "9348858.848284399", transaction_date: "2017-08-30" },
      { available_balance: "9348858.607469499", transaction_date: "2017-09-29" },
      { available_balance: "9148858.153139399", transaction_date: "2017-10-30" },
      { available_balance: "9048858.2334575", transaction_date: "2017-11-29" },
      { available_balance: "9348858.216612101", transaction_date: "2017-12-30" },
      { available_balance: "8648858.1153729297", transaction_date: "2018-01-30" },
      { available_balance: "7829456.6956249494", transaction_date: "2018-02-27" },
      { available_balance: "7565708.7108786702", transaction_date: "2018-03-30" },
      { available_balance: "7018764.9671485703", transaction_date: "2018-04-29" },
      { available_balance: "5529479.44406664", transaction_date: "2018-05-30" },
      { available_balance: "5419297.7658840399", transaction_date: "2018-06-29" },
      { available_balance: "5032208.0809028205", transaction_date: "2018-07-30" },
      { available_balance: "5019678.3969647", transaction_date: "2018-08-30" },
      { available_balance: "4141169.3356426898", transaction_date: "2018-09-29" },
      { available_balance: "3361368.4347155103", transaction_date: "2018-10-30" },
      { available_balance: "3229728.7281840001", transaction_date: "2018-11-29" },
      { available_balance: "216790.7281840001", transaction_date: "2018-12-30" }
    ]

    let history2 = [
      { available_balance: "10016159.4605323", transaction_date: "2017-01-30" },
      { available_balance: "9848858.450952299", transaction_date: "2017-02-27" },
      { available_balance: "9648858.894512299", transaction_date: "2017-03-30" },
      { available_balance: "9048858.983193401", transaction_date: "2017-04-29" },
      { available_balance: "8848858.236327801", transaction_date: "2017-05-30" },
      { available_balance: "8548858.924358699", transaction_date: "2017-06-29" },
      { available_balance: "8348858.103476699", transaction_date: "2017-07-30" },
      { available_balance: "7348858.848284399", transaction_date: "2017-08-30" },
      { available_balance: "6348858.607469499", transaction_date: "2017-09-29" },
      { available_balance: "6148858.153139399", transaction_date: "2017-10-30" },
      { available_balance: "6048858.2334575", transaction_date: "2017-11-29" },
      { available_balance: "5548858.216612101", transaction_date: "2017-12-30" },
      { available_balance: "5048858.1153729297", transaction_date: "2018-01-30" },
      { available_balance: "4929456.6956249494", transaction_date: "2018-02-27" },
      { available_balance: "4865708.7108786702", transaction_date: "2018-03-30" },
      { available_balance: "4618764.9671485703", transaction_date: "2018-04-29" },
      { available_balance: "4494795.44406664", transaction_date: "2018-05-30" },
      { available_balance: "4219297.7658840399", transaction_date: "2018-06-20" },
      { available_balance: "4432208.0809028205", transaction_date: "2018-07-15" },
      { available_balance: "4419678.3969647", transaction_date: "2018-08-01" },
      { available_balance: "4541169.3356426898", transaction_date: "2018-09-01" },
      { available_balance: "4061368.4347155103", transaction_date: "2018-10-01" },
      { available_balance: "3929728.7281840001", transaction_date: "2018-11-01" },
      { available_balance: "386790.7281840001", transaction_date: "2018-12-01" }
    ];

    const parseTime = D3.timeParse('%Y-%m-%d');
    // @ts-ignore: Unreachable code error 

    history = history.map((d) => {
      return {
        // @ts-ignore: Unreachable code error 
        transaction_date: parseTime(d.transaction_date),
        // @ts-ignore: Unreachable code error 
        available_balance: d.available_balance,
      };
    });
    // @ts-ignore: Unreachable code error 
    history1 = history1.map((d) => {
      return {
        // @ts-ignore: Unreachable code error 
        transaction_date: parseTime(d.transaction_date),
        // @ts-ignore: Unreachable code error 
        available_balance: d.available_balance,
      };
    });
    // @ts-ignore: Unreachable code error 
    history2 = history2.map((d) => {
      return {
        // @ts-ignore: Unreachable code error 
        transaction_date: parseTime(d.transaction_date),
        // @ts-ignore: Unreachable code error 
        available_balance: d.available_balance,
      };
    });

    const predict = (data, newX) => {
      const round = n => Math.round(n * 100) / 100;
      const sum = data.reduce((acc, pair) => {
        const x = pair[0];
        const y = pair[1];

        if (y !== null) {
          acc.x += x;
          acc.y += y;
          acc.squareX += x * x;
          acc.product += x * y;
          acc.len += 1;
        }

        return acc;
      }, { x: 0, y: 0, squareX: 0, product: 0, len: 0 });

      const rise = (sum.len * sum.product) - (sum.x * sum.y);
      const run = (sum.len * sum.squareX) - (sum.x * sum.x);
      const gradient = run === 0 ? 0 : round(rise / run);
      const intercept = round((sum.y / sum.len) - ((gradient * sum.x) / sum.len));

      return round((gradient * newX) + intercept);
    };
    // @ts-ignore: Unreachable code error 
    const historyIndex = history.map((d, i) => [i, d.volume]);
    // @ts-ignore: Unreachable code error 
    const historyIndex1 = history1.map((d, i) => [i, d.volume]);
    // @ts-ignore: Unreachable code error 
    const historyIndex2 = history2.map((d, i) => [i, d.volume]);
    // @ts-ignore: Unreachable code error 
    forecast = forecast.map((d, i) => {
      return {
        transaction_date: parseTime(d.transaction_date),
        // @ts-ignore: Unreachable code error 
        available_balance: d.available_balance
      }
    });

    // @ts-ignore: Unreachable code error 
    forecast1 = forecast1.map((d, i) => {
      return {
        transaction_date: parseTime(d.transaction_date),
        // @ts-ignore: Unreachable code error 
        available_balance: d.available_balance
      }
    });
    // @ts-ignore: Unreachable code error 
    forecast2 = forecast2.map((d, i) => {
      return {
        transaction_date: parseTime(d.transaction_date),
        available_balance: predict(historyIndex2, historyIndex2.length - 1 + i),
      }
    });

    // @ts-ignore: Unreachable code error 
    forecast.unshift(history[history.length - 1]);
    // @ts-ignore: Unreachable code error 
    forecast1.unshift(history1[history1.length - 1]);
    // @ts-ignore: Unreachable code error 
    forecast2.unshift(history2[history2.length - 1]);


    const chart = D3.select(this.htmlElement);
    const margin = { top: 20, right: 40, bottom: 30, left: 70 };
    const width = 650 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    const tooltip = { width: 100, height: 100, x: 10, y: -30 };
    const innerChart = chart.append('g')
      .attr('transform', `translate(${margin.left} ${margin.top})`);



    var svg = D3.select(this.htmlElement).append("svg").attr('class', 'trend');


    // Add X and Y axis  

    const x = D3.scaleTime().rangeRound([0, width]);
    const y = D3.scaleLinear().rangeRound([height, 0]);

    const x1 = D3.scaleTime().rangeRound([0, width]);
    const y1 = D3.scaleLinear().rangeRound([height, 0]);

    const x2 = D3.scaleTime().rangeRound([0, width]);
    const y2 = D3.scaleLinear().rangeRound([height, 0]);

    const line = D3.line()
      // @ts-ignore: Unreachable code error 
      .x(d => x(d.transaction_date))
      // @ts-ignore: Unreachable code error 
      .y(d => y(d.available_balance));
    // @ts-ignore: Unreachable code error 
    x.domain([D3.min(history, d => d.transaction_date), D3.max(forecast, d => d.transaction_date)]);
    // @ts-ignore: Unreachable code error 
    y.domain([0, D3.max(history, d => d.available_balance)]);



    // This allows to find the closest X index of the mouse:
    // @ts-ignore: Unreachable code error 
    var bisectDate = D3.bisector(d => d.transaction_date).left;


    // var bisectDate = D3.bisector(function(d) { return d.year; }).left;

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    innerChart.append('g')
      .attr('transform', `translate(0 ${height})`)
      .call(D3.axisBottom(x));

    innerChart.append('g')
      .call(D3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
    //  .text('Avocados sold');

    innerChart.append('path')
      .datum(history)
      .attr('fill', 'none')
      .attr('stroke', '#71adff')
      .attr('stroke-width', 2.5)
      // @ts-ignore: Unreachable code error 

      .attr('d', line);

    innerChart.append('path')
      .datum(history1)
      .attr('fill', 'none')
      .attr('stroke', '#13df96')
      .attr('stroke-width', 2.5)
      // @ts-ignore: Unreachable code error 

      .attr('d', line);


    innerChart.append('path')
      .datum(history2)
      .attr('fill', 'none')
      .attr('stroke', '#f7981c')
      .attr('stroke-width', 2.5)
    // @ts-ignore: Unreachable code error 

      .attr('d', line);

    innerChart.append('path')
      .datum(forecast)
      .attr('fill', 'none')
      .attr('stroke', '#71adff')
      .attr('stroke-dasharray', '10,7')
      .attr('stroke-width', 1.5)
      // @ts-ignore: Unreachable code error 
      .attr('d', line);

    innerChart.append('path')
      .datum(forecast1)
      .attr('fill', 'none')
      .attr('stroke', '#13df96')
      .attr('stroke-dasharray', '10,7')
      .attr('stroke-width', 1.5)
      // @ts-ignore: Unreachable code error 
      .attr('d', line);


    var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("circle")
      .attr("r", 5);

    focus.append("rect")
      .attr("class", "tooltip")
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

    focus.append("text")
      .attr("class", "tooltip-date")
      .attr("x", 18)
      .attr("y", -2);

    focus.append("text")
      .attr("x", 18)
      .attr("y", 18)
      .text("Likes:");


    focus.append("text")
      .attr("class", "tooltip-likes")
      .attr("x", 60)
      .attr("y", 18);

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    innerChart
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', width)
      .attr('height', height)
      //  .on('mouseover', mouseover)
      .on('mousemove', mousemove)
    //  .on('mouseout', mouseout);

    function mousemove() {
      var x0 = x.invert(D3.mouse(this)[0]),
        i = bisectDate(history, x0, 1),
        d0 = history[i - 1],
        d1 = history[i],
        // @ts-ignore: Unreachable code error 
        d = x0 - d0[x] > d1[x] - x0 ? d1 : d0;
      // @ts-ignore: Unreachable code error 
      focus.attr("transform", "translate(" + x(d.transaction_date) + "," + y(d.available_balance) + ")");
      focus.select(".tooltip-date").text((d.transaction_date));
      focus.select(".tooltip-likes").text((d.available_balance));
    }


  }

  // get forecast data
  getForecastData() {
    const history4 = [];
    const forecast4 = [];
    this.accountService.getForecastData().subscribe(
      response => {
        //const respData = response['data'];
        // respData.forEach(element => {
        //   if (element.Type.toLowerCase() === 'actual') {
        //     history4.push({
        //       available_balance: element['Running Balance'],
        //       transaction_date: element['Payment Date'].split('T')[0]
        //     });
        //   } else {
        //     forecast4.push({
        //       available_balance: element['Running Balance'],
        //       transaction_date: element['Payment Date'].split('T')[0]
        //     });
        //   }
        // });
        for (const index in response) {
          let td = this.datePipe.transform(response[index]['Payment Date'],"yyyy-MM-dd");
          if (response[index].Type.toLowerCase() === 'actual') {
            history4.push({
              available_balance: response[index]['Running Balance'],
              transaction_date: td
            });
          } else {
            forecast4.push({
              available_balance: response[index]['Running Balance'],
              transaction_date: td
            });
          }
        }
        console.log('get forecast data -- ', forecast4);
        this.setup(history4, forecast4)
      },
      err => {
        console.log('Error occured in getForecastData' + JSON.stringify(err));
      });

  }

}
