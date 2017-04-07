import {Subscriber} from "rxjs/Rx";
import {OnDestroy} from "@angular/core";
import {Notifications} from "./notifications";

export class Mediator implements OnDestroy {

    protected subscribers: Subscriber<any>[];

    constructor() {

        this.subscribers = [];
        this.handleNotification();

    }

    public handleNotification(): void {

    }

    public addEventListener(notification: string, handler: Function): void {

        let subscriber: Subscriber<any> = Notifications.get(notification).subscribe(handler.bind(this));
        this.subscribers.push(subscriber);

    }

    public ngOnDestroy(): void {

        this.subscribers.forEach(subscribe => subscribe.unsubscribe());

    }

}