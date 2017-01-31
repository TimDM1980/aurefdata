import {Kantoor} from './kantoor';
import {ReferentiedataRequester} from '../../aurefdata/src/referentiedataRequester';

export class App {
  constructor() {
    this.heading = "Referentiedata opzoeken";
    this.responsebody = 'hier komt de response body';
    this.kantoorcode = '';
  }

  zoeken() {
    if (this.kantoorcode) {
      this.responsebody = 'komtie: ' + new ReferentiedataRequester().getKantoren(this.kantoorcode);
      this.kantoorcode = '';
    }
  }

}
