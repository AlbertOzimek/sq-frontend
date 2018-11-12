import {Component, OnInit} from '@angular/core';
import {LineChartService} from './line-chart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [LineChartService]
})
export class LineChartComponent implements OnInit {
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Market Data'
    }
  };
  labels: Array<string>;
  chartType = 'line';
  chartLegend = true;
  dataSets: Observable<Object>;
  constructor(private lineChartService: LineChartService) {
  }

  ngOnInit(): void {
    this.dataSets = this.lineChartService.getChartData();
    this.lineChartService.getChartLabels().subscribe((labels: Array<string>) => {
      this.labels = labels;
    });
  }

  onDateRangeChanged(event): void {
    this.labels = this.filterByDate(this.labels, new Date(event.value), new Date(event.highValue));
  }

  filterByDate(labels: Array<string>, fromDate: Date, toDate: Date): Array<string> {
    return labels.map(dateString => new Date(dateString))
      .filter((date: Date) =>
        date.getTime() >= fromDate.getTime() && date.getTime() <= toDate.getTime()
      ).map(date => date.toISOString().substring(0, 10));
  }
}
