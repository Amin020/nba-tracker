import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Result, Team } from 'src/app/core/models/team.model';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  NUMBER_OF_DAYS_BEFORE_TODAY = 12;
  selectedTeam: Team = new Team();
  teams: Array<Team> = new Array<Team>();
  trackedTeams: Array<Team> = new Array<Team>();
  RESULT = Result;
  tracking = false;

  constructor(
    private teamsService: TeamsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.teamsService.getAllTeams().subscribe({
      next: (mappedTeams: Array<Team>) => {
        this.teams = mappedTeams;
      }
    });
  }

  private isTeamTrackedBefore(teamId: number): boolean {
    return this.trackedTeams.find(trackedTeam => trackedTeam.id === teamId) !== undefined;
  }

  public trackTeam(teamId: number): void {
    if (this.isTeamTrackedBefore(teamId)) {
      this.messageService.add({severity: 'error', detail: 'Team tracked before!'});
      return;
    }

    this.tracking = true;
    this.teamsService.trackTeam(teamId, this.NUMBER_OF_DAYS_BEFORE_TODAY).subscribe({
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

  }

}
