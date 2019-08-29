import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FileUploadService } from '@app/services/file-upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isOpen = false;
  cat: string;
  constructor(private route: ActivatedRoute, private fileuploadService: FileUploadService) {
    this.route.queryParams.subscribe(params => {
      var cat0 = params['cat'];
      console.log("sidebar.constructor.cat="+cat0);
      if(this.cat != cat0) {
          this.cat = cat0;
          // this.ngOnInit();
          var url = window.location.href;
          if(url.includes("upload") == true) return;
          if(this.cat == undefined){
            this.fileuploadService.saveCat("");
          } else {
            this.fileuploadService.saveCat(this.cat);
          }
          
      }
    });
   }
  ngOnInit() {
  }
  
  public toggleNavSidebar() {
    this.isOpen = !this.isOpen;
  }
  
}
