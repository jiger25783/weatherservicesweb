import {DailyWeatherDetail} from './dailyWeaterDetail.model';

export interface WeatherInfo {
  	_id?: string;
  	latitude: Number;
	longitude: Number;
	daily:Array<DailyWeatherDetail>;
}
