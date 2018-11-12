import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss']
})
export class DateSliderComponent implements OnInit {
  dateRange: Date[];
  minValue: number;
  maxValue: number;
  options: Options;

  @Input() labels: Array<string>;
  @Output() dateRangeChanged = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.dateRange = this.labels.map(label => new Date(label));
    this.minValue = this.dateRange[0].getTime();
    this.maxValue = this.dateRange[this.dateRange.length - 1].getTime();
    this.options = {
      stepsArray: this.dateRange.map((date: Date) => {
        return { value: date.getTime()};
      }),
      translate: (value: number, label: LabelType): string => {
        // return new Date(value).toDateString();
        return new Date(value).toISOString().substring(0, 10);
      }
    };
  }

  onDateRangeChange(event) {
    this.dateRangeChanged.emit(event);
  }
}
