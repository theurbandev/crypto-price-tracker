import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    this.coinListApiCall();
  }
  
  isDataAvailable: boolean = false;

  coinsList:any = {
      coins: [],
      prices: [],
      testCoins: ["bitcoin"]
  }

  coinListApiCall() 
  {
    console.log("Starting coin list api call...")
    axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json'
      }
    })  
    .then( (response: any) => {
      for(let i=0; i < 20; i++){
        this.coinsList.coins.push(response.data[i].id);
      }

      this.isDataAvailable = true;
      this.priceListApiCall();
      //console.log(response);
    });
  }

  priceListApiCall()
  {
    console.log("Starting coin price api call...")
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/simple/price?ids=${this.coinsList.coins}&vs_currencies=usd`,
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json'
      }
    })  
    .then( (response: any) => { 

      for(let i=0; i < this.coinsList.coins.length; i++){
        this.coinsList.prices.push(response.data[this.coinsList.coins[i]].usd);
      }

      console.log(this.coinsList.prices);
      console.log(this.coinsList.coins);
    });
  }
}