import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {reclamtionservice} from "../../../../services/Reclamtion/reclamtionservice";
import {Reclamtion} from "../../../../models/Reclamtion";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../models/User";
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-reclamtionuser',
  templateUrl: './reclamtionuser.component.html',
  styleUrls: ['./reclamtionuser.component.scss']
})
export class ReclamtionuserComponent implements OnInit {
  Reclamtions!: Reclamtion[];
  ReclamtionForm: FormGroup;
  message: string = '';
  Reclamtion !:Reclamtion;
  loader :boolean =false;
  User !:User;
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  @ViewChild('secondDialog', {static: true}) secondDialog!: TemplateRef<any>;
  constructor(private reclamtionservice: reclamtionservice,private userAuthService: UserAuthService, public dialogRef: MatDialog,private formBuilder: FormBuilder
    ) { this.ReclamtionForm = this.formBuilder.group({
      message: ['', Validators.required],
      id: ['', Validators.required]
    });}

  ngOnInit(): void {
    this.reclamtionservice.listeReclamtionsforuser(this.userAuthService.getname()).subscribe(Reclamtions => {
      if(Reclamtions){
        this.Reclamtions=Reclamtions;
      }
    });
  }

  gotoAjout(){
    this.dialogRef.open(this.firstDialog);
  }
  close(){
    this.dialogRef.closeAll();
  }


  onadd(templateRef: TemplateRef<any>) : void{
      const message = this.ReclamtionForm.get('message')?.value;
      if (!message) {
        this.message = 'Oups ! Vous avez oublié de remplire votre reclamation!';
      this.dialogRef.open(templateRef);
      setTimeout(() => {
        this.dialogRef.closeAll();
      }, 4000); 
      return;
    }
    this.loader=true;
    this.Reclamtion = this.Reclamtion || {};
    this.User = this.User || {};
    this.Reclamtion.name=this.userAuthService.getname();
    this.Reclamtion.message=message;
    this.User.userName=this.userAuthService.getname();
    this.Reclamtion.user=this.User;
    this.dialogRef.closeAll();
      this.reclamtionservice.AjouteReclamtion(this.Reclamtion).subscribe((data) => {
        if(data){
          this.loader=false;
          this.message = "Votre réclamation a bien été enregistrée.";
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
    this.reclamtionservice.DeleteReclamtion(id).subscribe(data => {
      if(data){
        this.message = "Votre réclamation a été supprimée.";
          this.dialogRef.open(templateRef);
          setTimeout(() => {
            this.dialogRef.closeAll();
            location.reload();
          }, 4000); 
          return;
      }
    });
  }

  gotoModif(rec:Reclamtion){
    this.ReclamtionForm.patchValue({
      message: rec.message || '',
      id: rec.idrec || '',
    });
    this.dialogRef.open(this.secondDialog);
  }

  onmodif(templateRef: TemplateRef<any>) : void{
    const message = this.ReclamtionForm.get('message')?.value;
    const idrec = this.ReclamtionForm.get('id')?.value;
    if (!message || !idrec) {
      this.message = 'Oups ! Vous avez oublié de remplire votre reclamation!';
    this.dialogRef.open(templateRef);
    setTimeout(() => {
      this.dialogRef.closeAll();
    }, 4000); 
    return;
  }
  this.Reclamtion = this.Reclamtion || {};
  this.User = this.User || {};
  this.Reclamtion.idrec=idrec;
  this.Reclamtion.name=this.userAuthService.getname();
  this.Reclamtion.message=message;
  this.User.userName=this.userAuthService.getname();
  this.Reclamtion.user=this.User;
    this.reclamtionservice.editReclamtion(this.Reclamtion).subscribe((data) => {
      if(data){
        this.message = "Votre réclamation a bien été enregistrée.";
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
}
