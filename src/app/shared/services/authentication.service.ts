import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';
import {User} from "../models/user/user.model";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService {

    private http: Http;
    private headers: Headers;

    constructor(http: Http) {

        this.http = http;
        this.headers = new Headers();

    }

    // ---- Authentication
    public login(user: User): Observable<Object> {

        //TODO: login with user
        return this.http.get('assets/data/user.json');

    }

    public logout(): void {

        sessionStorage.removeItem('rm-token');
        localStorage.removeItem("rm-user");

    }

    // ---- Storage
    public setSessionUser(user: User): void {

        let storage: string = JSON.stringify(user);
        localStorage.setItem('rm-user', storage);

    }

    public getSessionUser(): User {

        let storage: string = localStorage.getItem("rm-user");
        let data: Object = JSON.parse(storage);
        let user: User = new User(data);

        return user;

    }

    public setToken(token: string): void {

        sessionStorage.setItem('rm-token', token);

    }

    public getToken(): string {

        let token: string = sessionStorage.getItem('rm-token');
        return token;

    }

}