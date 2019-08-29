import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpEventType, HttpEvent } from '@angular/common/http';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { FileUploadService } from '@app/services/file-upload.service';

// const URL = 'http://localhost:3000/api/upload';
const URL = 'https://vi-host.com/api/upload2';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  cat: string;
  uploadForm: FormGroup;
  model: FormGroup;
  fileData: File = null;
  progress: number;
  status: string;
  submitted = false;
  constructor(private authenticationService: AuthService, private fileuploadService: FileUploadService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    this.currentUser = user;
  });
 }
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.model = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      permit: ['', Validators.required],
      file: ['', Validators.required]
    });
  }
  get f() { return this.model.controls; }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files);
      this.uploadForm.get('profile').setValue(file);
      this.status = '';
        this.progress = 0;
    }
  }

  onSubmit() {
    console.log(this.fileuploadService.getCat());
    this.submitted = true;
    if (this.model.invalid) {
      return;
    }
    const formData = new FormData();
    var data =this.model.value;
    formData.append("username", this.currentUser.username);
    formData.append("title", data.title);
    formData.append("cat", this.fileuploadService.getCat());
    formData.append("description", data.description);
    formData.append("permit", data.permit);
    formData.append("file", this.uploadForm.get('profile').value, this.uploadForm.get('profile').value.name);
    console.log(formData);

    this.http.post<any>(URL, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event) => {
        if(event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.status = 'progress';
        }
      }
    );
  }
}