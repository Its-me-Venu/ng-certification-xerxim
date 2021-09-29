import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-weather',
  templateUrl: './app-weather.component.html',
  styleUrls: ['./app-weather.component.css'],
})
export class AppWeatherComponent implements OnInit {
  isSpinner = false;
  weatherData = { zipcode: '', data: '', forecastLink: '', icon: '' };
  weatherDataArray: any[] = [];

  baseWeatherImgPath: string;
  weatherImg: any;

  constructor(private ws: WeatherService) {
    this.baseWeatherImgPath = this.ws.getBaseWhetherImgPath();
    this.weatherImg = this.ws.getWeatherImgs();
  }

  ngOnInit() {
    let weatherData = JSON.parse(localStorage.getItem('weatherData'));
    this.weatherDataArray = weatherData || [];
  }

  weatherForm = new FormGroup({
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?!0{3})[0-9]{5}$'),
    ]),
  });

  getZipcode() {
    return this.weatherForm.get('zipcode').value;
  }

  onSubmit() {
    this.isSpinner = true;
    this.getWeatherData(this.getZipcode());
    this.weatherForm.reset();
  }
  getWeatherData(zipcode) {
    this.ws.addWeatherData(zipcode).subscribe(
      (result) => {
        this.isSpinner = false;
        this.weatherData.data = result;
        this.weatherData.zipcode = zipcode;
        this.weatherData.forecastLink = 'forecast/' + this.weatherData.zipcode;
        console.log(this.weatherData.data);
        if (this.weatherData.data != null && this.weatherData.data != '') {
          let index = this.findById(this.weatherData.zipcode);
          if (index != -1) {
            this.weatherDataArray[index].zipcode = this.weatherData.zipcode;
            this.weatherDataArray[index].data = this.weatherData.data;
            localStorage.setItem(
              'weatherData',
              JSON.stringify(this.weatherDataArray)
            );
          } else {
            this.weatherData.forecastLink =
              'forecast/' + this.weatherData.zipcode;
            this.weatherDataArray.push(
              JSON.parse(JSON.stringify(this.weatherData))
            );
            localStorage.setItem(
              'weatherData',
              JSON.stringify(this.weatherDataArray)
            );
          }
        } else {
          alert(
            'weather Data not found for given zipcode, try with other zipcode'
          );
        }
      },
      (error) => {
        console.log('error', error);
        this.isSpinner = true;
        alert(
          'weather Data not found for given zipcode, try with other zipcode'
        );
      }
    );
  }
  findById(zipcode: any) {
    let index = this.weatherDataArray.findIndex(
      (obj) => obj.zipcode == zipcode
    );
    return index;
  }
  clearWeatherData() {
    this.weatherData.data = '';
    this.weatherData.zipcode = '';
    this.weatherData.forecastLink = '';
  }
  deleteCity(index) {
    this.weatherDataArray.splice(index, 1);
    localStorage.setItem('weatherData', JSON.stringify(this.weatherDataArray));
  }
}
