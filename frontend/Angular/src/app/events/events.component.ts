import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  title = '';
  description = '';
  price;
  date = '';

  
  Events = [];

  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log(this.title + " " + this.description + " " + this.price + " " + this.date);
  }

}
