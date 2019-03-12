import { Component, OnInit } from '@angular/core';
import { Announcer } from './services/announcer';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ebase';
  message$;
  constructor(
    private announcer: Announcer,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // if (this.auth.checkToken()) {
    //   const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    //   this.router.navigateByUrl(returnUrl || "/");
    // }
    this.message$ = this.announcer.message$;
  }
}
