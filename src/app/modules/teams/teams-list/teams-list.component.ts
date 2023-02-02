import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Team } from 'src/app/core/models/team.model';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  selectedTeam: Team = new Team();
  teams: Array<Team> = new Array<Team>();
  tracking = false;

  constructor(
    private teamsService: TeamsService,
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

  public onRemovingTeamFromTracking(trackedTeamId: number): void {
    const trackedTeamIndex = this.trackedTeams.findIndex(trackedTeam => trackedTeam.id === trackedTeamId);
    if (trackedTeamIndex !== -1) {
      this.trackedTeams.splice(trackedTeamIndex, 1);
      this.messageService.add({severity: 'success', detail: 'Team untracked successfully!'});
    }
  } 
}
