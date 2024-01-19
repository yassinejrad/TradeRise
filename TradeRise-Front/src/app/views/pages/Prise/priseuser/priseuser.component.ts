import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {PriseService} from "../../../../services/Prise/PriseService";
import {Prise} from "../../../../models/Prise";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../models/User";
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-priseuser',
  templateUrl: './priseuser.component.html',
  styleUrls: ['./priseuser.component.scss']
})
export class PriseuserComponent implements OnInit {
point:any;
name:any;
  Prises!: Prise[];
  PriseForm: FormGroup;
  message: string = '';
  Prise !:Prise;
  User !:User;
  secondsRemaining: number = 10;
  secondsRemainingstring!:string;
  selectedFileName: string = '';
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  constructor(private PriseService: PriseService,private router: Router,private userAuthService: UserAuthService, public dialogRef: MatDialog,private formBuilder: FormBuilder
    ) { this.PriseForm = this.formBuilder.group({
      titre: ['', Validators.required],
      idprise: ['', Validators.required],
      coust: ['', Validators.required]
    });}


  ngOnInit(): void {
    this.point=this.userAuthService.getpoint(); 
    this.name=this.userAuthService.getname(); 
    this.PriseService.listeAlllPrises().subscribe(Prises => {
      if(Prises){
        this.Prises=Prises;
      }
    });
  }

  isUserPurchased(item: Prise): boolean {
    return item.users.some(user => user.userName === this.name);
  }
  acheter(templateRef: TemplateRef<any>,coust: number,id:number){
    if (this.point<coust) {
      this.message = "Désolé ! Vous n'avez pas assez de points pour acheter ce cadeau !";
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000); 
    return;
  }
  this.PriseService.acheterPrise(id,this.name).subscribe((data) => {
    if(data){
      
      this.message = "Félicitations ! Pour mettre à jour votre compte, veuillez vous déconnecter";
      this.dialogRef.open(templateRef);
      const interval = setInterval(() => {
        this.secondsRemainingstring=""+this.secondsRemaining +""+" secondes avant la déconnexion";
        this.secondsRemaining--;
        if (this.secondsRemaining === 0) {
          clearInterval(interval);
          this.dialogRef.closeAll(); 
          this.userAuthService.clear();
          this.router.navigate(['/auth/login']); 
        }
      }, 1000);}
      
    
  },
    error => {
      console.log(error)
    }
  );
  }

}
