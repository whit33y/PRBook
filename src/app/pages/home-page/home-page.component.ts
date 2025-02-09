import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private AppwriteDbService: AppwriteDbService) {}

  loadRecords() {
    this.AppwriteDbService.getAllRunningAndCyclingRecords();
  }
}
