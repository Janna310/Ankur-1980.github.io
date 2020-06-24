import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userPic: any;
  token;

  constructor(public nav: NavbarService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.sharedToken.subscribe((token) => {
      console.log(token);
      if (token?.length > 0) {
        this.token = token;
        this.nav.getUserPic().subscribe((response: any) => {
          const { picture } = response.pic[0];
          this.userPic = picture;
          console.log(this.userPic);
        });
      } else {
        this.token = undefined;
        this.userPic = undefined;
      }
    });
  }
}
