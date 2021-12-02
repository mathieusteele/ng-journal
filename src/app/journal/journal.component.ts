import { Component, OnInit } from '@angular/core';

import {Entry} from "./entry.model"
import { JournalService } from './journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  selectedEntry!: Entry;

  constructor(private journalService: JournalService) { }

  ngOnInit() {
    this.journalService.entrySelectedEvent.subscribe(
      (entry: Entry) => {
        this.selectedEntry = entry;
      }
    );
  }

  onSelectEntry(selectedEntry: Entry) {
    this.selectedEntry = selectedEntry;
  }

}
