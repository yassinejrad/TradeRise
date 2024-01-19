import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {PriseService} from "../../../../services/Prise/PriseService";
import {Prise} from "../../../../models/Prise";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../models/User";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-priseadmin',
  templateUrl: './priseadmin.component.html',
  styleUrls: ['./priseadmin.component.scss']
})
export class PriseadminComponent implements OnInit {

  Prises!: Prise[];
  PriseForm: FormGroup;
  message: string = '';
  Prise !:Prise;
  User !:User;
  selectedFileName: string = '';
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  @ViewChild('secondDialog', {static: true}) secondDialog!: TemplateRef<any>;
  constructor(private PriseService: PriseService,private userAuthService: UserAuthService, public dialogRef: MatDialog,private formBuilder: FormBuilder
    ) { this.PriseForm = this.formBuilder.group({
      titre: ['', Validators.required],
      idprise: ['', Validators.required],
      coust: ['', Validators.required]
    });}


  ngOnInit(): void {
    this.PriseService.listeAlllPrises().subscribe(Prises => {
      if(Prises){
        this.Prises=Prises;
      }
    });
  }
  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    }
  }
  
  gotoAjout(){
    this.dialogRef.open(this.firstDialog);
  }
  close(){
    this.dialogRef.closeAll();
  }


  onadd(templateRef: TemplateRef<any>) : void{
      const titre = this.PriseForm.get('titre')?.value;
      const image = this.selectedFileName;
      const coust = this.PriseForm.get('coust')?.value;
      if (!titre || !image || !coust) {
        this.message = 'Oups ! Vous avez oublié de remplire les champs!';
      this.dialogRef.open(templateRef);
      setTimeout(() => {
        this.dialogRef.closeAll();
      }, 4000); 
      return;
    }
    
    this.Prise = this.Prise || {};
    this.Prise.titre=titre;
    this.Prise.image=image;
    this.Prise.coust=coust;
      this.PriseService.AjoutePrise(this.Prise).subscribe((data) => {
        if(data){
          this.message = "Votre prise a bien été enregistrée.";
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
    this.PriseService.removeprise(id).subscribe(data => {
      if(data){
        this.message = "Votre prise a été supprimée.";
          this.dialogRef.open(templateRef);
          setTimeout(() => {
            this.dialogRef.closeAll();
            location.reload();
          }, 4000); 
          return;
      }
    });
  }

  gotoModif(Prise:Prise){
    this.PriseForm.patchValue({
      titre: Prise.titre || '',
      coust: Prise.coust || '',
      idprise: Prise.idprise || ''
    });
    this.selectedFileName=Prise.image;
    this.dialogRef.open(this.secondDialog);
  }

  onmodif(templateRef: TemplateRef<any>) : void{
    const titre = this.PriseForm.get('titre')?.value;
      const image = this.selectedFileName;
      const coust = this.PriseForm.get('coust')?.value;
      const idprise = this.PriseForm.get('idprise')?.value;
      if (!titre || !image || !coust || !idprise) {
        this.message = 'Oups ! Vous avez oublié de remplire les champs!';
      this.dialogRef.open(templateRef);
      setTimeout(() => {
        this.dialogRef.closeAll();
      }, 4000); 
      return;
    }
    
    this.Prise = this.Prise || {};
    this.Prise.titre=titre;
    this.Prise.image=image;
    this.Prise.coust=coust;
    this.Prise.idprise=idprise;
      this.PriseService.updateprise(this.Prise).subscribe((data) => {
        if(data){
          this.message = "Votre prise a bien été enregistrée.";
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
