import {Subscriber} from "rxjs/Rx";
import {ICommand} from "./command.interface";
import {Notifications} from "./notifications";

export class Command implements ICommand {

    public subscribers: Subscriber<any>[];

    constructor() {

        this.subscribers = [];
        
    }

    public static listNotificationInterests(): string[] {

        return [];

    }

    public execute(): void {

    }

    public unsubscribe(): void {

        this.subscribers.forEach(s => s.unsubscribe());

    }

    public addEventListener(notification: string, handler: any): void {

        let subscriber: Subscriber<any> = Notifications.get(notification).subscribe(handler.bind(this));
        this.subscribers.push(subscriber);

    }

}