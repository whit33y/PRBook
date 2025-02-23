import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
  ) {}

  params?: Params;
  type?: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.type = this.params['type'];
      if (this.type === 'run') {
        this.newRecord.setValue({ type: 'run', distance: 0.1, time: '' });
        this.isEndurance = true;
        this.isGym = false;
      } else if (this.type === 'bike') {
        this.newRecord.setValue({ type: 'bike', distance: 10, time: '' });
        this.isEndurance = true;
        this.isGym = false;
      } else if (this.type === 'swim') {
        this.newRecord.setValue({ type: 'swim', distance: 0.1, time: '' });
        this.isEndurance = true;
        this.isGym = false;
      } else if (this.type === 'gym') {
        this.isEndurance = false;
        this.isGym = true;
      } else {
        this.isEndurance = true;
        this.isGym = false;
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

  newGymRecord = new FormGroup({
    weight: new FormControl(0),
    bodyPart: new FormControl('Chest'),
    excercise: new FormControl('Bench Press'),
    reps: new FormControl(1),
  });

  bodyPart = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

  bodyPartExercises = {
    Chest: [
      'Bench Press',
      'Incline Bench Press',
      'Decline Bench Press',
      'Dumbbell Fly',
      'Chest Dips',
      'Push-ups',
      'Cable Crossover',
      'Pec Deck Machine',
    ],
    Back: [
      'Pull-ups',
      'Lat Pulldown',
      'Barbell Row',
      'Dumbbell Row',
      'Deadlift',
      'Face Pulls',
      'T-Bar Row',
      'Seated Cable Row',
    ],
    Legs: [
      'Squat',
      'Leg Press',
      'Lunges',
      'Romanian Deadlift',
      'Leg Curl',
      'Leg Extension',
      'Calf Raise',
      'Bulgarian Split Squat',
    ],
    Shoulders: [
      'Overhead Press',
      'Dumbbell Shoulder Press',
      'Arnold Press',
      'Lateral Raises',
      'Front Raises',
      'Face Pulls',
      'Reverse Fly',
      'Shrugs',
    ],
    Arms: [
      'Bicep Curl',
      'Hammer Curl',
      'Preacher Curl',
      'Tricep Dips',
      'Tricep Pushdown',
      'Overhead Tricep Extension',
      'Close-Grip Bench Press',
      'Reverse Curl',
    ],
    Core: [
      'Plank',
      'Crunches',
      'Russian Twists',
      'Leg Raises',
      'Hanging Leg Raises',
      'Ab Rollout',
      'Bicycle Crunches',
      'Dead Bug',
    ],
  };

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

  isGym: boolean = false;
  isEndurance: boolean = false;
  changeType(type: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: type },
      queryParamsHandling: 'merge',
    });
    if (type === 'gym') {
      this.isGym = true;
      this.isEndurance = false;
    } else {
      this.isGym = false;
      this.isEndurance = true;
    }
  }

  onTypeChange(type: string) {
    this.type = type;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: type },
      queryParamsHandling: 'merge',
    });
    let defaultDistance = 0.1;
    if (type === 'bike') {
      defaultDistance = 10;
    } else if (type === 'swim') {
      defaultDistance = 0.1;
    }
    this.newRecord.patchValue({ distance: defaultDistance });
  }

  onBodyPartChange(bodyPart: string) {
    if (bodyPart === 'Chest') {
      this.newGymRecord.setValue({
        weight: 0,
        bodyPart: bodyPart,
        excercise: this.bodyPartExercises.Chest[0],
        reps: 1,
      });
    }
    if (bodyPart === 'Back') {
      this.newGymRecord.setValue({
        weight: 0,
        bodyPart: bodyPart,
        excercise: this.bodyPartExercises.Back[0],
        reps: 1,
      });
    }
    if (bodyPart === 'Legs') {
      this.newGymRecord.setValue({
        weight: 0,
        bodyPart: bodyPart,
        excercise: this.bodyPartExercises.Legs[0],
        reps: 1,
      });
    }
    if (bodyPart === 'Shoulders') {
      this.newGymRecord.setValue({
        weight: 0,
        bodyPart: bodyPart,
        excercise: this.bodyPartExercises.Shoulders[0],
        reps: 1,
      });
    }
    if (bodyPart === 'Arms') {
      this.newGymRecord.setValue({
        weight: 0,
        bodyPart: bodyPart,
        excercise: this.bodyPartExercises.Arms[0],
        reps: 1,
      });
    }
    if (bodyPart === 'Core') {
      this.newGymRecord.setValue({
        weight: 0,
        bodyPart: bodyPart,
        excercise: this.bodyPartExercises.Core[0],
        reps: 1,
      });
    }
  }
}
