import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TeamsMapper } from '../mappers/teams.mapper';
import { Game } from '../models/game.model';
import { Team } from '../models/team.model';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public trackedTeams: Array<Team> = new Array<Team>();
  private baseURL = 'https://free-nba.p.rapidapi.com';
  private teamsMapper = new TeamsMapper();

  constructor(
    private gamesService: GamesService,
    private httpClient: HttpClient
  ) { }

  public getAllTeams(): Observable<Array<Team>> {
    return this.httpClient.get(`${this.baseURL}/teams`).
      pipe(
        map((teamsListResponse: any) => {
          const mappedTeamsList = this.teamsMapper.fromList(teamsListResponse.data);
          return mappedTeamsList;
        }));
  }

  public getTeamById(teamId: number): Observable<Team> {
    return this.httpClient.get(`${this.baseURL}/teams/${teamId}`)
      .pipe(
        map((team: any) => {
          const mappedTeam = this.teamsMapper.fromJson(team);
          return mappedTeam;
        })
      );
  }

  public trackTeam(team: Team): Observable<Team> {
    return this.gamesService.getTeamGamesByTeamId(team.id!)
      .pipe(
        map((mappedGames: Array<Game>) => {
          team.results = this.teamsMapper.getTeamResult(mappedGames, team.id!);
          team.avgPointsScored = this.teamsMapper.getTeamAvgPoints(mappedGames, team.id!, 'Scored');
          team.avgPointsConceded = this.teamsMapper.getTeamAvgPoints(mappedGames, team.id!, 'Condeded');
          return team;
        }));
  }

}
