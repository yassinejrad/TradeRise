import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {UsersService} from "../../../../services/users.service";
import {ConsultationService} from "../../../../services/Consultation/ConsultationService";
import {Consultation} from "../../../../models/Consultation";
import {MatDialog} from '@angular/material/dialog';
import {User} from "../../../../models/User";


@Component({
  selector: 'app-consultation-consultant',
  templateUrl: './consultation-consultant.component.html',
  styleUrls: ['./consultation-consultant.component.scss']
})
export class ConsultationConsultantComponent implements OnInit {
  Consultations!: Consultation[];
  id!:number;
  userList !:User[];
  message: string = '';
  Consultation !:Consultation;
  loader :boolean =false;
  User !:User;
  dateActuelle: Date;
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  constructor(private ConsultationService: ConsultationService,private UsersService: UsersService,private userAuthService: UserAuthService, public dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.ConsultationService.listconsultant(this.userAuthService.getname()).subscribe(Consultations => {
      if(Consultations){
        this.Consultations=Consultations;
       
      }
    });
  }
  isDateInFuture(itemDate: any): boolean {
    this.dateActuelle = new Date();
    const currentDate = new Date(this.dateActuelle.getFullYear(), this.dateActuelle.getMonth(), this.dateActuelle.getDate());
    const convertedItemDate = new Date(itemDate);

    return convertedItemDate > currentDate;
  }
  response(r:boolean,templateRef: TemplateRef<any>){
    this.loader=true;
    this.dialogRef.closeAll();
      this.ConsultationService.reponseconsultant(this.id,this.userAuthService.getname(),r).subscribe(Consultations => {
        if(Consultations){
          this.loader=false;
          if(r==true){this.message = "Vous avez confirmer la demande de l'utulisateur";}
          else{this.message = "Vous avez refuser la demande de l'utulisateur";}
        this.dialogRef.open(templateRef);
        setTimeout(() => {
          this.dialogRef.closeAll();
          location.reload();
        }, 4000); 
        return;
        }
      },(error=>{
        this.loader=false;
        console.log(error)}));
  }

  close(){
    this.dialogRef.closeAll();
  }

  gotopopup(id:number){
    this.id=id;
    this.dialogRef.open(this.firstDialog);
  }

}
