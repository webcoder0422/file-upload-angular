import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Mediaitem } from '../mediaitem';
import { ActivatedRoute } from "@angular/router";
import { User } from '@app/_models';
import { Video } from '@app/_models';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { VideoService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  videos: Video[] = [];

 // items: Mediaitem[];
  cat: string; 		// current category

  constructor(
        private videoService: VideoService,
        private authenticationService: AuthService,
        private apiService: ApiService,
        private route: ActivatedRoute
    ) { 
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
        });

      this.route.queryParams.subscribe(params => {
          var cat0 = params['cat'];
          console.log("video.constructor.cat="+cat0);
          if(this.cat != cat0) {
              this.cat = cat0;
              console.log("category changed, need to refresh");
              this.ngOnInit();
          }
        });
  }

  ngOnInit() {
    if(this.cat) {
      this.getItemsByCat();
    } else {
      this.getItems();
    }
  }

  getItems(): void {
     //   console.log("getItems()");
    //this.apiService.getAll().subscribe((data: Mediaitem[]) => this.items = data);
        this.videoService.getAll().pipe(first()).subscribe(videos => {
          this.videos = videos;
      });
  }

  getItemsByCat(): void {
    //console.log("getItemsByCat()");
    this.videoService.getByCat(this.cat).pipe(first()).subscribe(videos => {
      this.videos = videos;
    });
    //this.apiService.getVideosByCategory(this.cat).subscribe((data: Mediaitem[]) => this.items = data);
  }

  getDur(sec:number) {
      var h = Math.floor(sec/3600);
      var m = Math.floor(sec%3600/60);
      var s = Math.floor((sec%3600)%60);
      var mm = "";
      var ss = "";
      if(m.toString().length==1){
        mm = "0" + m;
      } else {
        mm = "" + m;
      }
      if(s.toString().length==1){
        ss = "0" + s;
      } else {
        ss = "" + s;
      }
      return h+":"+mm+":"+ss;
  }

}
