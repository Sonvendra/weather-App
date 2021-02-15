import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'cilty-list', pathMatch: 'full'},
  {path:'cilty-list', component:CityListComponent},
  {path:'weather-details/:name',component:WeatherDetailsComponent},
  { path: '**', redirectTo: 'cilty-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
