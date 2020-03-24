import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'some/:someId', component: AnotherComponent, canActivate: [AuthGuard] },
  { path: '**', component: SomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
