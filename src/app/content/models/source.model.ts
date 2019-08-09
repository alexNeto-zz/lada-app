import { DayResume } from '../interfaces/day-resume';

export class Source {
    dayResume: DayResume;
    votes: number;

    constructor(source: string, votes?: number) {
        this.dayResume.source = source;
        this.votes = votes || 0;
    }

    domain(): string {
        return this.dayResume.link;
    }
}
