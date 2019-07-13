import { DayResume } from './day-resume';

export class Source {
    dayResume: DayResume;
    votes: number;

    constructor(dayResume: DayResume, votes?: number) {
        this.dayResume = dayResume;
        this.votes = votes || 0;
    }

    domain(): string {
        return this.dayResume.link;
    }
}
