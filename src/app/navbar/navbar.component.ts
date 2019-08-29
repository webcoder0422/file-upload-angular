import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { FileUploadService } from '@app/services/file-upload.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  cat: string;
  constructor(private authenticationService: AuthService, private fileuploadService: FileUploadService, private route: ActivatedRoute) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.route.queryParams.subscribe(params => {
      var cat0 = params['cat'];
      console.log("sidebar.constructor.cat="+cat0);
      if(this.cat != cat0) {
          this.cat = cat0;
          // this.ngOnInit();
      }
    });
   }

  ngOnInit() {
  }
  // catUrl() {
  //   var url = window.location.href;
  //   if(url.includes("upload") == true) return;
  //   if(this.cat == undefined){
  //     // window.location.href=url.split("?cat=")[0] + "upload";
  //     // console.log(url.split("?cat=")[0] + );
  //     this.fileuploadService.getCat("upload");
  //   } else {
  //     // window.location.href = url.split("?cat=")[0] + "upload?cat=" + this.cat;
  //     console.log(url.split("?cat=")[0] + "upload?cat=" + this.cat);
  //     this.fileuploadService.getCat("upload?cat=" + this.cat);
  //   }
    
    
  // }

  logout() {
    this.authenticationService.logout();
    this.ngOnInit();
  //  this.router.navigate(['/video']);
}

}
