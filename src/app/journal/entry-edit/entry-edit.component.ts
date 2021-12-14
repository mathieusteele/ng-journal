import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entry } from '../entry.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css'],
})
export class EntryEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') entryForm!: NgForm;
  subscription!: Subscription;
  originalEntry!: Entry | null;
  entry!: Entry;
  editMode: boolean = false;

  constructor(
    private journalService: JournalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (!id || id == null) {
        this.editMode = false;
        return;
      }

      this.originalEntry = this.journalService.getEntry(id);

      if (this.originalEntry == null || !this.originalEntry) {
        return;
      }

      this.editMode = true;
      this.entry = JSON.parse(JSON.stringify(this.originalEntry));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newEntry: Entry = new Entry('', value.title, value.content);

    console.log(newEntry);

    if (this.editMode && this.originalEntry) {
      this.journalService.updateEntry(this.originalEntry, newEntry);
    } else {
      this.journalService.addEntry(newEntry);
    }
    this.onClear();
    this.router.navigate(['/journal']);
  }

  onClear() {
    this.entryForm.reset();
    this.editMode = false;
  }

  onCancel() {
    this.router.navigate(['/journal']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
