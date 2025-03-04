import { Component, HostListener } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import { CardComponent } from '../../components/elements/card/card.component';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
  User,
} from '../../services/interfaces/appwrite-db.interfaces';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { activityTypesSvg } from '../../data/record-data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, SpinnerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private AppwriteDbService: AppwriteDbService,
    private authService: AuthService,
    private router: Router
  ) {}

  isMobile: boolean = window.innerWidth <= 768;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  activityTypesSvg = activityTypesSvg
  user?: User;
  ngOnInit() {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.loadUserRecords(this.user!.$id);
    this.loadGymRecords(this.user!.$id);
  }

  loading: boolean = false;
  loadedRecords: RunningAndCyclingRecordsDocuments[] | undefined;
  loadUserRecords(id: string) {
    this.loading = true;
    this.AppwriteDbService.getUserRecords(id).subscribe({
      next: (response) => {
        this.loadedRecords = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  loadingGym: boolean = false
  loadedGymRecords: GymRecordsDocuments[] | undefined;
  loadGymRecords(id: string){
    this.loadingGym = true;
    this.AppwriteDbService.getUserGymRecords(id).subscribe({
      next: (response) => {
        this.loadedGymRecords = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loadingGym = false;
      },
    });
  }

  navigateTo(route: string, params?: { [key: string]: any }) {
    if (params) {
      this.router.navigate([route], { queryParams: params });
    } else {
      this.router.navigate([route]);
    }
  }
}
