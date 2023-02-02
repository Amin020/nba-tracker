import { MapperInterface } from "../interfaces/mapper.interface";
import { Game } from "../models/game.model";
import { TeamsMapper } from "./teams.mapper";

export class GamesMapper implements MapperInterface<Game> {

    private teamsMapper = new TeamsMapper();

    fromJson(gameResponse: any): Game {
        const mappedGame = new Game();
        mappedGame.homeTeam = this.teamsMapper.fromJson(gameResponse.home_team);
        mappedGame.homeTeamScore = gameResponse.home_team_score;
        mappedGame.visitorTeam = this.teamsMapper.fromJson(gameResponse.visitor_team);
        mappedGame.visitorTeamScore = gameResponse.visitor_team_score;
        return mappedGame;
    }

    fromList(gamesListResponse: any[]): Game[] {
        const mappedGames = new Array<Game>();
        for (const gameResponse of gamesListResponse) {
            const mappedSingleGame = this.fromJson(gameResponse);
            mappedGames.push(mappedSingleGame);
        }
        return mappedGames;
    }
}