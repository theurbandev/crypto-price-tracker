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
      total_volume: [],
      market_cap: [],
      total_supply: []
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
      for(let i=0; i < 500; i++){
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

      this.allCoinDataApiCall();
    });
  }

  allCoinDataApiCall(){
    console.log("Starting all coin data api call...");
    axios({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.coinsList.coins}&price_change_percentage=24`,
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json'
      }
    })  
    .then( (response: any) => { 

      for(let i=0; i < this.coinsList.coins.length; i++){
        this.coinsList.total_supply.push(response.data[i].total_supply);
        this.coinsList.total_volume.push(response.data[i].total_volume);
        this.coinsList.market_cap.push(response.data[i].market_cap);
      }
    });
  }
}