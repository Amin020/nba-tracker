import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Result, Team } from 'src/app/core/models/team.model';
import { GamesService } from 'src/app/core/services/games.service';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  selectedTeam: Team = new Team();
  teams: Array<Team> = new Array<Team>();
  RESULT = Result;
  tracking = false;

  constructor(
    private teamsService: TeamsService,
    private gamesService: GamesService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllTeams();
  }

  private getAllTeams(): void {
    this.teamsService.getAllTeams().subscribe({
      next: (mappedTeams: Array<Team>) => {
        this.teams = mappedTeams;
      }
    });
  }

  get trackedTeams(): Array<Team> {
    return this.teamsService.trackedTeams;
  }

  get NUMBER_OF_DAYS_BEFORE_TODAY(): number {
    return this.gamesService.NUMBER_OF_DAYS_BEFORE_TODAY;
  };

  private isTeamTrackedBefore(teamId: number): boolean {
    return this.trackedTeams.find(trackedTeam => trackedTeam.id === teamId) !== undefined;
  }

  public trackTeam(team: Team): void {
    if (this.isTeamTrackedBefore(team.id!)) {
      this.messageService.add({severity: 'error', detail: 'Team tracked before!'});
      return;
    }

    this.tracking = true;
    this.teamsService.trackTeam(team).subscribe({
      next: (team: Team) => {
        this.tracking = false;
        this.trackedTeams.push(team);
      },
      error: (error: HttpErrorResponse) => {
        this.tracking = false;
      }
    });
  }

  public removeTeamFromTracking(trackedTeamId: number): void {
    const trackedTeamIndex = this.trackedTeams.findIndex(trackedTeam => trackedTeam.id === trackedTeamId);
    if (trackedTeamIndex !== -1) {
      this.trackedTeams.splice(trackedTeamIndex, 1);
      this.messageService.add({severity: 'success', detail: 'Team untracked successfully!'});
    }
  } 

  public viewGameResult(trackedTeam: Team): void {
    this.router.navigate(['./results', trackedTeam.id], { relativeTo: this.activatedRoute });
  }

}
