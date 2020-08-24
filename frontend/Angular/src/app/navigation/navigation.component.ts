import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthContent } from '../content/auth-content';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  login: boolean =false;
  user;
  constructor(private router: Router, private authContent: AuthContent) { 

  router.events.subscribe( (event: Event) => {
    if (event instanceof NavigationStart) {
      if(localStorage.getItem('token')) {
        this.user = localStorage.getItem('user');
        this.login = true;
      }
      else {
        this.login = false;
      }
    }
  })
}

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.user = localStorage.getItem('user');
      this.login = true;
    }
    else {
      this.login = false;
    }
  }

  onLogout() {
    this.authContent.setLogoutData();
    this.router.navigate(["/authenticate"]);
  }
  
}
