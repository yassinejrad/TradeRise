import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {CommentaireService} from "../../../../services/Commenatire/CommentaireService";
import {commentaire} from "../../../../models/commentaire";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../models/User";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-commenatireuser',
  templateUrl: './commenatireuser.component.html',
  styleUrls: ['./commenatireuser.component.scss']
})
export class CommenatireuserComponent implements OnInit {
  message1: string = '';
  message2: string = '';
  message3: string = '';
  message4: string = '';
  Commenatires!: commentaire[];
  CommenatireForm: FormGroup;
  CommenatireupdateParentForm: FormGroup;
  CommenatireupdateReponseForm: FormGroup;
  CommenatireajoutForm: FormGroup;
  Commenatire !:commentaire;
  User !:User;
  showReplies: boolean[] = [];
  showReplyForm: boolean[] = [];
  showUpdateparentForm: boolean[] = [];
  showUpdateResponseForm: boolean[] = [];
  newReplyContent: string = '';
  name:string;
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  @ViewChild('secondDialog', {static: true}) secondDialog!: TemplateRef<any>;
  constructor(private CommentaireService: CommentaireService,private userAuthService: UserAuthService, public dialogRef: MatDialog,private formBuilder: FormBuilder
    ) { this.CommenatireForm = this.formBuilder.group({
      contenu: ['', Validators.required],
      idcommentaire: ['', Validators.required]
    });
    this.CommenatireupdateParentForm = this.formBuilder.group({
      contenu: ['', Validators.required],
      idcommentaire: ['', Validators.required]
    });
    this.CommenatireupdateReponseForm = this.formBuilder.group({
      contenu: ['', Validators.required],
      idcommentaire: ['', Validators.required]
    });
    this.CommenatireajoutForm = this.formBuilder.group({
      contenu: ['', Validators.required],
      idcommentaire: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.name=this.userAuthService.getname();
    this.CommentaireService.listCommenatire().subscribe(Commenatires => {
      if(Commenatires){
        this.Commenatires=Commenatires;
        this.Commenatires.forEach(comment => {
          if (comment.reponses) {
            comment.reponses = comment.reponses.sort((a, b) => a.idcommentaire - b.idcommentaire);
          }
        });
      }
    });
  }
parentmangment(index:number):boolean{
  return this.Commenatires[index].user.userName== this.name;
}
reponsemangment(index:number,index2:number):boolean{
  return this.Commenatires[index].reponses[index2].user.userName== this.name;
}
  toggleReplies(item: any): void {
    const index = this.Commenatires.indexOf(item);
    this.showReplies[index] = !this.showReplies[index];
  }

  
 
  toggleReplyForm(index: number): void {
    this.showReplyForm[index] = !this.showReplyForm[index];
    if(this.showReplyForm[index]==true){
    this.CommenatireForm.patchValue({
      idcommentaire: this.Commenatires[index].idcommentaire || '',
    });}
  }
  toggleUpdateparentForm(index: number): void {
    this.showUpdateparentForm[index] = !this.showUpdateparentForm[index];
    if(this.showUpdateparentForm[index]==true){
      this.CommenatireupdateParentForm.patchValue({
        idcommentaire: this.Commenatires[index].idcommentaire || '',
        contenu: this.Commenatires[index].contenu || '',
      });}
  }
  toggleResponseForm(index: number,index2: number): void {
    this.showUpdateResponseForm[index] = !this.showUpdateResponseForm[index];
    if(this.showUpdateResponseForm[index]==true){
      this.CommenatireupdateReponseForm.patchValue({
        idcommentaire: this.Commenatires[index2].reponses[index].idcommentaire || '',
        contenu: this.Commenatires[index2].reponses[index].contenu || '',
      });}
  }
  addReply(): void {
    const contenu = this.CommenatireForm.get('contenu')?.value;
    const idcommentaire = this.CommenatireForm.get('idcommentaire')?.value;
    if(contenu || idcommentaire){
    this.Commenatire = this.Commenatire || {};
    this.User = this.User || {};
    this.Commenatire.contenu=contenu;
    this.User.userName=this.userAuthService.getname();
    this.Commenatire.user=this.User;
    this.CommentaireService.Ajoutereponse(this.Commenatire,idcommentaire).subscribe((data) => {console.log(data);
      location.reload();
    },
    error => {
      console.log(error)
    }
  );}
  else{
    this.message1="Il faut remplire votre commentaire";
  }
  }

  deleteComment(id: number): void {
    this.CommentaireService.removeCommenatire(id).subscribe((data) => {console.log(data);
      location.reload();
    },
    error => {
      console.log(error)
    }
  );
  }


  updateComment(): void {
    const contenu = this.CommenatireupdateParentForm.get('contenu')?.value;
    const idcommentaire = this.CommenatireupdateParentForm.get('idcommentaire')?.value;
    if(contenu || idcommentaire){
    this.CommentaireService.updateCommenatire(idcommentaire,contenu).subscribe((data) => {console.log(data);
      location.reload();
    },
    error => {
      console.log(error)
    }
  );}
  else{
    this.message2="Il faut remplire votre commentaire";
  }
  }

  updateComment2(): void {
    const contenu = this.CommenatireupdateReponseForm.get('contenu')?.value;
    const idcommentaire = this.CommenatireupdateReponseForm.get('idcommentaire')?.value;
    if(contenu || idcommentaire){
    this.CommentaireService.updateCommenatire(idcommentaire,contenu).subscribe((data) => {console.log(data);
      location.reload();
    },
    error => {
      console.log(error)
    }
  );}
  else{
    this.message3="Il faut remplire votre commentaire";
  }
  }
  addcomment(){
    const contenu = this.CommenatireajoutForm.get('contenu')?.value;
    if(contenu ){
    this.Commenatire = this.Commenatire || {};
    this.User = this.User || {};
    this.Commenatire.contenu=contenu;
    this.User.userName=this.userAuthService.getname();
    this.Commenatire.user=this.User;
    this.CommentaireService.AjouteCommenatire(this.Commenatire).subscribe((data) => {
      console.log(data);
      location.reload();
    },
    error => {
      console.log(error)
    }
  );}
  else{
    this.message4="Il faut remplire votre commentaire";
  }
  }

}
