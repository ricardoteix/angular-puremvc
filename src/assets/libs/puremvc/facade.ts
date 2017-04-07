import {CommandMap} from "./command.map";
import {Notifications} from "./notifications";
import {EventEmitter} from "@angular/core";
import {ICommand} from "./command.interface";
import {IProxy} from "./proxy.interface";
import {ProxyMap} from "./proxy.map";

export class Facade {

    public static commandMaps: CommandMap[] = [];
    public static proxyMaps: ProxyMap[] = [];

    public static registerCommand(commandClassRef: any): void {

        if(!this.getCommand(commandClassRef)) {
            
            let commandMap = new CommandMap();
            commandMap.name = commandClassRef.name;
            commandMap.commandClassRef = commandClassRef;

            this.commandMaps.push(commandMap);
            
        }

    }
    
    public static getCommand(commandClassRef: Function): any {

        let commandMaps: CommandMap = this.getCommandMap(commandClassRef);
        if(commandMaps) {
            return commandMaps.commandClassRef;
        }

        return null;
        
    }

    public static sendNotification(notification: string, params: any): void {

        let eventEmitter: EventEmitter<any> = Notifications.get(notification);
        let instances: ICommand[] = [];
        let instancesNames: string[] = [];

        this.commandMaps.forEach((commandMap: CommandMap) => {

            let listNotificationInterests: string[] = commandMap.commandClassRef.listNotificationInterests();
            if(listNotificationInterests.indexOf(notification) >=0) {

                let command: ICommand = new commandMap.commandClassRef();
                command.execute();
                
                if(instancesNames.indexOf(commandMap.name) < 0) {

                    instancesNames.push(commandMap.name);
                    instances.push(command);

                }

            }

        });

        eventEmitter.emit(params);

        instances.forEach(instance => instance.unsubscribe());

    }

    public static registerProxy(proxyClassRef: any): void {

        if(!this.getProxyMap(proxyClassRef)) {

            let proxyMap = new ProxyMap();
            proxyMap.name = proxyClassRef.name;
            proxyMap.instance = new proxyClassRef() as IProxy;

            this.proxyMaps.push(proxyMap);

        }

    }

    public static getProxy(proxyClassRef: Function): IProxy {

        let proxyMap = this.getProxyMap(proxyClassRef);

        if(!proxyMap) {

            this.registerProxy(proxyClassRef);
            return this.getProxy(proxyClassRef);

        }
        
        return proxyMap.instance;
        
    }

    private static getProxyMap(proxyClassRef: Function): ProxyMap {

        for(let i: number = 0 ; i < this.proxyMaps.length ; i++) {
            if(this.proxyMaps[i].name == proxyClassRef.name) {
                return this.proxyMaps[i];
            }
        }

        return null;

    }

    private static getCommandMap(commandClassRef: Function): CommandMap {

        for(let i: number = 0 ; i < this.commandMaps.length ; i++) {
            if(this.commandMaps[i].name == commandClassRef.name) {
                return this.commandMaps[i];
            }
        }

        return null;

    }

}
