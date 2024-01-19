import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {MatDialog} from '@angular/material/dialog';
import {PriseService} from "../../../services/Prise/PriseService";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList !:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  name:any;
  message: string = '';
    pointsForm: FormGroup;
  @ViewChild('Dialog', {static: true}) Dialog!: TemplateRef<any>;
  @ViewChild('firstDialog', {static: true}) firstDialog!: TemplateRef<any>;
  constructor(private userService:UsersService,private MatDialog:MatDialog,private PriseService:PriseService,private formBuilder: FormBuilder) { 
    this.pointsForm = this.formBuilder.group({
      points: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllUser();
    console.log(this.userList);
  }
  getAllUser(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.userList = res;
        console.log(res)
      })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUser();
  }

  goToPoints(name:any){
    this.name=name;
    this.MatDialog.open(this.firstDialog);
  }
  close(){
    this.MatDialog.closeAll();
  }
  onConfirmer(templateRef: TemplateRef<any>): void{
    const points = this.pointsForm.get('points')?.value;
    if (!points) {
      this.message = 'Oups ! Vous avez oublié de remplire le champ!';
    this.MatDialog.open(templateRef);
    setTimeout(() => {
      this.MatDialog.closeAll();
    }, 4000); 
    return;
  }
  
    this.PriseService.givepoints(points,this.name).subscribe((data) => {
      if(data){
        this.message = "Attribution effectuée avec succès.";
        this.MatDialog.open(templateRef);
        setTimeout(() => {
          this.MatDialog.closeAll();
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
