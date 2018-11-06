import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';

const appRoutes: Routes = [
  { path: ':booking', component: BookingFormComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', }
];

@NgModule({
  declarations: [
    BookingFormComponent,
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
