import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Video } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class VideoService {
    constructor(private http: HttpClient) { }

    getAll() {
    //           User currentUser = localStorage.getItem('currentUser');
    //           currentUser.token  -> header
            
            return this.http.get<Video[]>(`${environment.apiUrl}/videos`, {
                headers: new HttpHeaders()
                    .append('Content-Type', 'application/json').append('token', '' + this.getToken()).append("Content-Encoding", "UTF-8")
            }
        );
    }

    getByCat(cat) {
//           User currentUser = localStorage.getItem('currentUser');
//           currentUser.token  -> header
        
        return this.http.get<Video[]>(`${environment.apiUrl}/videos?cat=`+cat, {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json').append('token', '' + this.getToken()).append("Content-Encoding", "UTF-8")
	}
	);
    }


    getMy(username) {
//           User currentUser = localStorage.getItem('currentUser');
//           currentUser.token  -> header
        
        return this.http.get<Video[]>(`${environment.apiUrl}videos?user=`+username, {
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json').append('token', '' + this.getToken()).append("Content-Encoding", "UTF-8")
	}
	);
    }


    getToken(): String {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser && currentUser.token;
        return token ? token : "";
    }


 /*   getById(id: number) {
        return this.http.get(`${environment.apiUrl}/videos/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }
*/   
     delete(id: string) {
        return this.http.delete(`${environment.apiUrl}videos/${id}`);
    }

}