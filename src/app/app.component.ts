import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import {AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  email: string;
  logedUserEmail: string;
  password: string;
  postValue: string;
  postName: string;
  posts: Observable<any[]>;
  constructor(public authenticationService: AuthenticationService, public db: AngularFireDatabase) {
    this.posts = db.list('posts').valueChanges();
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.logedUserEmail = this.email;
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
    this.logedUserEmail = '';
  }
  onSubmit() {
    console.log(this.postValue);
    this.db.list('posts').push({email: this.logedUserEmail, postValue: this.postValue});
  }
}
