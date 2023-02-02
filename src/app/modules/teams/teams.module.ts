import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { SharedModule } from '../shared/shared.module';
import { TeamGamesComponent } from './team-games/team-games.component';


@NgModule({
  declarations: [
    TeamsListComponent,
    TeamGamesComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule
  ]
})
export class TeamsModule { }
