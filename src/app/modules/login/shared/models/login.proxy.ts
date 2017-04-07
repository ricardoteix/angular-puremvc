import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {User} from "../../../../shared/models/user/user.model";
import {Notifications} from "../../../../../assets/libs/puremvc/notifications";
import {LoginNotifications} from "../notifications/login.notification";
import {AuthenticationService} from "../../../../shared/services/authentication.service";

export class LoginProxy {

    public service: AuthenticationService;

    constructor() {}

    public setService(service: AuthenticationService): void {

        this.service = service;

    }

    public login(user: User): void {

        try {

            let observer: Observable<Object> = this.service.login(user)['map']((res: any) => { return res.json() });
            observer.subscribe((response: Object) => this.onLogin(response),
                               (response: Object) => Notifications.send(LoginNotifications.FAILURE_LOGIN, response));

        }catch(e) {

            console.error(e);
            Notifications.send(LoginNotifications.FAILURE_LOGIN, e);

        }

    }

    private onLogin(response: Object): void {

        let user: User = new User(response);
        Notifications.send(LoginNotifications.SUCCESS_LOGIN, user);

    }

}