import { Component, OnInit,TemplateRef, ViewChild,ElementRef } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {StocksService} from "../../../../services/Stocks/StocksService";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {Chart ,ChartType} from 'chart.js';
import {Stock} from "../../../../models/Stock";
import 'chartjs-chart-financial';
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
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  @ViewChild('others', {static: true}) others!: TemplateRef<any>;
  @ViewChild('stocks', {static: true}) stocks!: TemplateRef<any>;
  @ViewChild('formm', {static: true}) formm!: TemplateRef<any>;
  constructor(private StocksService: StocksService,private userAuthService: UserAuthService,private datePipe: DatePipe,
     public dialogRef: MatDialog,private formBuilder: FormBuilder) {
      this.cardForm = this.formBuilder.group({
        num: ['', Validators.required],
        date: ['', Validators.required],
        code: ['', Validators.required],
        montant: ['', Validators.required],
      });

      this.AcheterForm = this.formBuilder.group({
        namestock: ['', Validators.required],
        number: ['', Validators.required],
        coast: ['', Validators.required]
      });
      }
  message: string = '';
  Stock !:Stock;
  cardForm: FormGroup;
  AcheterForm: FormGroup;
  data:any;
  chartData:any= [];
  currentDate: Date = new Date("2024-01-06");
  currentDateMinusOneDay: Date;
  data2:any;
  chartData2:any= [];
  data3:any;
  chartData3:any= [];
  data4:any;
  chartData4:any= [];
  money:number;
  nameofstock:any;
  acheter(templateRef: TemplateRef<any>) : void{
    const namestock = this.AcheterForm.get('namestock')?.value;
    const number = this.AcheterForm.get('number')?.value;
    const coast = this.AcheterForm.get('coast')?.value;
    if (!namestock || !number || !coast   ) {
      this.message = 'Veuillez compléter tous les champs requis pour mener à bien votre opération';
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000);
    return;
  }
  if (this.money<(coast*number)  ) {
    this.message = 'Solde insuffisant';
  this.dialogRef.open(templateRef);
  setTimeout(() => {
    this.dialogRef.closeAll();
  }, 4000);
  return;
}
  const currentDate: Date = new Date();
  this.Stock = this.Stock || {};
  this.Stock.coast=coast;
  this.Stock.number=number;
  this.Stock.namestock=namestock;
  this.Stock.date=currentDate;
  this.StocksService.acheter(this.Stock,this.userAuthService.getname()).subscribe((data) => {
    if(data){
      this.message = "Votre opération a été exécutée avec succès";
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
 gotoForm(nom:string){
  this.dialogRef.closeAll();
  if(nom=='AAPL'){
    this.AcheterForm.patchValue({
      namestock: 'AAPL' ,
      coast: this.chartData[1].o || '',
    });}
    else if(nom=='TSLA'){
      this.AcheterForm.patchValue({
        namestock: 'TSLA' ,
        coast: this.chartData2[1].o || '',
      });}
      else if(nom=='AMZN'){
        this.AcheterForm.patchValue({
          namestock: 'AMZN' ,
          coast: this.chartData3[1].o || '',
        });}
        else{
          this.AcheterForm.patchValue({
            namestock: nom || '' ,
            coast: this.chartData4[1].o || '',
          });
        }
    this.dialogRef.open(this.formm);

}
  close(){
    this.dialogRef.closeAll();
  }
  gotoCard(){
    this.dialogRef.open(this.firstDialog);
  }
  gotoOthers(){
    this.dialogRef.open(this.others);
  }
  gotoStockss(stock:string){
    this.dialogRef.closeAll();
    this.dialogRef.open(this.stocks);

    this.StocksService.liste(stock, this.switch(this.currentDateMinusOneDay), this.switch(this.currentDate)).subscribe(dataa => {
      if (dataa) {
        this.data4 = dataa;
        this.nameofstock=this.data4.ticker;
        this.chartData4 = this.data4.results;
        this.processChartData4();
        const days =[this.currentDateMinusOneDay.getDay(),this.currentDateMinusOneDay.getDay()+1,this.currentDateMinusOneDay.getDay()+5,this.currentDate.getDay()]
       // Extraction des données
    const timestamps = days;
    const highestValues = this.chartData4.map((data: { h: any; }) => data.h);
    const lowestValues = this.chartData4.map((data: { l: any; }) => data.l);

    // Création du graphique de zone
    const ctx = document.getElementById('areaChart4') as HTMLCanvasElement;
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
  onCard(templateRef: TemplateRef<any>) : void{
    const num = this.cardForm.get('num')?.value;
    const date = this.cardForm.get('date')?.value;
    const code = this.cardForm.get('code')?.value;
    const montant = this.cardForm.get('montant')?.value;
    if (!num || !date || !code || !montant  ) {
      this.message = 'Veuillez compléter tous les champs requis pour mener à bien votre opération';
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000);
    return;
  }
  if(isNaN(montant)){
    this.message = 'Le montant ne doit contenir que des chiffres';
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000);
    return;
  }
  this.StocksService.SaveMoney(this.userAuthService.getname(),montant).subscribe((data) => {
    if(data){
      this.message = "Votre opération a été exécutée avec succès";
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
  ngOnInit(): void {
    this.StocksService.getmoney(this.userAuthService.getname()).subscribe(any => {
      if(any){
        this.money=any.money;




    this.currentDateMinusOneDay = this.getCurrentDateMinusOneDay();
    this.StocksService.liste("AAPL", this.switch(this.currentDateMinusOneDay), this.switch(this.currentDate)).subscribe(dataa => {
      if (dataa) {
        this.data = dataa;
        this.chartData = this.data.results;
        this.processChartData2();
        const days =[this.currentDateMinusOneDay.getDay(),this.currentDateMinusOneDay.getDay()+1,this.currentDateMinusOneDay.getDay()+5,this.currentDate.getDay()]
       // Extraction des données
    const timestamps = days;
    const highestValues = this.chartData.map((data: { h: any; }) => data.h);
    const lowestValues = this.chartData.map((data: { l: any; }) => data.l);

    // Création du graphique de zone
    const ctx = document.getElementById('areaChart') as HTMLCanvasElement;
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




    this.StocksService.liste("TSLA", this.switch(this.currentDateMinusOneDay), this.switch(this.currentDate)).subscribe(dataa => {
      if (dataa) {
        this.data2 = dataa;
        this.chartData2= this.data2.results;

        this.processChartData();
        const days =[this.currentDateMinusOneDay.getDay(),this.currentDateMinusOneDay.getDay()+1,this.currentDateMinusOneDay.getDay()+5,this.currentDate.getDay()]
       // Extraction des données
    const timestamps = days;
    const highestValues = this.chartData2.map((data: { h: any; }) => data.h);
    const lowestValues = this.chartData2.map((data: { l: any; }) => data.l);

    // Création du graphique de zone
    const ctx = document.getElementById('areaChart2') as HTMLCanvasElement;
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




    this.StocksService.liste("AMZN", this.switch(this.currentDateMinusOneDay), this.switch(this.currentDate)).subscribe(dataa => {
      if (dataa) {
        this.data3 = dataa;
        this.chartData3= this.data3.results;

        this.processChartData3();
        const days =[this.currentDateMinusOneDay.getDay(),this.currentDateMinusOneDay.getDay()+1,this.currentDateMinusOneDay.getDay()+5,this.currentDate.getDay()]
       // Extraction des données
    const timestamps = days;
    const highestValues = this.chartData3.map((data: { h: any; }) => data.h);
    const lowestValues = this.chartData3.map((data: { l: any; }) => data.l);

    // Création du graphique de zone
    const ctx = document.getElementById('areaChart3') as HTMLCanvasElement;
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
  processChartData(): void {
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
        data1.c=((this.chartData2[0].c+this.chartData2[1].c)/2)
        data1.h=((this.chartData2[0].h+this.chartData2[1].h)/2)
        data1.l=((this.chartData2[0].l+this.chartData2[1].l)/2)
        data1.n=((this.chartData2[0].n+this.chartData2[1].n)/2)
        data1.o=((this.chartData2[0].o+this.chartData2[1].o)/2)
        data1.t=((this.chartData2[0].t+this.chartData2[1].t)/2)
        data1.v=((this.chartData2[0].v+this.chartData2[1].v)/2)
        data1.vw=((this.chartData2[0].vw+this.chartData2[1].vw)/2)
        this.chartData2.push(data1)
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
      data2.c=((this.chartData2[1].c+this.chartData2[2].c)/2)
      data2.h=((this.chartData2[1].h+this.chartData2[2].h)/2)
      data2.l=((this.chartData2[1].l+this.chartData2[2].l)/2)
      data2.n=((this.chartData2[1].n+this.chartData2[2].n)/2)
      data2.o=((this.chartData2[1].o+this.chartData2[2].o)/2)
      data2.t=((this.chartData2[1].t+this.chartData2[2].t)/2)
      data2.v=((this.chartData2[1].v+this.chartData2[2].v)/2)
      data2.vw=((this.chartData2[1].vw+this.chartData2[2].vw)/2)
      this.chartData2.push(data2)
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
        data1.c=((this.chartData[0].c+this.chartData[1].c)/2)
        data1.h=((this.chartData[0].h+this.chartData[1].h)/2)
        data1.l=((this.chartData[0].l+this.chartData[1].l)/2)
        data1.n=((this.chartData[0].n+this.chartData[1].n)/2)
        data1.o=((this.chartData[0].o+this.chartData[1].o)/2)
        data1.t=((this.chartData[0].t+this.chartData[1].t)/2)
        data1.v=((this.chartData[0].v+this.chartData[1].v)/2)
        data1.vw=((this.chartData[0].vw+this.chartData[1].vw)/2)
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
      data2.c=((this.chartData[1].c+this.chartData[2].c)/2)
      data2.h=((this.chartData[1].h+this.chartData[2].h)/2)
      data2.l=((this.chartData[1].l+this.chartData[2].l)/2)
      data2.n=((this.chartData[1].n+this.chartData[2].n)/2)
      data2.o=((this.chartData[1].o+this.chartData[2].o)/2)
      data2.t=((this.chartData[1].t+this.chartData[2].t)/2)
      data2.v=((this.chartData[1].v+this.chartData[2].v)/2)
      data2.vw=((this.chartData[1].vw+this.chartData[2].vw)/2)
      this.chartData.push(data2)
  }


  processChartData3(): void {
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
        data1.c=((this.chartData3[0].c+this.chartData3[1].c)/2)
        data1.h=((this.chartData3[0].h+this.chartData3[1].h)/2)
        data1.l=((this.chartData3[0].l+this.chartData3[1].l)/2)
        data1.n=((this.chartData3[0].n+this.chartData3[1].n)/2)
        data1.o=((this.chartData3[0].o+this.chartData3[1].o)/2)
        data1.t=((this.chartData3[0].t+this.chartData3[1].t)/2)
        data1.v=((this.chartData3[0].v+this.chartData3[1].v)/2)
        data1.vw=((this.chartData3[0].vw+this.chartData3[1].vw)/2)
        this.chartData3.push(data1)
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
      data2.c=((this.chartData3[1].c+this.chartData3[2].c)/2)
      data2.h=((this.chartData3[1].h+this.chartData3[2].h)/2)
      data2.l=((this.chartData3[1].l+this.chartData3[2].l)/2)
      data2.n=((this.chartData3[1].n+this.chartData3[2].n)/2)
      data2.o=((this.chartData3[1].o+this.chartData3[2].o)/2)
      data2.t=((this.chartData3[1].t+this.chartData3[2].t)/2)
      data2.v=((this.chartData3[1].v+this.chartData3[2].v)/2)
      data2.vw=((this.chartData3[1].vw+this.chartData3[2].vw)/2)
      this.chartData3.push(data2)
  }

  processChartData4(): void {
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
        data1.c=((this.chartData4[0].c+this.chartData4[1].c)/2)
        data1.h=((this.chartData4[0].h+this.chartData4[1].h)/2)
        data1.l=((this.chartData4[0].l+this.chartData4[1].l)/2)
        data1.n=((this.chartData4[0].n+this.chartData4[1].n)/2)
        data1.o=((this.chartData4[0].o+this.chartData4[1].o)/2)
        data1.t=((this.chartData4[0].t+this.chartData4[1].t)/2)
        data1.v=((this.chartData4[0].v+this.chartData4[1].v)/2)
        data1.vw=((this.chartData4[0].vw+this.chartData4[1].vw)/2)
        this.chartData4.push(data1)
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
      data2.c=((this.chartData4[1].c+this.chartData4[2].c)/2)
      data2.h=((this.chartData4[1].h+this.chartData4[2].h)/2)
      data2.l=((this.chartData4[1].l+this.chartData4[2].l)/2)
      data2.n=((this.chartData4[1].n+this.chartData4[2].n)/2)
      data2.o=((this.chartData4[1].o+this.chartData4[2].o)/2)
      data2.t=((this.chartData4[1].t+this.chartData4[2].t)/2)
      data2.v=((this.chartData4[1].v+this.chartData4[2].v)/2)
      data2.vw=((this.chartData4[1].vw+this.chartData4[2].vw)/2)
      this.chartData4.push(data2)
  }
}
