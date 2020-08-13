import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: '/authenticate',
    component: AuthenticateComponent
  },
  {
    path: '/Bookings',
    component: BookingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
