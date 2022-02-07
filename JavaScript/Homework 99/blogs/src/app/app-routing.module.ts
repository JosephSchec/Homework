import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './posts/post.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogListComponent
  },
  {
    path:'blogs/blog',
    component:BlogComponent

  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/blogs'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
