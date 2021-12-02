import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: '', redirectTo: '/journal', pathMatch: 'full' },
  {
    path: 'journal',
    component: JournalComponent,
    // children: [
    //   { path: 'new', component: DocumentEditComponent },
    //   {
    //     path: ':id',
    //     component: DocumentDetailComponent,
    //   },
    //   { path: ':id/edit', component: DocumentEditComponent },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
