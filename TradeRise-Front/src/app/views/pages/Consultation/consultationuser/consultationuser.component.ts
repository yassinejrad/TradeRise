import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {UsersService} from "../../../../services/users.service";
import {ConsultationService} from "../../../../services/Consultation/ConsultationService";
import {Consultation} from "../../../../models/Consultation";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../models/User";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-consultationuser',
  templateUrl: './consultationuser.component.html',
  styleUrls: ['./consultationuser.component.scss']
})
export class ConsultationuserComponent implements OnInit {

  Consultations!: Consultation[];
  userList !:User[];
  ConsultationForm: FormGroup;
  message: string = '';
  Consultation !:Consultation;
  loader :boolean =false;
  User !:User;
  dateActuelle: Date;
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  @ViewChild('secondDialog', {static: true}) secondDialog!: TemplateRef<any>;
  constructor(private ConsultationService: ConsultationService,private UsersService: UsersService,private userAuthService: UserAuthService, public dialogRef: MatDialog,private formBuilder: FormBuilder
    ) { this.ConsultationForm = this.formBuilder.group({
      date: ['', Validators.required],
      idcons: ['', Validators.required],
      consultant: ['', Validators.required]
    });}

  ngOnInit(): void {
    
    this.ConsultationService.listuser(this.userAuthService.getname()).subscribe(Consultations => {
      if(Consultations){
        this.Consultations=Consultations;
      }
    });
   
    
    
  }
  gotoAjout(){
    this.UsersService.getAllUsers().subscribe(
      (res: Object) => {
        this.userList = res as User[]; 
        if (this.userList && this.userList.length > 0) {
          this.userList = this.userList.filter(user => 
            user.role && !user.role.some(role => role.roleName !== "Consultant")
      );  
        }
        const consultantNames = this.userList.map(user => user.userName);

        this.ConsultationForm.patchValue({
          consultant: consultantNames || [],
        });
        this.dialogRef.open(this.firstDialog);
      },
      error => {
        
        console.error(error);
      }
    );
    
  }
  close(){
    this.dialogRef.closeAll();
  }
  isDateInFuture(itemDate: any): boolean {
    this.dateActuelle = new Date();
    const currentDate = new Date(this.dateActuelle.getFullYear(), this.dateActuelle.getMonth(), this.dateActuelle.getDate());
    const convertedItemDate = new Date(itemDate);

    return convertedItemDate > currentDate;
  }

  onadd(templateRef: TemplateRef<any>) : void{
    const consultant = this.ConsultationForm.get('consultant')?.value;
    const date = this.ConsultationForm.get('date')?.value;
    if (!consultant || !date) {
      this.message = 'Oups ! Vous avez oublié de Choisir votre expert ou la date du Consultation!';
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000); 
    return;
  }
  this.loader=true;
  this.Consultation = this.Consultation || {};
  this.User = this.User || {};
  this.Consultation.date=date;
  this.User.userName=this.userAuthService.getname();
  this.Consultation.user=this.User;
  this.dialogRef.closeAll();
    this.ConsultationService.AjouteConsultation(this.Consultation,consultant).subscribe((data) => {
      if(data){
        this.loader=false;
        this.message = "Votre Demande de Rendez-Vous a été envoyée à l'expert.";
        this.dialogRef.open(templateRef);
        setTimeout(() => {
          this.dialogRef.closeAll();
          location.reload();
        }, 4000); 
        return;
      }
    },
      error => {
        this.loader=false;
        console.log(error)
      }
    );
}
gotoModif(c:Consultation){
  this.ConsultationForm.patchValue({
    date: c.date || '',
    idcons: c.idcons || '',
  });
  this.dialogRef.open(this.secondDialog);
}

onmodif(templateRef: TemplateRef<any>) : void{
  const date = this.ConsultationForm.get('date')?.value;
  const idcons = this.ConsultationForm.get('idcons')?.value;
  
  if (!date || !idcons) {
    this.message = 'Oups ! Vous avez oublié de remplire votre Consultation!';
  this.dialogRef.open(templateRef);
  setTimeout(() => {
    this.dialogRef.closeAll();
  }, 4000); 
  return;
}

    this.ConsultationService.updateconsultation(idcons,date).subscribe((data) => {
      if(data){
        this.message = "Votre Consultation a bien été enregistrée.";
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
ondelete(templateRef: TemplateRef<any>,id: number){
  this.ConsultationService.removeconsultation(id).subscribe(data => {
    if(data){
      this.message = "Votre Consultation a été supprimée.";
        this.dialogRef.open(templateRef);
        setTimeout(() => {
          this.dialogRef.closeAll();
          location.reload();
        }, 4000); 
        return;
    }
  });
}
}
