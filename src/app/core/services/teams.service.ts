import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GamesMapper } from '../mappers/games.mapper';
import { TeamsMapper } from '../mappers/teams.mapper';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private baseURL = 'https://free-nba.p.rapidapi.com';
  private gamesMapper = new GamesMapper();
  private teamsMapper = new TeamsMapper();

  constructor(
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

  private getDatesFilter(numberOfDaysFromNow: number): string {
    let datesFilter = '';
    if (numberOfDaysFromNow > 0) {
      let currentDate = new Date();
      for (let i = 0; i < numberOfDaysFromNow; i++) {
        const year = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const month = currentMonth.toString().length === 1 ? `0${currentMonth}` : currentMonth;
        const currentDay = currentDate.getDate();
        const day = currentDay.toString().length === 1 ? `0${currentDay}` : currentDay;
        datesFilter += `dates[]=${year}-${month}-${day}&`;
        currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      }
    }
    return datesFilter;
  }

  public trackTeam(teamId: number, numberOfDaysFromNow: number): Observable<Object> {
    const datesFilter = this.getDatesFilter(numberOfDaysFromNow);
    const requestURL = `${this.baseURL}/games?page=0&${datesFilter}per_page=25&team_ids[]=${teamId}`;
    return this.httpClient.get(requestURL)
      .pipe(
        map((gamesResponse: any) => {
          const mappedGames = this.gamesMapper.fromList(gamesResponse.data, teamId);
          const mappedTeam = this.teamsMapper.fromJson(mappedGames[0].team); // Team of all array items is the same, so we will take the first one.
          mappedTeam.results = this.teamsMapper.getTeamResult(mappedGames);
          mappedTeam.avgPointsScored = this.teamsMapper.getTeamAvgPoints(mappedGames, 'Scored');
          mappedTeam.avgPointsConceded = this.teamsMapper.getTeamAvgPoints(mappedGames, 'Condeded');
          return mappedTeam;
        }));
  }

}
