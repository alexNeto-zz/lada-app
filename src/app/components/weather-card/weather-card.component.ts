import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Vote } from '../../content/interfaces/vote';
import { Card } from '../../content/interfaces/card';
import { DayResume } from '../../content/interfaces/day-resume';
import { LocationFinderService } from '../../content/services/location/location-finder.service';
import { SettingsService } from '../../content/services/settings/settings.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() card: Card;
  public dayResume: DayResume;
  public vote: Vote;
  public isLoadingUpVote: boolean;
  public isLoadingDownVote: boolean;

  constructor(private location: LocationFinderService, private settings: SettingsService) {
  }

  get temperatureScale(): string {
    return this.settings.temperatureScale;
  }

  ngOnInit() {
    if (this.card) {
      this.dayResume = this.card.dayResume;
      this.getVotes();
    }
  }

  onVote(vote: boolean) {
    this.toggleLoadingState(vote);
    this.location.vote(this.card.dayResume.source.replace('/', '-'), this.card.location, vote)
      .pipe(take(1))
      .subscribe(
        (voteResult: Vote) => {
          this.vote = voteResult;
          this.loadingOff();
        },
        () => this.loadingOff()
      );
  }

  toggleLoadingState(state: boolean) {
    this.isLoadingUpVote = state;
    this.isLoadingDownVote = !state;
  }

  loadingOff() {
    this.isLoadingUpVote = false;
    this.isLoadingDownVote = false;
  }

  getVotes() {
    this.location.findVotes(this.card.dayResume.source.replace('/', '-'), this.card.location)
      .pipe(take(1))
      .subscribe(
        (vote: Vote) => this.vote = vote,
        () => { }
      );
  }
}