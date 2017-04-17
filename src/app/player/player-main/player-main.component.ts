import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/';

@Component({
  selector: 'player-main',
  templateUrl: './player-main.component.html',
  styleUrls: [ './player-main.component.scss' ]
})
export class PlayerMainComponent implements OnInit {

  public title;
  public position;
  public elapsed;
  public duration;
  public tracks: any[] = [];
  public backgroundStyle;
  public filteredTracks: any[] = [];
  paused = true;

  constructor(public playerService: PlayerService) { }

  ngOnInit(): void {

    this.playerService.getPlaylistTracks().subscribe(tracks => {
      this.tracks = tracks;
      this.handleRandom();
    });

     // On song end
    this.playerService.audio.onended = this.handleEnded.bind(this);
    // On play time update
    this.playerService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);

  }

  handleEnded(e) {
    this.handleRandom();
  }

  handleTimeUpdate(e) {
    const elapsed =  this.playerService.audio.currentTime;
    const duration =  this.playerService.audio.duration;
    this.position = elapsed / duration;
    this.elapsed = this.playerService.formatTime(elapsed);
    this.duration = this.playerService.formatTime(duration);
  }

  handleRandom() {
    // Pluck a song
    const randomTrack = this.playerService.randomTrack(this.tracks);
    // Play the plucked song
    this.playerService.play(randomTrack.stream_url)
    // Set the title property
    this.title = randomTrack.title;
    // Create a background based on the playing song
    this.backgroundStyle = this.composeBackgroundStyle(randomTrack.artwork_url)
  }

  composeBackgroundStyle(url) {
    return {
      backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ),   url(${this.backgroundStyle.xlArtwork(url)})`
    }
  }

  handleQuery(payload) {
    this.playerService.findTracks(payload).subscribe(tracks => {
      this.filteredTracks = tracks;
    });
  }

  handlePausePlay() {
      if(this.playerService.audio.paused) {
        this.paused = true;
        this.playerService.audio.play();
      } else {
        this.paused = false;
        this.playerService.audio.pause();
      }
  }

  handleStop() {
    this.playerService.audio.pause();
    this.playerService.audio.currentTime = 0;
    this.paused = false;
  }

}
