import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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

  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log(this.user + " " + this.password);
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
