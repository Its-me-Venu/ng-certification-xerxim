import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-weather',
  templateUrl: './app-weather.component.html',
  styleUrls: ['./app-weather.component.css'],
})
export class AppWeatherComponent implements OnInit {
  isLoader = false;
  sampleData = { zipcode: '', data: '', urlLink: '' };
  DataArray: any[] = [];
  orgImgPath: any;
  weatherImg: any;

  constructor(private weatherService: WeatherService) {
    this.orgImgPath = this.weatherService.getImgPath();
    this.weatherImg = this.weatherService.getWeaImg();
  }

  ngOnInit() {
    let weatherData = JSON.parse(localStorage.getItem('weatherDetails'));
    this.DataArray = weatherData || [];
  }

  weatherFormDetails = new FormGroup({
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{5}$'),
    ]),
  });

  getZipcode() {
    return this.weatherFormDetails.get('zipcode').value;
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  onSubmit() {
    this.isLoader = true;
    this.getWeatherDetails(this.getZipcode());
    this.weatherFormDetails.reset();
  }
  getWeatherDetails(zipcode) {
    this.weatherService.addData(zipcode).subscribe(
      (result) => {
        this.isLoader = false;
        this.sampleData.data = result;
        this.sampleData.zipcode = zipcode;
        this.sampleData.urlLink = 'forecast/' + this.sampleData.zipcode;
        console.log(this.sampleData.data);
        if (this.sampleData.data != null && this.sampleData.data != '') {
          let index = this.findById(this.sampleData.zipcode);
          if (index != -1) {
            this.DataArray[index].zipcode = this.sampleData.zipcode;
            this.DataArray[index].data = this.sampleData.data;
            localStorage.setItem(
              'weatherDetails',
              JSON.stringify(this.DataArray)
            );
          } else {
            this.sampleData.urlLink = 'forecast/' + this.sampleData.zipcode;
            this.DataArray.push(JSON.parse(JSON.stringify(this.sampleData)));
            localStorage.setItem(
              'weatherDetails',
              JSON.stringify(this.DataArray)
            );
          }
        } else {
          alert('Data not found,try with other zipcode');
        }
      },
      (error) => {
        console.log('error', error);
        this.isLoader = true;
        alert('Data not found,try with other zipcode');
      }
    );
  }
  findById(zipcode: any) {
    let index = this.DataArray.findIndex((obj) => obj.zipcode == zipcode);
    return index;
  }

  remove(index) {
    this.DataArray.splice(index, 1);
    localStorage.setItem('weatherDetails', JSON.stringify(this.DataArray));
  }
}
