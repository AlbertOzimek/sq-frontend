import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {HttpClientModule} from '@angular/common/http';
import {Ng5SliderModule} from 'ng5-slider';
import {DateSliderComponent} from './date-slider/date-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    DateSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule, // TODO: move to line chart module
    HttpClientModule,
    Ng5SliderModule // TODO: move to the date-slider component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
