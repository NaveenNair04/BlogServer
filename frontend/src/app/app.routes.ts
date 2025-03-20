import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

export const appRoutes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
];
