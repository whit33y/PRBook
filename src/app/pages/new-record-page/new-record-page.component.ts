import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-new-record-page',
  standalone: true,
  imports: [],
  templateUrl: './new-record-page.component.html',
  styleUrl: './new-record-page.component.scss',
})
export class NewRecordPageComponent {
  user: any;
  constructor(
    private route: ActivatedRoute,
    private AppwriteDbService: AppwriteDbService,
    private authService: AuthService
  ) {}

  params?: Params;
  type?: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.type = this.params['type'];
    });
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  addRecord(
    userId: string,
    distance: number,
    time: string,
    discipline: number
  ) {
    this.AppwriteDbService.createNewRecord(
      userId,
      distance,
      time,
      discipline
    ).subscribe({
      next: (response) => {
        console.log('Succesfully added new record: ', response);
      },
      error: (error) => {
        console.error('Error: ', error);
      },
      complete: () => {
        console.log('Completed adding');
      },
    });
  }
}
