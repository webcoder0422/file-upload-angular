import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
    signinForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string='/';
    error = '';
    response:object;
    public show:boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
        this.signinForm = this.formBuilder.group({
            email_mobile: ['john', Validators.required],
            password: ['john2john', Validators.required]
        });

        this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.signinForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.error = null;

        if (this.signinForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f.email_mobile.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                user => {
                    this.error = user.message;
                    this.loading = false;
                    if(this.error==null){
                        this.router.navigate([this.returnUrl]);
                    }
                },
        );        
    }
    afterlogged(){

    }

}

