import {EventEmitter} from '@angular/core';
import {Facade} from "./facade";

export class Notifications {

    private static _emitters: { [notification: string]: EventEmitter<any> } = {};

    public static get(notification: string): EventEmitter<any> {

        if(!this._emitters[notification]) {
            this._emitters[notification] = new EventEmitter();
        }

        return this._emitters[notification];

    }

    public static listen(notifications: string[]) {

        for(let i: number = 0 ; i < notifications.length ; i++) {
            let notification: string = notifications[i];
            if(!this._emitters[notification]) {
                this._emitters[notification] = new EventEmitter();
            }
        }

    }

    public static send(notification: string, params:any = null) {

        Facade.sendNotification(notification, params);

    }

}