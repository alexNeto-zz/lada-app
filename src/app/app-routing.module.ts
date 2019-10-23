import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@views/main/main.component';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./views/about/about.module').then(mod => mod.AboutModule)
  },
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
