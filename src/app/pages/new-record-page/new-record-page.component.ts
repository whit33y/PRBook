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
import {
  bodyPart,
  bodyPartExercises,
  cyclingDistances,
  runningDistances,
  swimmingDistances,
} from '../../data/record-data';
import { User } from '../../services/interfaces/appwrite-db.interfaces';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-new-record-page',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, SpinnerComponent],
  templateUrl: './new-record-page.component.html',
  styleUrl: './new-record-page.component.scss',
})
export class NewRecordPageComponent {
  user?: User;
  runningDistances = runningDistances;
  cyclingDistances = cyclingDistances;
  swimmingDistances = swimmingDistances;
  bodyPart = bodyPart;
  bodyPartExercises = bodyPartExercises;

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

  newRecord = new FormGroup({
    type: new FormControl('run', [Validators.required]),
    distance: new FormControl(0.1),
    time: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/),
      Validators.maxLength(8),
    ]),
  });

  newGymRecord = new FormGroup({
    weight: new FormControl(1, [Validators.required, Validators.min(0)]),
    bodyPart: new FormControl('Chest'),
    excercise: new FormControl('Bench Press'),
    reps: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  validateTimeInput(event: any): void {
    let input = event.target.value.replace(/[^0-9]/g, '');
    if (input.length > 6) {
      input = input.substring(0, 6);
    }
    let formatted = '';
    if (input.length > 0) {
      formatted += input.substring(0, 2);
    }
    if (input.length > 2) {
      formatted += ':' + input.substring(2, 4);
    }
    if (input.length > 4) {
      formatted += ':' + input.substring(4, 6);
    }
    event.target.value = formatted;
    this.newRecord.get('time')?.setValue(formatted, { emitEvent: false });
  }

  successMessage: boolean = false;
  addRecord() {
    let discipline = 1;
    if (this.newRecord.value.type === 'run') {
      discipline = 1;
    } else if (this.newRecord.value.type === 'bike') {
      discipline = 2;
    } else {
      discipline = 3;
    }
    this.AppwriteDbService.createNewRecord(
      this.user!.$id,
      Number(this.newRecord.value.distance!),
      this.newRecord.value.time!,
      discipline
    ).subscribe({
      next: (response) => {
        this.successMessage = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error: ', error);
      },
      complete: () => {},
    });
  }

  addRecordGym() {
    this.AppwriteDbService.createNewGymRecord(
      this.user!.$id,
      Number(this.newGymRecord.value.weight!),
      this.newGymRecord.value.bodyPart!,
      this.newGymRecord.value.excercise!,
      this.newGymRecord.value.reps!
    ).subscribe({
      next: (respoonse) => {
        this.successMessage = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
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
