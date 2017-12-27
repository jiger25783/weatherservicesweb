import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherInfo} from '../../shared/models/weatherInfo.model';
import {WeatherService} from '../../shared/services/weather.service';
import './weather.component.scss';

@Component({
  selector: 'weather',
  providers: [WeatherService],
  templateUrl: './weather.component.html',
})

export class WeatherComponent implements OnInit {
  public weatherInfoArr: Array<{}>;
  public location = '';
  errorAdding = false;
  errorMessage = ""

  constructor(private weatherService: WeatherService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadMessages();
    this.location = '';
  }

  loadMessages(): void {
    this.errorAdding = false;
    this.errorMessage = ""
    this.weatherService.getWeatherInformation("UNKNOWN")
      .subscribe(response => {
         this.populateWeatherInfo(response)
        //console.log(this.weatherInfoArr)
      },
      err =>{
        console.log("Error2")
        this.errorAdding= true;
        this.errorMessage= "Error occured please try after sometime: Our services are currently down"
      });
  }

  getWeatherInfo(): void {
    this.errorAdding = false;
    this.errorMessage = ""
    this.weatherInfoArr =[]
    this.weatherService.getWeatherInformation(this.location)
       .subscribe(response => {
         this.populateWeatherInfo(response)
        //console.log(this.weatherInfoArr)
      },
      err =>{
        console.log("Error4")
        this.errorAdding= true;
        this.errorMessage= "Error occured please try after sometime: Our services are currently down"
      });
  }

  populateWeatherInfo(response): void{
    this.weatherInfoArr = response.daily
         let respLoc = ""
         if(!this.location && this.location == ""){
           respLoc += response.city? response.city: ""
           respLoc += response.state? ", " + response.state: ""
           respLoc += response.country? ", " + response.country: ""
           this.location = respLoc
         }
        //console.log(this.weatherInfoArr)
  }
}
