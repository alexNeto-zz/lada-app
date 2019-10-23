import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Vote } from '@interfaces/vote';
import { ToastService } from '@services/toast/toast.service';

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

  constructor(private toast: ToastService) { }

  get quantity() {
    try {
      return this.vote.up_vote - this.vote.down_vote;
    } catch (err) {
      return 0;
    }
  }

  onUpVote() {
    this.toast.testIfOffline();
    this.makeVote.emit(true);
  }

  onDownVote() {
    this.toast.testIfOffline();
    this.makeVote.emit(false);
  }

  ngOnDestroy() {
    this.makeVote.unsubscribe();
  }

}
