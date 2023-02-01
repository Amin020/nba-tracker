export class Team {

    id?: number;
    teamName?: string;
    logo?: string;
    conference?: Conferences
    results?: Array<any>;
    avgNumberOfPoints?: number;

    constructor() { }

}

export enum Conferences {
    western = "Western",
    eastern = "Eastern"
}