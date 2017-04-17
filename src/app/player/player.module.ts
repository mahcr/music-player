import { NgModule } from '@angular/core';

import { PlayerMainComponent } from './player-main/player-main.component';
import { PlayerService } from './shared/';

@NgModule({
  declarations: [ PlayerMainComponent ],
  exports: [ PlayerMainComponent ],
  providers: [
   PlayerService
  ]
})
export class PlayerModule { }
