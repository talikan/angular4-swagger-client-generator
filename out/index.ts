import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SoftwareSpec, Error } from './models';

/**
* Created with angular4-swagger-client-generator.
*/
@Injectable()
export class ApiClientService {

  private domain = 'http://localhost/v1';

  constructor(private http: HttpClient, @Optional() @Inject('domain') domain: string ) {
    if (domain) {
      this.domain = domain;
    }
  }

  /**
  * The endpoint returns informations about the "Software Specs".
  * The response includes the whole software spec including id, name and description
  * @method getSoftwareSpecs
  */
  public getSoftwareSpecs(): Observable<SoftwareSpec[]> {
    let uri = `/software_specs`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<SoftwareSpec[]>('get', uri, headers, params, null);
  }

  /**
  * @method addSoftwareSpec
  * @param {SoftwareSpec} spec The Software Spec object that needs to be added
  */
  public addSoftwareSpec(spec: SoftwareSpec): Observable<SoftwareSpec> {
    let uri = `/software_specs`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<SoftwareSpec>('post', uri, headers, params, JSON.stringify(spec));
  }

  /**
  * The endpoint returns the information about a "Software Spec", specified by id.
  * @method getSpecById
  * @param {number} specId The ID of software spec that needs to be fetched
  */
  public getSpecById(specId: number): Observable<SoftwareSpec> {
    let uri = `/software_specs/${specId}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<SoftwareSpec>('get', uri, headers, params, null);
  }

  /**
  * The endpoint returns the information about a "Software Spec", specified by id.
  * @method updateSpecById
  * @param {number} specId The Id of software spec that needs to be fetched
  * @param {SoftwareSpec} spec The Software Spec object that needs to be added
  */
  public updateSpecById(specId: number, spec: SoftwareSpec): Observable<SoftwareSpec> {
    let uri = `/software_specs/${specId}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<SoftwareSpec>('patch', uri, headers, params, JSON.stringify(spec));
  }

  /**
  * @method deleteSpecById
  * @param {number} specId The Software Spec id to delete
  */
  public deleteSpecById(specId: number): Observable<SoftwareSpec> {
    let uri = `/software_specs/${specId}`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<SoftwareSpec>('delete', uri, headers, params, null);
  }

  private sendRequest<T>(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: any): Observable<T> {
    if (method === 'get') {
      return this.http.get<T>(this.domain + uri, { headers: headers, params: params });
    } else if (method === 'put') {
      return this.http.put<T>(this.domain + uri, body, { headers: headers, params: params });
    } else if (method === 'post') {
      return this.http.post<T>(this.domain + uri, body, { headers: headers, params: params });
    } else if (method === 'delete') {
      return this.http.delete<T>(this.domain + uri, { headers: headers, params: params });
    } else {
      console.error('Unsupported request: ' + method);
      return Observable.throw('Unsupported request: ' + method);
    }
  }
}
