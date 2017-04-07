import {Model} from "../../../../assets/libs/puremvc/model";

export class User extends Model {

    private _name: string;
    private _username: string;
    private _password: string;

    constructor(data: Object = {}) {
        super();
        this.set(data);
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get username():string {
        return this._username;
    }

    set username(value:string) {
        this._username = value;
    }

    get password():string {
        return this._password;
    }

    set password(value:string) {
        this._password = value;
    }
}