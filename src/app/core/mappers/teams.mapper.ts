import { MapperInterface } from "../interfaces/mapper.interface";
import { Game } from "../models/game.model";
import { Result, Team } from "../models/team.model";

export class TeamsMapper implements MapperInterface<Team> {

    getTeamResult(games: Array<Game>, teamId: number): Array<Result> {
        const mappedResults = new Array<Result>();
        for (const game of games) {
            if (game.homeTeam.id === teamId) {
                if (game.homeTeamScore > game.visitorTeamScore) {
                    mappedResults.push(Result.win);
                } else if (game.homeTeamScore < game.visitorTeamScore){
                    mappedResults.push(Result.loss);
                } else {
                    mappedResults.push(Result.draw);
                }
            } else if (game.visitorTeam.id === teamId) {
                if (game.visitorTeamScore > game.homeTeamScore) {
                    mappedResults.push(Result.win);
                } else if (game.visitorTeamScore < game.homeTeamScore){
                    mappedResults.push(Result.loss);
                } else {
                    mappedResults.push(Result.draw);
                }
            }
        }
        return mappedResults;
    }

    getTeamAvgPoints(games: Array<Game>, teamId: number, type: 'Scored' | 'Condeded'): number {
        let avgPoints = 0;
        let teamTotalScore = 0;
        let opponentTeamTotalScore = 0;
        for (const game of games) {
            teamTotalScore += game.homeTeam.id === teamId ? game.homeTeamScore : game.visitorTeamScore;
            opponentTeamTotalScore += game.homeTeam.id === teamId ? game.visitorTeamScore : game.homeTeamScore;
        }
        if (type === 'Scored') {
            avgPoints = Math.round(teamTotalScore / games.length);
        } else if (type === 'Condeded') {
            avgPoints = Math.round(opponentTeamTotalScore / games.length)
        }
        return avgPoints;
    }

    fromJson(jsonItem: any): Team {
        const mappedTeam = new Team();
        mappedTeam.id = jsonItem.id;
        mappedTeam.city = jsonItem.city;
        mappedTeam.name = jsonItem.name;
        mappedTeam.division = jsonItem.division;
        mappedTeam.abbreviation = jsonItem.abbreviation;
        mappedTeam.fullName = jsonItem.full_name;
        mappedTeam.logo = `https://interstate21.com/nba-logos/${mappedTeam.abbreviation}.png`;
        mappedTeam.conference = jsonItem.conference;
        return mappedTeam;
    }

    fromList(jsonList: any): Team[] {
        const mappedTeams = new Array<Team>();
        for (const jsonItem of jsonList) {
            const mappedSingleTeam = this.fromJson(jsonItem);
            mappedTeams.push(mappedSingleTeam);
        }
        return mappedTeams;
    }

}