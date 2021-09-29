import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherAPI: string =
    'https://api.openweathermap.org/data/2.5/weather?q=';
  private APIKey = '5a4b2d457ecbef9eb2a71e480b947604';
  private forecastAPI =
    'https://api.openweathermap.org/data/2.5/forecast/daily?zip=';

  private weatherImgPath = 'https://www.angulartraining.com/images/weather/';

  constructor(private httpClient: HttpClient) {}

  addWeatherData(pincode: any): Observable<any> {
    let url =
      this.weatherAPI + pincode + ',us&units=metric&appid=' + this.APIKey;
    return this.httpClient.get(url);
  }
  getForcastData(pincode: any): Observable<any> {
    let url =
      this.forecastAPI +
      pincode +
      ',us&cnt=5&units=metric&appid=' +
      this.APIKey;
    return this.httpClient.get(url);
  }

  private weatherImgs: any = {
    Clear: 'sun.png',
    Clouds: 'clouds.png',
    Rain: 'rain.png',
    Snow: 'snow.png',
  };

  getBaseWhetherImgPath(): string {
    return this.weatherImgPath;
  }
  getWeatherImgs(): any {
    return this.weatherImgs;
  }
}
