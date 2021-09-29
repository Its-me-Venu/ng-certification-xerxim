import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppWeatherComponent } from './app-weather/app-weather.component';
import { App5dayforecastComponent } from './app-5dayforecast/app-5dayforecast.component';

const routes: Routes = [
  { path: '', component: AppWeatherComponent },
  { path: 'forecast/:id', component: App5dayforecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
