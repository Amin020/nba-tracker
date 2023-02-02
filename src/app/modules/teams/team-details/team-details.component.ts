import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Result, Team } from 'src/app/core/models/team.model';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  @Input() trackedTeam = new Team();
  @Output() removeTeamFromTracking = new EventEmitter<number>();
  RESULT = Result;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
  }

  get NUMBER_OF_DAYS_BEFORE_TODAY(): number {
    return this.gamesService.NUMBER_OF_DAYS_BEFORE_TODAY;
  };

  
  public emitRemovingTeamFromTracking(trackedTeamId: number): void {
    this.removeTeamFromTracking.emit(trackedTeamId);
  } 

  public viewGameResult(trackedTeam: Team): void {
    this.router.navigate(['./results', trackedTeam.id], { relativeTo: this.activatedRoute });
  }

}
