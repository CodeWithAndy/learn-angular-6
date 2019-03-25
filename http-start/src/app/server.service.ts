import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
// RXJS 6+ SYNTAX
import 'rxjs/RX';
import { Observable } from 'rxjs/RX';
// RXJS-COMPAT SYNTAX
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ServerService {
    // url = 'https://udemy-ng-http-7f66e.firebaseio.com/data.json';
    url = 'https://udemy-ng-http-7f66e.firebaseio.com/data'; // TEST ERROR
    constructor(private http: Http) { }
    storeServers(servers: any[]) {
        // const headers = new Headers({'Content-Type': 'application/json'});
        // return this.http.post(this.url, servers, {headers: headers});
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(this.url, servers, { headers: headers });
    }
    getServers() {
        return this.http.get(this.url)
            // RXJS 6+ SYNTAX
            .map(
                (response: Response) => {
                    const data = response.json();
                    for (const server of data) {
                        server.name = 'FETCHED_' + server.name;
                    }
                    return data;
                }
            )
            // RXJS-COMPAT SYNTAX
            // .pipe(
            //     map(
            //         (response: Response) => {
            //             const data = response.json();
            //             for (const server of data) {
            //                 server.name = 'FETCHED_' + server.name;
            //             }
            //             return data;
            //         }),
            //     catchError(error => {
            //         return throwError('Something went wrong');
            //     })
            // );
        // RXJS 6+ SYNTAX
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong');
            }
        );
    }

    getAppName() {
        return this.http.get('https://udemy-ng-http-7f66e.firebaseio.com/appName.json')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }
}
