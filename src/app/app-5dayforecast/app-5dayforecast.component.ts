import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from './../services/weather.service';

@Component({
  selector: 'app-app-5dayforecast',
  templateUrl: './app-5dayforecast.component.html',
  styleUrls: ['./app-5dayforecast.component.css'],
})
export class App5dayforecastComponent implements OnInit {
  zipcode: any = '';
  sampleDataJson = { city: '', list: [] };
  orgImgPath: any;
  weatherImg: any;

  constructor(
    private router: Router,
    private arouter: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.orgImgPath = this.weatherService.getImgPath();
    this.weatherImg = this.weatherService.getWeaImg();
  }

  ngOnInit() {
    this.arouter.params.subscribe((params) => {
      this.zipcode = params['id'];
      if (this.zipcode != '' && this.zipcode != null) {
        this.addForecastData(this.zipcode);
      }
    });
  }

  addForecastData(zipcode) {
    this.weatherService.getData(zipcode).subscribe(
      (result) => {
        console.log(this.zipcode);
        this.sampleDataJson = result;
      },
      (error) => {
        console.log('error', error);
        alert('Data  not found try with other zipcode');
      }
    );
  }
  back() {
    this.router.navigateByUrl('');
  }
  dateConverter(miliseconds) {
    return new Date(miliseconds * 1000);
  }
}
