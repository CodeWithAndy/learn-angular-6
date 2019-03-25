import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/RX';
import { Observable } from 'rxjs/RX';

@Injectable()
export class ServerService {
    url = 'https://udemy-ng-http-7f66e.firebaseio.com/data';
    constructor(private http: Http) {}
    storeServers(servers: any[]) {
        // const headers = new Headers({'Content-Type': 'application/json'});
        // return this.http.post(this.url, servers, {headers: headers});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.url, servers, {headers: headers});
    }
    getServers() {
        return this.http.get(this.url)
            .map(
                (response: Response) => {
                    const data = response.json();
                    for (const server of data) {
                        server.name = 'FETCHED_' + server.name;
                    }
                    return data;
                }
            )
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
