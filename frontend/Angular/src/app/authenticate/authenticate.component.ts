import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Router } from '@angular/router';
import { AuthContent  } from '../content/auth-content';

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

  login: {userId : string, token: string, tokenExpiration: number};

  constructor(private apollo: Apollo, private route: Router, private authContent: AuthContent) { }

  ngOnInit() {
    
  }

  submit() {
    console.log(this.user + " " + this.password);
    // sign up
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
    //login
    else if(this.button1 == "login") {
      this.query = this.apollo.watchQuery({
        query: loginUser,
        variables:{email: this.user, password: this.password}
      });

      this.query.valueChanges.subscribe( result => {
        this.login = result.data.login;
        this.authContent.setLoginData(this.login);
        this.error = null;
        // navigate once user login
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
