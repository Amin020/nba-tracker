import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/core/models/team.model';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  selectedTeam: Team = new Team();
  teams: Array<Team> = new Array<Team>();
  trackedTeams: Array<Team> = new Array<Team>();

  constructor(
    private teamsService: TeamsService
  ) { }

  ngOnInit(): void {
    this.teamsService.getAllTeams().subscribe((teams: any) => {
      this.teams = teams.data;
    });
  }

  public trackTeam(teamId: number): void {
    this.teamsService.trackTeam(teamId, 12).subscribe((team: any) => {

    });
  }

}
