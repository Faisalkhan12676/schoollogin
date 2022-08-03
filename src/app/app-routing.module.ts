import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './guard/role.guard';


let routes: Routes = [{ path: '', component: LoginComponent },{ path: 'login', component: LoginComponent }];
if(localStorage.getItem('route')!='' && localStorage.getItem('route')!=null){
  let route=[]; 
  route=JSON.parse(localStorage.getItem('route')+'');
  if(route.length>0){

    for (var obj of route) {
      if (obj.name == 'home') {
        routes.push({ path: obj.name, component: HomeComponent });
      }
    }
  }
  

}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
  InstallRoutes(router: Router, route: any) {
    let config = router.config;
    for (var obj of route) {
      if (obj.name == 'home') {
        config.push({ path: obj.name, component: HomeComponent });
      }
    }
    router.resetConfig(config);
  }
}
