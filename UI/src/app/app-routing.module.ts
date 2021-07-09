import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChatComponent } from "./Components/chat/chat.component";
import { LoginComponent } from "./Components/login/login.component";
import { DashboardComponent } from "./Components/dashboard/dashboard.component";

const appRoutes : Routes = [
    { path : ':id/dashboard' , component : DashboardComponent , children : [
        { path : '' , component : ChatComponent},
    ]},
    { path : '' , component : LoginComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}