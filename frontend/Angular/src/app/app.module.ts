import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { BookingsComponent } from './bookings/bookings.component';
import { EventsComponent } from './events/events.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthContent  } from './content/auth-content';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    BookingsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [AuthContent],
  bootstrap: [AppComponent]
})

export class AppModule { }
