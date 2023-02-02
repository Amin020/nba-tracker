import { MapperInterface } from "../interfaces/mapper.interface";
import { Game } from "../models/game.model";

export class GamesMapper implements MapperInterface<Game> {

    fromJson(gameResponse: any, teamId: number): Game {
        const mappedGame = new Game();
        if (gameResponse?.home_team?.id === teamId) {
            mappedGame.team = gameResponse.home_team;
            mappedGame.teamScore = gameResponse.home_team_score;
            mappedGame.opponentTeam = gameResponse.visitor_team;
            mappedGame.opponentTeamScore = gameResponse.visitor_team_score;
        } else if (gameResponse?.visitor_team?.id === teamId) {
            mappedGame.team = gameResponse.visitor_team;
            mappedGame.teamScore = gameResponse.visitor_team_score;
            mappedGame.opponentTeam = gameResponse.home_team;
            mappedGame.opponentTeamScore = gameResponse.home_team_score;
        }
        return mappedGame;
    }

    fromList(gamesListResponse: any[], teamId: number): Game[] {
        const mappedGames = new Array<Game>();
        for (const gameResponse of gamesListResponse) {
            const mappedSingleGame = this.fromJson(gameResponse, teamId);
            mappedGames.push(mappedSingleGame);
        }
        return mappedGames;
    }
}