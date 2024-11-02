import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { AboutComponent } from './components/about/about.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', component: HomeComponent},
    {path: 'home',component: HomeComponent},
    {path: 'termos', component: TermsOfServiceComponent},
    {path: 'about', component: AboutComponent},
    {path: 'politica', component: PrivacyPolicyComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

  