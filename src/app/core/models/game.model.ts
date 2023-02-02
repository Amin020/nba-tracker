import { Team } from "./team.model";

export class Game {

    team: Team;
    teamScore: number;
    opponentTeam: Team;
    opponentTeamScore: number;

    constructor() {
        this.team = new Team();
        this.opponentTeam = new Team();
        this.teamScore = 0;
        this.opponentTeamScore = 0;
    }
}