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

  selectedTeam: Team = new Team();
  teams: Array<Team> = new Array<Team>();
  trackedTeams: Array<Team> = new Array<Team>();
  RESULT = Result;

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

    this.teamsService.trackTeam(teamId, 12).subscribe({
      next: (team: Team) => {
        this.trackedTeams.push(team);
        console.log("Tracked team: ", this.trackedTeams);
      }
    });
  }

  public viewGameResult(trackedTeam: Team): void {

  }

}
