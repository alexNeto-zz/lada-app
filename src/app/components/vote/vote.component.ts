import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Vote } from 'src/app/content/interfaces/vote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnDestroy {

  @Input()
  public vote: Vote;
  @Input()
  public isLoadingUpVote: boolean;
  @Input()
  public isLoadingDownVote: boolean;
  @Output()
  public makeVote = new EventEmitter<boolean>();

  constructor() {
    this.vote = {
      location: 'string',
      source_name: 'string',
      up_vote: 12,
      down_vote: 9,
    }
  }

  get quantity() {
    try {
      return this.vote.up_vote - this.vote.down_vote;
    } catch (err) {
      return 0;
    }
  }

  onUpVote() {
    this.makeVote.emit(true);
  }

  onDownVote() {
    this.makeVote.emit(false);
  }

  ngOnDestroy() {
    this.makeVote.unsubscribe()
  }

}
