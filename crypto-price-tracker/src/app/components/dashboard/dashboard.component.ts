import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  

  testApiCall() {
    console.log("Starting api call...")
    axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
      headers: {
        'id': 'bitcoin',
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json'
      }
    })  
    .then( (response: any) => {
      console.log(response);
    });
  }

}
