import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "home",
    component: TabsPage,
    children: [
      {
        path: "perfil",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab1/tab1.module").then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: "pets",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab2/tab2.module").then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: "monitoring",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../monitoring/monitoring.module").then(
                m => m.MonitoringPageModule
              )
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab3/tab3.module").then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/home/perfil",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/home/perfil",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
