import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './journal/entry/entry.component';
import { EntryEditComponent } from './journal/entry-edit/entry-edit.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: '', redirectTo: '/journal', pathMatch: 'full' },
  {
    path: 'journal',
    component: JournalComponent,
    children: [
      { path: 'new', component: EntryEditComponent },
      {
        path: ':id',
        component: EntryComponent,
      },
      { path: ':id/edit', component: EntryEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
