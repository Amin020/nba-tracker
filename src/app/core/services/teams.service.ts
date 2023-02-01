import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public baseURL = 'https://free-nba.p.rapidapi.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllTeams(): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/teams`);
  }

  private getDatesFilter(numberOfDaysFromNow: number): string {
    let datesFilter = '';
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

    return datesFilter;
  }

  public trackTeam(teamId: number, numberOfDaysFromNow: number): Observable<Object>{
    const datesFilter = this.getDatesFilter(numberOfDaysFromNow);
    return this.httpClient.get(`${this.baseURL}/games?page=0&${datesFilter}per_page=12&team_ids[]=${teamId}`);
  }

}
