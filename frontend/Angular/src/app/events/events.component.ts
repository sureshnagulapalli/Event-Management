import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthContent } from '../content/auth-content';
import { BookingsComponent } from '../bookings/bookings.component';


const getEvents = gql`
  query events{
    events: events {
      _id
      title
      description
      price
      date
    }
    bookings: bookings {
      user {
        _id
      }
      event {
        _id
      }
    }
  }
`;

const creatEvents = gql`
  mutation createEvent($title: String!, $description: String!, $price: Float!, $date: String!){
    createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
      _id
      title
      description
      date
      price
    }
  }
`;

const bookEvent = gql`
  mutation bookEvent($eventId: ID!){
    bookEvent(eventId: $eventId) {
      _id
    }
  }
`;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  title: string = '';
  description: string = '';
  price: number;
  date: string = '';

  login: boolean = false;

  events = [];

  query;
  mutation;
  mutationBook;
  checkbooking;
  bookedlist =  [];

  constructor(private authContent: AuthContent, private apollo: Apollo) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: getEvents, 
    });

    if(localStorage.getItem('token')) { this.login = true; }
    else { this.login = false; }
    
    this.query.valueChanges.subscribe( result => {
      var tempUsers = result.data.bookings;
      this.bookedlist = [];
      for(var i=0; i< tempUsers.length; i++) {
        if(localStorage.getItem('user') == tempUsers[i].user._id) {
          this.bookedlist.push(tempUsers[i].event._id);
        }
      }
      this.events = [];
      var tempEvents = result.data.events;
      for(var i=0; i<tempEvents.length; i++) {
        var event = {
          _id: tempEvents[i]._id,
          title: tempEvents[i].title,
          description: tempEvents[i].description,
          price: tempEvents[i].price,
          date: tempEvents[i].date,
          booked: false
        }
        if(this.bookedlist.includes(event._id)) {
          event.booked = true;
        }
        this.events.push(event);
      }
    });
  }

  submit() {
    this.mutation = this.apollo.mutate({
      mutation: creatEvents,
      variables: {title: this.title, description: this.description, price: this.price, date: this.date}
    });

    this.mutation.subscribe( result =>{
      this.title = null;
      this.description = null;
      this.price = null;
      this.date = null;
      this.query.refetch();
    });
  }

  onBook(id: String) {
    this.mutationBook = this.apollo.mutate({
      mutation: bookEvent,
      variables: {eventId: id}
    });

    this.mutationBook.subscribe( result => {
      this.query.refetch();
    })
  }
}
