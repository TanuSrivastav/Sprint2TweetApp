import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public searchTerm: string='';
    
  AuthService: any;
  tweets: any;

  constructor(private auth: AuthService, private accountService :AccountService, private _tweetservice: TweetService) { }

  users: Array<UserData> = new Array<UserData>();
  ngOnInit(): void {

    this._tweetservice.getProducts().subscribe(res => this.tweets = res, err => console.log(err))
    this.auth.getUser().subscribe((res: UserData[]) => this.users = res, (err: any) => console.log(err))
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.AuthService.search.next(this.searchTerm);
  }
  clickMe(){
    this.accountService.sendClickEvent();
  }
  quantity:number=0;
  i=0;
  plus(){
    if(this.i !=50){
      this.i++;
      this.quantity=this.i;
    }
  }
}