import { Team } from "./team.model";

export class Game {

    homeTeam: Team;
    homeTeamScore: number;
    visitorTeam: Team;
    visitorTeamScore: number;

    constructor() {
        this.homeTeam = new Team();
        this.homeTeamScore = 0;
        this.visitorTeam = new Team();
        this.visitorTeamScore = 0;
    }
}