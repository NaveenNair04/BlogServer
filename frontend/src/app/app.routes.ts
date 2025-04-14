import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'blog-list', component: BlogListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: BlogCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'blog/:id',
    component: BlogDetailComponent,
    canActivate: [AuthGuard],
  },
];
