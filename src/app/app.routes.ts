import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { AboutComponent } from './components/about/about.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadPdfComponent } from './components/upload-pdf/upload-pdf.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { StartComponent } from './components/start/start.component';

export const routes: Routes = [
    {path: '', component: InitialPageComponent},
    {path: 'home',component: HomeComponent},
    {path: 'livros',component: HomeComponent},
    {path: 'initial',component: InitialPageComponent},
    {path: 'termos', component: TermsOfServiceComponent},
    {path: 'about', component: AboutComponent},
    {path: 'politica', component: PrivacyPolicyComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastrar', component: RegisterComponent},
    {path: 'upload', component: UploadPdfComponent}
   
];

