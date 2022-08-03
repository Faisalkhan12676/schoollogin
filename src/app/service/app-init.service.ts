import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private Router: Router) {}
  init() {
    return new Promise<void>((resolve, reject) => {
      // Simple example from an array. In reality, I used the response of
      // a GET. Important thing is that the app will wait for this promise to resolve
   

      const REST_API_ROUTE = JSON.parse(localStorage.getItem('route')+"")
      const NEWDYNAMICROUTESFROMAPI = REST_API_ROUTE;
      console.log(NEWDYNAMICROUTESFROMAPI);

      const routes = this.Router.config;

      if(NEWDYNAMICROUTESFROMAPI !== null){
        NEWDYNAMICROUTESFROMAPI.forEach((routeName: { name: any }) => {
          if (routeName.name === 'home') {
            routes.push({ path: routeName.name, component: HomeComponent });
          }
        });
  
        this.Router.resetConfig(routes);
        resolve();
      } else{
       
        reject(this.Router);
      }

      

     
    });
  }
}
