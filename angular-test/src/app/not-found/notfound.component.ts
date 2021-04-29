import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
})
export class NotfoundComponent implements OnInit {
  errorMessage = 'The page requested was not found.';
  errorCode = '404';
  fallBackLink = '/';
  fallBackPageName = 'Home';

  constructor() {}

  ngOnInit(): void {}
}
