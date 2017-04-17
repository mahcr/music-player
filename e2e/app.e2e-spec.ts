import { NgMusicPlayerPage } from './app.po';

describe('ng-music-player App', () => {
  let page: NgMusicPlayerPage;

  beforeEach(() => {
    page = new NgMusicPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
