import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GamesMapper } from '../mappers/games.mapper';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  public NUMBER_OF_DAYS_BEFORE_TODAY = 12;
  private baseURL = 'https://free-nba.p.rapidapi.com';
  private gamesMapper = new GamesMapper();

  constructor(
    private httpClient: HttpClient
  ) { }

  private getDatesFilter(): string {
    let datesFilter = '';
    if (this.NUMBER_OF_DAYS_BEFORE_TODAY > 0) {
      let currentDate = new Date();
      currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      for (let i = 0; i < this.NUMBER_OF_DAYS_BEFORE_TODAY; i++) {
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

  getTeamGamesByTeamId(teamId: number): Observable<Array<Game>> {
    const datesFilter = this.getDatesFilter();
    const requestURL = `${this.baseURL}/games?page=0&${datesFilter}per_page=25&team_ids[]=${teamId}`;
    return this.httpClient.get(requestURL)
      .pipe(
        map((gamesResponse: any) => {
          const mappedGames = this.gamesMapper.fromList(gamesResponse.data);
          return mappedGames;
        }));
  }
}
