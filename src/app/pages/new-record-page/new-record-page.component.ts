import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/elements/button/button.component';

@Component({
  selector: 'app-new-record-page',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
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
      if (this.type === 'run') {
        this.newRecord.setValue({ type: 'run', distance: 0.1, time: '' });
      } else if (this.type === 'bike') {
        this.newRecord.setValue({ type: 'bike', distance: 10, time: '' });
      } else if (this.type === 'swim') {
        this.newRecord.setValue({ type: 'swim', distance: 0.1, time: '' });
      }
    });
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  runningDistances = [0.1, 0.4, 1, 2, 3, 5, 10, 15, 21, 42, 50, 100];
  cyclingDistances = [10, 20, 40, 50, 90, 100, 160, 200];
  swimmingDistances = [0.1, 0.2, 0.4, 0.8, 1.5, 3.8, 5, 10];

  newRecord = new FormGroup({
    type: new FormControl('run'),
    distance: new FormControl(0.1),
    time: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/),
    ]),
  });

  validateTimeInput(event: any): void {
    let input = event.target.value;
    event.target.value = input.replace(/[^0-9:]/g, '');
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

  testForm() {
    console.log(
      this.newRecord.value.distance,
      this.newRecord.value.type,
      this.newRecord.value.time
    );
  }
}
