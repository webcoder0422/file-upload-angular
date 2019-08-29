import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Cat } from '@app/_models';
import { CatPath } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
    cat :string;
    constructor(private httpClient: HttpClient) { }

    // postFile(fileToUpload: File): void{ // Observable<boolean> 
    //     const endpoint = '`${environment.apiUrl}/upload`';
    //     const formData: FormData = new FormData();
    //     formData.append('fileKey', fileToUpload, fileToUpload.name);
    //  //   return this.httpClient
    //  //   .post(endpoint, formData /*, { headers: yourHeadersConfig }*/);
    //     /*.map(() => { return true; })
    //     .catch((e) => this.handleError(e));*/
          
    // }
    // handleError(e: any) {
    //     console.log("error: "+e);
    // }
    saveCat(cat) {
        this.cat = cat;
    }

    getCat() {
        return this.cat;
    }

}