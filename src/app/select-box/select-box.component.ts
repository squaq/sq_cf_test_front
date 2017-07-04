import { Component, OnInit } from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent implements OnInit  {
    ops = null;
    main = null;
    secSelec = null;
    inModel:number = 1;
    hiddenFocus:Boolean = false;

    constructor(private http: Http){}
    
    requestCurrency(base:String = null){
        
        let url = 'http://localhost:3000/api/rate';
        if(base) url +='/'+base;
        
        this.http.get(url)
        .map( data => data.json() ) 
        .subscribe(data => {
            this.ops = data.data.currencies; 
            let i = this.ops.findIndex(function(ob){ return !ob.rate})
            this.main = this.ops.splice(i, 1)[0];
            this.secSelec = this.ops[0];
        });
    }
    
    clickSecSelect(sec){
        this.secSelec = sec;
    }
    focusOn(){
        this.hiddenFocus = true;
    }
    focusOut(){
        this.hiddenFocus = false;
    }
    getMainCurrency(){
        return this.ops.find(function(ob){ return !ob.rate});
    }
    
    renderHex(hex:String){
        hex = hex.replace(/ /g, "&#x");
        hex = hex.replace(/,/g, ";");
        return '&#x'+hex+';';
    }

    submitData(){
        let amountBuy:number = Number(this.inModel) * this.secSelec.rate;
        
        let url = "http://localhost:3000/api/message";
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        
        let data = {
            userId:134256,
            currencyFrom:this.main.currency,
            currencyTo:this.secSelec.currency,
            amountSell:this.inModel,
            amountBuy: amountBuy,
            rate:this.secSelec.rate,
            timePlaced:new Date(),
            originatingCountry:'dunno'
            
        }
        let body = new URLSearchParams();
        body.set('userId','134256');
        body.set('currencyFrom',data.currencyFrom);
        body.set('currencyTo',data.currencyTo);
        body.set('amountSell',String(data.amountSell));
        body.set('amountBuy',String(data.amountBuy));
        body.set('rate',data.rate);
        body.set('timePlaced',data.timePlaced.toDateString());
        body.set('originatingCountry',data.originatingCountry);
        
        this.http.post(url, body, { headers: headers })
            .map(data => data.json())
            .subscribe(data=>{
                console.log('done',data)
            });
    }
    
    ngOnInit() {
      this.requestCurrency();
    }

}
