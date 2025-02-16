import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import { CardComponent } from '../../components/elements/card/card.component';
import { RunningAndCyclingRecords } from '../../services/interfaces/appwrite-db.interfaces';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private AppwriteDbService: AppwriteDbService,
    private authService: AuthService
  ) {}

  runner =
    '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-run"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 17l5 1l.75 -1.5" /><path d="M15 21l0 -4l-4 -3l1 -6" /><path d="M7 12l0 -3l5 -1l3 3l3 1" /></svg>';
  bike =
    '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bike"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M19 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 19l0 -4l-3 -3l5 -4l2 3l3 0" /><path d="M17 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>';
  user: any;
  ngOnInit() {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
      this.loadRecords(this.user.$id);
    });
  }

  loadedRecords: RunningAndCyclingRecords | undefined;
  loadRecords(id: string) {
    this.AppwriteDbService.getAllRunningAndCyclingRecords(id)
      .then((documents) => {
        this.loadedRecords = {
          total: documents.length,
          documents: documents,
        };
      })
      .catch((error) => {
        console.error('Failed to load records:', error);
      });
  }

  addRecord() {
    this.AppwriteDbService.createRunningAndCyclingRecord(
      this.user.$id,
      40,
      '00:01:05',
      false
    );
  }
}
