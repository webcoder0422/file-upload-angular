import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mediaitem } from '../mediaitem';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://vi-host.com/api/videos';

  constructor(private http: HttpClient) { }
 
  getAll (){
    return this.http.get(this.apiUrl);
  }

  getVideosByCategory(cat: string){
    return this.http.get(this.apiUrl + '/?cat='+cat);
  }

}
