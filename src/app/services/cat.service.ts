import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Cat } from '@app/_models';
import { CatPath } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CatService {
    constructor(private http: HttpClient) { }

    getByParent(parent: string) {
        return this.http.get<Cat[]>(`${environment.apiUrl}/cats?cat=${parent}`);
    }
    getCatPath(cat: string) {
        return this.http.get<CatPath[]>(`${environment.apiUrl}/catpath?cat=${cat}`);
    }

}