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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, SpinnerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  activityTypesSvg = activityTypesSvg;
  user?: User;
  loadingEndurance: boolean = false;
  loadedRecords: RunningAndCyclingRecordsDocuments[] | undefined;
  loadingGym: boolean = false;
  loadedGymRecords: GymRecordsDocuments[] | undefined;

  constructor(
    private appWriteDbService: AppwriteDbService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.loadUserRecords('endurance', this.user!.$id);
    this.loadUserRecords('gym', this.user!.$id);
  }

  loadUserRecords(type: 'endurance' | 'gym', id: string) {
    const serviceMethod =
      type === 'endurance'
        ? this.appWriteDbService.getUserRecords(id)
        : this.appWriteDbService.getUserGymRecords(id);
    type === 'endurance'
      ? (this.loadingEndurance = true)
      : (this.loadingGym = true);
    if (!serviceMethod || !('subscribe' in serviceMethod)) {
      console.error('Invalid service method');
      return;
    }
    (
      serviceMethod as Observable<
        RunningAndCyclingRecordsDocuments[] | GymRecordsDocuments[]
      >
    ).subscribe({
      next: (response) => {
        if (type === 'endurance') {
          this.loadedRecords = response as RunningAndCyclingRecordsDocuments[];
        } else {
          this.loadedGymRecords = response as GymRecordsDocuments[];
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        type === 'endurance'
          ? (this.loadingEndurance = false)
          : (this.loadingGym = false);
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

  isMobile: boolean = window.innerWidth <= 768;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
