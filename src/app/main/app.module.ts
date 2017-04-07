import {BrowserModule} from "@angular/platform-browser";
import {NgModule, LOCALE_ID} from "@angular/core";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginModule} from "../modules/login/login.module";
import {AppRoutingModule} from "./app-routing.module";
import {AuthenticationService} from "../shared/services/authentication.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,

        LoginModule,
        AppRoutingModule
    ],
    providers: [
        AuthenticationService,
        {
            provide: LOCALE_ID,
            useValue: "pt-BR"
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

    constructor() {}

}