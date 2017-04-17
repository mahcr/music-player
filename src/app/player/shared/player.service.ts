import { Injectable } from '@angular/core';
import { ApiService } from '../../global/services/';
import { CLIENT_ID,
         URL_PlAYLIST } from '../../global/utils/';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class PlayerService {

  public audio: HTMLAudioElement;

  constructor(public api: ApiService) {
    this.audio = new Audio();
  }

  /**
   * Add third-party ID if needand and execute http get
   * @param {string} url - third-party url
   * @param {boolean} attachClientId - Flag in case the ID should be added
   */
  get(url: string, attachClientId?: boolean): Observable<any> {
    let path;
    attachClientId ? path = this.prepareUrl(url) : path = url;
    return this.api.get(url);
  }

  /**
   * Add ID to url
   * @param {string} url - thirdpary url
   * @return {string}
   */
  prepareUrl(url: string): string {
    return `${url}?client_id=${CLIENT_ID}`;
  }


  load(url): void {
    this.audio.src = this.prepareUrl(url);
    this.audio.load();
  }

  play(url): void {
    this.load(url);
    this.audio.play();
  }

  getPlaylistTracks(): Observable<any> {
    //Request for a playlist via Soundcloud using a client id
    return this.get(URL_PlAYLIST, true)
               .map(data => data.tracks);
  }

  randomTrack(tracks) {
    const trackLength = tracks.length;
    // Pick a random number
    const randomNumber = Math.floor((Math.random() * trackLength) + 1);
    // Return a random track
    return tracks[randomNumber];
  }

  formatTime(seconds) {
    let minutes:any = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  findTracks(value) {
    return this.get(`${this.prepareUrl('https://api.soundcloud.com/tracks')}&q=${value}`, false)
      .debounceTime(300)
      .distinctUntilChanged()
      // .map(res => res.json())
  }

  xlArtwork(url) {
    return url.replace(/large/, 't500x500');
  }


}
