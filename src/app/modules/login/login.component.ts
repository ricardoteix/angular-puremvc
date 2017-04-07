import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Mediator} from "../../../assets/libs/puremvc/mediator";
import {IMediator} from "../../../assets/libs/puremvc/mediator.interface";
import {Notifications} from "../../../assets/libs/puremvc/notifications";
import {LoginNotifications} from "./shared/notifications/login.notification";
import {User} from "../../shared/models/user/user.model";
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent extends Mediator implements IMediator {

    private user: User;
    private router: Router;

    constructor(authenticationService: AuthenticationService ,router: Router) {

        super();

        this.router = router;
        this.user = new User();

        Notifications.send(LoginNotifications.SET_SERVICE, authenticationService);

    }

    public ngAfterViewInit() {

        Notifications.send(LoginNotifications.LOGIN, this.user);

    }

    //@override
    public handleNotification(): void {

        this.addEventListener(LoginNotifications.SUCCESS_LOGIN, this.onSuccessLogin);
        this.addEventListener(LoginNotifications.FAILURE_LOGIN, this.onFailureLogin);
        
    }

    private onSuccessLogin(): void {

        this.router.navigate(['/']);
        
    }
    
    private onFailureLogin(): void {

        //TODO: show message failure login

    }

    private login(): void {
        
        Notifications.send(LoginNotifications.LOGIN, this.user);
        
    }

    public onSubmit(form: any): void {

        if(form.valid) {
            this.login();
        }

    }

}
