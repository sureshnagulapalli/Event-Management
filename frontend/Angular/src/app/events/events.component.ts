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
      creator {
        _id
        email
      }
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


  Event: { title: string, description: string, price: string,date: string };
  events: Event[] = [];

  query;
  mutation;

  constructor(private authContent: AuthContent, private apollo: Apollo) { }

  ngOnInit() {
    console.log(this.authContent);

    this.query = this.apollo.watchQuery({
      query: getEvents
    });

    this.query.valueChanges.subscribe( result => {
      this.events = result.data.events;
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

}
