import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './journal/entry/entry.component';
import { JournalComponent } from './journal/journal.component';
import { EntryListComponent } from './journal/entry-list/entry-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    JournalComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
