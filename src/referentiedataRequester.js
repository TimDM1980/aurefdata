import{HttpRequest} from './httprequest';

export class ReferentiedataRequester {
  constructor() {
    this.httpRequest = new HttpRequest();
  }

  getKantoren(kantoorcode) {
    var querystring = "kantoorCode=" + kantoorcode;
    return this.httpRequest.getWithQueryParams("lookup", querystring);
  }

}