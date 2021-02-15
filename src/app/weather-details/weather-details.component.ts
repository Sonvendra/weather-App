import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../service/weather.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  listData:any = [];
  constructor(private route:ActivatedRoute, private service: WeatherService, private location: Location) { }

  ngOnInit(): void {
    this.getWeatherData();
    let cityName = this.route.snapshot.params.name;
  }

  getWeatherData(){
    let coord = JSON.parse(localStorage.getItem('coord'));
    this.service.getWeather(coord.lat,coord.lon).subscribe((res:any) => {
      res.list.forEach(data => {
        let arr:any = [];
        arr = {
          date:this.service.getConvertedUnixTime(data.dt).utc.fullDate,
          main: data.main
        }
        this.listData.push(arr)
      });
    });
  }

  goBack(){
    this.location.back();
  }

}
