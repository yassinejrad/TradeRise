import { HttpClient, HttpEventType } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;

  ngOnInit(): void {
    console.log("hi");
    this.viewImage();
    console.log("hi");
  }
  viewImage() {
    this.httpClient.get('http://localhost:8089/get/image/info/' + 'yassine.jpg', {
      params: {
        userName: 'bb' // Replace with the actual username
      }
    })
      .subscribe(
        (res) => {
          // Handle the response here
          console.log("fuck");
          this.postResponse = res;
          console.log(res);
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        },
        error => {
          // Handle errors here
        }
      );
  }
}
