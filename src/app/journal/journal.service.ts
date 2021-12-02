import { EventEmitter, Injectable } from '@angular/core';
import { Entry } from './entry.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  entrySelectedEvent = new EventEmitter<Entry>();
  entryListChangedEvent = new Subject<Entry[]>();

  private entries: Entry[] = [];

  constructor(private http: HttpClient) { }

  getEntries(): Entry[] {
    this.http
      .get<{ message: string; entries: Entry[] }>(
        'http://localhost:3000/journal'
      )
      .subscribe((responseData) => {
        this.entries = responseData.entries;
        this.entries.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
        this.entryListChangedEvent.next(this.entries.slice());
      }),
      (error: any) => {
        console.log(error);
      };
    return this.entries;
  }

  getEntry(id: string): Entry | null {
    let matches = this.entries.filter((entry) => entry.id === id);
    return matches.length ? matches[0] : null;
  }

  addEntry(newEntry: Entry) {
    if (!newEntry) {
      return;
    }

    newEntry.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; entry: Entry }>(
        'http://localhost:3000/journal',
        newEntry,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.entries.push(responseData.entry);
        this.entryListChangedEvent.next(this.entries.slice());
      });
  }

  updateEntry(originalEntry: Entry, newEntry: Entry) {
    if (!originalEntry || !newEntry) {
      return;
    }

    let position = this.entries.findIndex(
      (d) => d.id === originalEntry.id
    );

    if (position < 0) {
      return;
    }

    newEntry.id = originalEntry.id;
    // newEntry._id = originalEntry._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'http://localhost:3000/journal/' + originalEntry.id,
        newEntry,
        { headers: headers }
      )
      .subscribe(() => {
        this.entries[position] = newEntry;
        this.entryListChangedEvent.next(this.entries.slice());
      });
  }

  deleteEntry(entry: Entry) {
    if (!entry) {
      return;
    }

    const position = this.entries.findIndex((d) => d.id === entry.id);

    if (position < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/journal/' + entry.id)
      .subscribe(() => {
        const updatedEntries = this.entries.filter((filteredEntry) => {
          return filteredEntry.id !== entry.id;
        });
        this.entries = updatedEntries;
        this.entryListChangedEvent.next(this.entries.slice());
      });
  }
}
