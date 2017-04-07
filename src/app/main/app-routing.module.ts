import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},

    // App views
    {path: 'login', loadChildren: 'app/modules/login/login.module#LoginModule'},

    // Handle all other routes
    // {path: '**',    component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
