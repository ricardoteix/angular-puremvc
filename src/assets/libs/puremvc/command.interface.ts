import {Subscriber} from "rxjs/Rx";

export interface ICommand {

    subscribers: Subscriber<any>[];

    execute():void;
    unsubscribe(): void;
    
}