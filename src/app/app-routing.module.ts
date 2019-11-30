import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthGuardReverso } from './guards/auth-reverso.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuardReverso]
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule",
    canActivate: [AuthGuardReverso]
  },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterPageModule",
    canActivate: [AuthGuardReverso]
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
    canActivate: [AuthGuardReverso]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
