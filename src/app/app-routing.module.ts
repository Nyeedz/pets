import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "aaa",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule)
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "",
    component: HomeComponent
  },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
