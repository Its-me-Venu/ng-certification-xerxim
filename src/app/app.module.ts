import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WeatherService } from './services/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppWeatherComponent } from './app-weather/app-weather.component';
import { App5dayforecastComponent } from './app-5dayforecast/app-5dayforecast.component';
import { DateConverterPipe } from '../pipes/date-converter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    AppWeatherComponent,
    App5dayforecastComponent,
    DateConverterPipe,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
