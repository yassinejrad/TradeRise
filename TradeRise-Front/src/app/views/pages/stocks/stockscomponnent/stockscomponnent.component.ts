import { Component, OnInit,TemplateRef, ViewChild,ElementRef } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {StocksService} from "../../../../services/Stocks/StocksService";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {Chart ,ChartType} from 'chart.js';
import {Stock} from "../../../../models/Stock";

interface YourType {
  c: number; // replace with the actual type
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
  // Add other properties as needed
}
@Component({
  selector: 'app-stockscomponnent',
  templateUrl: './stockscomponnent.component.html',
  styleUrls: ['./stockscomponnent.component.scss']
})
export class StockscomponnentComponent implements OnInit {
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  
  constructor(private StocksService: StocksService,private userAuthService: UserAuthService,private datePipe: DatePipe,
    public dialogRef: MatDialog,private formBuilder: FormBuilder) {
      this.AcheterForm = this.formBuilder.group({
        number: ['', Validators.required]
      });
     }
    message: string = '';
    clicked:boolean=false;
    AcheterForm: FormGroup;
    Stock !:Stock;
    Stocks :Stock[];
    openstockscoast:number;
    chartData:any= [];
    data:any;
    currentDate: Date = new Date("2024-01-07");
    currentDateMinusOneDay: Date;
    isitclicked(){
      if(this.clicked){
        this.clicked=false;
      } 
      else{
        this.clicked=true;
      }
    }
  ngOnInit(): void {
    this.StocksService.listeStocks(this.userAuthService.getname()).subscribe((data) => {
      if(data){ 
        this.Stocks=data;
      }
    },
      error => {
        console.log(error)
      }
    );
  }
  close(){
    this.dialogRef.closeAll();
  }
  voir(name:string,id:number,number:number,coast:number){
    this.Stock = this.Stock || {};
    this.Stock.namestock=name;
    this.Stock.idstocks=id;
    this.Stock.number=number;
    this.Stock.coast=coast;
    this.dialogRef.open(this.firstDialog);
    this.currentDateMinusOneDay = this.getCurrentDateMinusOneDay();
    this.StocksService.liste(name, this.switch(this.currentDateMinusOneDay), this.switch(this.currentDate)).subscribe(dataa => {
      if (dataa) {
        this.data = dataa;
        this.chartData = this.data.results;
        this.openstockscoast=this.chartData[0].h;
        this.processChartData2(); 
        const days =[this.currentDateMinusOneDay.getDay(),this.currentDateMinusOneDay.getDay()+1,this.currentDate.getDay()]
    const timestamps = days;
    const highestValues = this.chartData.map((data: { h: any; }) => data.h);
    const lowestValues = this.chartData.map((data: { l: any; }) => data.l);

    // Création du graphique de zone
    const ctx = document.getElementById('areaChart6') as HTMLCanvasElement;
    const areaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Highest Price',
            data: highestValues,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            fill: true,
          },
          {
            label: ' Lowest Price',
            data: lowestValues,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            beginAtZero: false,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        elements: {
          point: {
            radius: 5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
        },
        backgroundColor: 'black',  // Changer la couleur de fond du graphique
      },
    });
   
   
      }
    });
  }
  getCurrentDateMinusOneDay(): Date {
    const today = this.currentDate;
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 3);
    return yesterday;
  }
  switch(date:Date) :string{
    const formattedDate: string = this.datePipe.transform(date, 'yyyy-MM-dd') ?? "";
    return formattedDate;
  }
  vendre(templateRef: TemplateRef<any>) : void{
    const number = this.AcheterForm.get('number')?.value;
    if (!number) {
      this.message = 'Veuillez saisir le nombre de stocks que vous voulez vendre. !';
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000); 
    return;
  }
  if (number>this.Stock.number) {
    this.message =  "Vous n'avez pas une quantité suffisante de ce stock pour effectuer votre opération.";
  this.dialogRef.open(templateRef);
  setTimeout(() => {
    this.dialogRef.closeAll();
  }, 4000); 
  return;
}
  this.StocksService.vendre(this.userAuthService.getname(),this.Stock.idstocks,number,this.openstockscoast).subscribe((data) => {
    if(data){
      this.message = "opération effectuée avec succès";
      this.dialogRef.open(templateRef);
      setTimeout(() => {
        this.dialogRef.closeAll();
        location.reload();
      }, 4000); 
      return;
    }
  },
    error => {
      console.log(error)
    }
  );
  }

  vendretout(templateRef: TemplateRef<any>) : void{
  this.StocksService.vendre(this.userAuthService.getname(),this.Stock.idstocks,this.Stock.number,this.openstockscoast).subscribe((data) => {
    if(data){
      this.message = "opération effectuée avec succès";
      this.dialogRef.open(templateRef);
      setTimeout(() => {
        this.dialogRef.closeAll();
        location.reload();
      }, 4000); 
      return;
    }
  },
    error => {
      console.log(error)
    }
  );
  }

  processChartData2(): void {
    const data1  : YourType = 
          {
            c: 0,
            h: 0,
            l: 0,
            n: 0,
            o: 0,
            t: 0,
            v: 0,
            vw: 0,
          };
        data1.c=((this.chartData[0].c+this.chartData[0].c)/2)
        data1.h=((this.chartData[0].h+this.chartData[0].h)/2)
        data1.l=((this.chartData[0].l+this.chartData[0].l)/2)
        data1.n=((this.chartData[0].n+this.chartData[0].n)/2)
        data1.o=((this.chartData[0].o+this.chartData[0].o)/2)
        data1.t=((this.chartData[0].t+this.chartData[0].t)/2)
        data1.v=((this.chartData[0].v+this.chartData[0].v)/2)
        data1.vw=((this.chartData[0].vw+this.chartData[0].vw)/2)
        this.chartData.push(data1)
        const data2  : YourType = 
        {
          c: 0,
          h: 0,
          l: 0,
          n: 0,
          o: 0,
          t: 0,
          v: 0,
          vw: 0,
        };
      data2.c=((this.chartData[0].c+this.chartData[1].c)/2)
      data2.h=((this.chartData[0].h+this.chartData[1].h)/2)
      data2.l=((this.chartData[0].l+this.chartData[1].l)/2)
      data2.n=((this.chartData[0].n+this.chartData[1].n)/2)
      data2.o=((this.chartData[0].o+this.chartData[1].o)/2)
      data2.t=((this.chartData[0].t+this.chartData[1].t)/2)
      data2.v=((this.chartData[0].v+this.chartData[1].v)/2)
      data2.vw=((this.chartData[0].vw+this.chartData[1].vw)/2)
      this.chartData.push(data2)
  }
}
