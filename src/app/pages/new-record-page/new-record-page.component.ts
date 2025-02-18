import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-record-page',
  standalone: true,
  imports: [],
  templateUrl: './new-record-page.component.html',
  styleUrl: './new-record-page.component.scss',
})
export class NewRecordPageComponent {
  constructor(private route: ActivatedRoute) {}

  params?: Params;
  type?: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.type = this.params['type'];
    });
  }
}
