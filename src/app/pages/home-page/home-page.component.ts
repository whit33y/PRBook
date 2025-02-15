import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private AppwriteDbService: AppwriteDbService,
    private authService: AuthService
  ) {}

  user: any;
  ngOnInit() {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
      this.loadRecords(this.user.$id);
    });
  }

  loadRecords(id: string) {
    this.AppwriteDbService.getAllRunningAndCyclingRecords(id);
  }
}
