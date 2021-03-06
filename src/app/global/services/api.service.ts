import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(public http: Http) { }

  get(url: string): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

}
