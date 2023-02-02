import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { Team } from 'src/app/core/models/team.model';
import { GamesService } from 'src/app/core/services/games.service';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss']
})
export class TeamGamesComponent implements OnInit {

  loading = false;
  team = new Team();
  games = new Array<Game>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teamsService: TeamsService,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.getTeamAndGames();
  }

  private getTeamAndGames(): void {
    const teamId = this.activatedRoute.snapshot.params['teamCode'];
    this.loading = true;
    combineLatest([
      this.teamsService.getTeamById(teamId),
      this.gamesService.getTeamGamesByTeamId(teamId)
    ]).subscribe(
      {
        next: ([team, games]: [Team, Array<Game>]) => {
          this.loading = false;
          this.team = team;
          this.games = games;
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
        }
      }
    )
  }

  get NUMBER_OF_DAYS_BEFORE_TODAY(): number {
    return this.gamesService.NUMBER_OF_DAYS_BEFORE_TODAY;
  };

  public backToTeamsStat(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

}
