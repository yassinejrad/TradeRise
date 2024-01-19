import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../../../services/user-auth.service";
import {reclamtionservice} from "../../../../services/Reclamtion/reclamtionservice";
import {Reclamtion} from "../../../../models/Reclamtion";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-reclamtionadmin',
  templateUrl: './reclamtionadmin.component.html',
  styleUrls: ['./reclamtionadmin.component.scss']
})
export class ReclamtionadminComponent implements OnInit {
  Reclamtions!: Reclamtion[];
  loader :boolean =false;
  constructor(private reclamtionservice: reclamtionservice,private userAuthService: UserAuthService) { }


  ngOnInit(): void {
    this.reclamtionservice.listeAlllReclamtions().subscribe(Reclamtions => {
      if(Reclamtions){
        this.Reclamtions=Reclamtions;
      }
    });
  }

  change(id: number){
    this.loader=true;
    this.reclamtionservice.MarkItSeen(id).subscribe(data => {
      if(data){
        this.loader=false;
        location.reload();
      }
    },(error =>{
      console.log(error);
    }));
  }

}
