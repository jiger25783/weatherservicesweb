import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Headers, RequestOptions, Response} from '@angular/http';
import {WeatherInfo} from '../models/weatherInfo.model';
import {Observable} from 'rxjs/Rx';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

function handleError(error: any): ErrorObservable {
  return Observable.throw(error || 'Server error');
}

@Injectable()
export class WeatherService {
  private baseURL = 'api/v1/getweatherinformation';

  private httpOptions = new RequestOptions({
    headers: new Headers({'Content-Type': 'application/json'}),
  });

  constructor(private authHttp: AuthHttp) {}

  public getWeatherInformation(location: string): Observable<WeatherInfo> {
    location = location ? location : "UNKNOWN"
    return this.authHttp.get(this.baseURL + "/" + location)
      .map((res: Response) => res.json())
      .catch(handleError);
  }


}
