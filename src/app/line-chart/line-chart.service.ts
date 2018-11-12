import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


interface RawData {
  mktData: [
    {
      instrumentId: number,
      timeSeries: any
    }
    ];
}

@Injectable()
export class LineChartService {

  private SOURCE_FILE = 'assets/mktdata.json';

  constructor(private http: HttpClient) {
  }

  getChartData(): Observable<Array<Object>> {
    return this.http.get(this.SOURCE_FILE)
      .pipe(
        map((rawData: RawData) => {
          return rawData.mktData.map(data => {
            const {timeSeries: {entries: entries}} = data;
            return {label: data.instrumentId, data: entries.map(entry => entry.v), fill: false};
          });
        }),
      );
  }

  getChartLabels(): Observable<Array<string>> {
    return this.http.get(this.SOURCE_FILE)
      .pipe(
        map((rawData: RawData) => {
          const {timeSeries: {entries: entries}} = rawData.mktData[0];
          return entries.map(entry => entry.d);
        }),
      );
  }
}
