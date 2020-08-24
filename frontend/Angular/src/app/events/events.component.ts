import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthContent } from '../content/auth-content';


const getEvents = gql`
  query events{
    events {
      _id
      title
      description
      price
      date
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

  Event: { id: string, title: string, description: string, price: string,date: string };
  events: Event[] = [];

  query;
  mutation;
  mutationBook;

  constructor(private authContent: AuthContent, private apollo: Apollo) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: getEvents
    });

    this.query.valueChanges.subscribe( result => {
      this.events = result.data.events;
    });

    if(localStorage.getItem('token')) {
      this.login = true;
    }
    else {
      this.login = false;
    }
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
    console.log(id);
    this.mutationBook = this.apollo.mutate({
      mutation: bookEvent,
      variables: {eventId: id}
    });

    this.mutationBook.subscribe( result => {
      console.log(result.data);
    })
  }

}
