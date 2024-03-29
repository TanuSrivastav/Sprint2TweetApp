import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../models/Tweet';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  constructor(public httpc:HttpClient, private _tweetservice:TweetService, private _router:Router) { }

  ngOnInit(): void {
  }
  user: Tweet=new Tweet();
  users:Array<Tweet>=new Array<Tweet>();

  AddTweet()
  {
    //console.log(this.CustomerModel);
    console.log(this.user)
    var admindto={
      id:Number(this.user.id),
      authorName:this.user.authorName,
      authorLogo:this.user.authorLogo,
      authorSlug:this.user.authorSlug,
      tweetTime:this.user.tweetTime,
      tweetImage:this.user.tweetImage,
      tweetDescription:this.user.tweetDescription,

    }
    this.httpc.post("https://localhost:44305/api/Tweet",admindto).subscribe(res=>this.PostSuccess(res),res=>this.PostError(res));
    this.user=new Tweet();
  }
  PostSuccess(res:any){
    console.log(res);
    
  }
  PostError(res:any){
    console.log(res);
  }

  getData(){
    console.log("Hi");
    this.httpc.get("https://localhost:44305/api/Tweet").subscribe(res=>this.GetSuccess(res),res=>this.GetError(res));
  }
  GetSuccess(input:any){
    this.users=(input);
  }
  GetError(input:any){
    console.log(input);
  }
  EditTweet(input: Tweet) {
    this.user = input;
  }
  DeleteTweet(input: Tweet) {
    var index=this.users.indexOf(input);
    this.users.splice(index,1);
  }
  uploadFile=(files:any)=>{
    console.log("Hi");
    
    if(files.length==0){
      return;
    }
    let filetoUpload=<File>files[0];
    const formData=new FormData();
    formData.append('file',filetoUpload,filetoUpload.name)
    this.httpc.post("https://localhost:44341/api/upload",formData).subscribe(res=>console.log(res),res=>console.log(res));
  }
}