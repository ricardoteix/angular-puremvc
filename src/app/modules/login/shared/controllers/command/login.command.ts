import {Command} from "../../../../../../assets/libs/puremvc/command";
import {LoginNotifications} from "../../notifications/login.notification";
import {Facade} from "../../../../../../assets/libs/puremvc/facade";
import {LoginProxy} from "../../models/login.proxy";
import {AuthenticationService} from "../../../../../shared/services/authentication.service";
import {User} from "../../../../../shared/models/user/user.model";

export class LoginCommand extends Command {

    private proxy: LoginProxy;

    constructor() {

        super();

        this.proxy = Facade.getProxy(LoginProxy) as LoginProxy;

    }

    public static listNotificationInterests(): string[] {

        return [
            LoginNotifications.SET_SERVICE,
            LoginNotifications.LOGIN
        ];

    }

    //@override
    public execute(): void {

        this.addEventListener(LoginNotifications.SET_SERVICE, (authentication: AuthenticationService) => this.proxy.setService(authentication));
        this.addEventListener(LoginNotifications.LOGIN, this.login);

    }

    private login(user: User): void {

        this.proxy.login(user);

    }

}