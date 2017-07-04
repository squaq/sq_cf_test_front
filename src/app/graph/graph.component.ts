import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
    graphData = null;
    
    
  constructor(private http: Http) {  }
    
    getGraphData(){
        let me = this;
        this.http.get('http://localhost:3000/api/msgdata')
        .map(data=>data.json())
        .subscribe(data => {
            console.log(data);
            this.graphData = data.boughtCurrencies;
            setTimeout(()=>{me.getGraphData()}, 10000)
        });
    }
    renderHex(hex:String){
        hex = hex.replace(/ /g, "&#x");
        hex = hex.replace(/,/g, ";");
        return '&#x'+hex+';';
    }
    
    
  ngOnInit() {
      this.getGraphData();
  }

}
