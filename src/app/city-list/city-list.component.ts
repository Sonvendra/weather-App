import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  listData:any = [];

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    this.getCityData();
  }

  getCityData(){
    this.service.getCityList().subscribe((res:any) => {
      res.list.forEach(city => {
        let arr:any = [];
        this.service.getCity(city.name).subscribe((data:any) => {
        arr = {
          name:city.name,
          temprature:data.main.temp,
          sunset:this.service.getConvertedUnixTime(data.sys.sunset).utc.fullDateTime,
          sunrise:this.service.getConvertedUnixTime(data.sys.sunrise).utc.fullDateTime,
          coord: data.coord
        }
        this.listData.push(arr);
        })
      });
    })
  }

  getWeather(coord){
    localStorage.setItem('coord',JSON.stringify(coord));
  }
}
