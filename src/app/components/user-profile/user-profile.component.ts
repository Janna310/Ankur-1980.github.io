import { Component, OnInit } from '@angular/core';
import { DrinkPostService } from 'src/app/services/drink-post.service';
import { MOCK_POSTS } from 'src/app/MOCK_DATA/mock-posts';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Data } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  posts: Data;
  // postSub: Subscription
  userInfo = [];
  mockPosts = MOCK_POSTS;

  constructor(
    private drinkPosts: DrinkPostService,
    public auth: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.drinkPosts.getUserPosts().subscribe((data: Data) => {
      // console.log('data', data);
      this.posts = data.items;
      console.log('this.posts', this.posts);
    });

    this.userService.getUsers().subscribe((data) => {
      this.userInfo = data.users;
      // console.log(this.userInfo);
    });
  }

  logOut() {
    this.auth.logOut();
  }

  deletePost(postId) {
    console.log(postId);
    this.drinkPosts.deletePost(postId).subscribe((data: Data) => {
      this.posts = data.items;
    });
  }
}
