import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Router } from '@angular/router';

const createUser = gql`
    mutation createUser($email: String!, $password: String!) {
    createUser(userInput: {
      email: $email,
      password: $password
      }) 
      {
  	    email
      }
    }
  `;

  const loginUser = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
  `;

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements OnInit {

  user = '';
  password = '';

  button1 = "login";
  button2 = "sign up";

  query;
  result;
  error;

  login: {userId : String, token: String, tokenExpiration: Number};

  constructor(private apollo: Apollo, private route: Router) { }

  ngOnInit() {
    
  }

  submit() {
    console.log(this.user + " " + this.password);
    if(this.button1 == "sign up") {
      this.query = this.apollo.mutate({
        mutation: createUser,
        variables: {email: this.user, password: this.password}
      });
  
      this.query.subscribe( result =>{
        this.result = result.data.email;
        this.error = null;  
      },
      (error) => {
        this.error = error;
      })
    }
    else if(this.button1 == "login") {
      this.query = this.apollo.watchQuery({
        query: loginUser,
        variables:{email: this.user, password: this.password}
      });

      this.query.valueChanges.subscribe( result => {
        this.login = result.data.login;
        this.error = null;

        this.route.navigate(['/events']);
      },
      (error) => {
        this.error = error;
      })
    }
  }

  switch() {
    if(this.button2 == "sign up") {
      this.button2 = "login";
      this.button1 = "sign up";
    }
    else {
      this.button2 = "sign up";
      this.button1 = "login";
    }
  }
}
