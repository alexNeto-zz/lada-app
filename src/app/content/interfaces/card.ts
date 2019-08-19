import { Vote } from 'src/app/content/interfaces/vote';
import { DayResume } from './day-resume';

export interface Card {
    location: string;
    dayResume: DayResume;
    vote?: Vote;
}
