import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamGamesComponent } from './team-games/team-games.component';
import { TeamsListComponent } from './teams-list/teams-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsListComponent,
  },
  {
    path: 'results/:teamCode',
    component: TeamGamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
