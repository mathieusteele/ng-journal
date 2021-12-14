import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entry } from '../entry.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];
  private subscription!: Subscription;

  constructor(private journalService: JournalService) {}

  ngOnInit() {
    this.entries = this.journalService.getEntries();

    this.subscription = this.journalService.entryListChangedEvent.subscribe(
      (entryList: Entry[]) => {
        this.entries = entryList;
      }
    );

    console.log(this.entries);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
