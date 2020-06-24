import { Component, OnInit } from '@angular/core';
import { MOCK_FEED } from 'src/app/MOCK_DATA/mock-feed';
import { AuthService } from 'src/app/services/auth.service';
import { DrinkPostService } from 'src/app/services/drink-post.service';

@Component({
  selector: 'the-feed-posts',
  templateUrl: './the-feed-posts.component.html',
  styleUrls: ['./the-feed-posts.component.css'],
})
export class TheFeedPostsComponent implements OnInit {
  // theFeed = MOCK_FEED;
  theFeed;
  commentHide = true;

  constructor(private postService: DrinkPostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.theFeed = data;
      console.log(this.theFeed);
    });
  }

  toggle() {
    this.commentHide = !this.commentHide;
  }
}
