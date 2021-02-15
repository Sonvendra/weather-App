import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import * as moment from 'moment-timezone';
import { Timestamp } from './timestamp';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  coord:any;
  lat = 54.5260;
  lon = 15.2551;
  cnt = 5;

  // api.openweathermap.org/data/2.5/find?lat=57&lon=-2.15&cnt=3&appid={API key}

  constructor(private http: HttpClient) { }

  getCityList(){
    return this.http.get(`${environment.url}find?lat=${this.lat}&lon=${this.lon}&cnt=${this.cnt}&appid=${environment.appKey}`);
  }

  getCity(city){
    return this.http.get(`${environment.url}weather?q=${city}&appid=${environment.appKey}`);
  }

  getWeather(lat,lon){
    return this.http.get(`${environment.url}forecast?lat=${lat}&lon=${lon}&cnt=${this.cnt}&appid=${environment.appKey}`);
  }

  private getTimeObj(momentObj) {
    return {
      tz: momentObj.tz(),
      current: momentObj.unix(),
      fullDate: momentObj.format('MMMM Do YYYY'),
      fullDateTime: momentObj.format('h:mm:ss A'),
      iso8601: momentObj.format()
    };
  }
  getConvertedUnixTime(timestamp): Timestamp {
    const utc = moment.unix(timestamp)
      .tz('UTC');
    const current = utc
      .clone()
      .tz(moment.tz.guess());
    return {
      current: this.getTimeObj(current),
      utc: this.getTimeObj(utc)
    };
  }
}
