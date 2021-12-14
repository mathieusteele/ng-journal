import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Entry } from '../entry.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  id!: string;
  // entry?: Entry | null;

  @Input() entry!: Entry;
  constructor(
    private journalService: JournalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // this.entry = this.journalService.getEntry(this.id);
    });
  }

  onDelete() {
    if (this.entry) {
      this.journalService.deleteEntry(this.entry);
    }
    this.router.navigate(['/journal']);
  }
}
