import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { resultKeyNameFromField } from '@apollo/client/utilities';

const bookings = gql`
  query {
    bookings {
      _id
      event{
        title
      }
      updatedAt
    }
  }
`;

const cancelBooking = gql `
  mutation cancel($id: ID!) {
    cancelBooking(bookingId: $id) {
      _id
    } 
  }
`;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  query;


  allBookings = []; 

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: bookings
    });

    this.query.valueChanges.subscribe( result =>{
      this.allBookings = result.data.bookings;
    });

    this.query.refetch();
  }

  onCancel(bookingId) {
    this.apollo.mutate({
      mutation: cancelBooking,
      variables: {id: bookingId}
    })
    .subscribe(result => {
      console.log(result);
      this.query.refetch();
    });
  }

}
