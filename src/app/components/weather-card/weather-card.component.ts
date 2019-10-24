import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '@interfaces/card';
import { DayResume } from '@interfaces/day-resume';
import { Vote } from '@interfaces/vote';
import { LocationFinderService } from '@services/location/location-finder.service';
import { SettingsService } from '@services/settings/settings.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input()
  card: Card;
  @Output()
  cardEvent = new EventEmitter<Card>();
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
        (vote: Vote) => {
          this.vote = vote;
          this.card.vote = vote;
          if (this.card && this.card.dayResume && this.card.dayResume.source)
            this.cardEvent.emit(this.card);
        },
        () => { }
      );
  }
}
