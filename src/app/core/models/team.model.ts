export class Team {

    id?: number;
    city?: string;
    name?: string;
    division?: string;
    abbreviation?: string;
    fullName?: string;
    logo?: string;
    conference?: Conference;
    results?: Array<Result>;
    avgPointsScored?: number;
    avgPointsConceded?: number;

    constructor() {
    }

}

export enum Conference {
    western = "West",
    eastern = "East"
}

export enum Result {
    win = "W",
    loss = "L",
    draw = "D"
}