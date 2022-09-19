// Angular
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    localStorage.clear();
    location.href = environment.railsAppUrl + '/users/logout';
  }
}
