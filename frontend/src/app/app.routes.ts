import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  // Public routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // Protected routes
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'blog-list', 
    component: BlogListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create', 
    component: BlogCreateComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'blog/:id',
    component: BlogDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent,
    canActivate: [AuthGuard],
  },
  
  // Wildcard route for 404
  { path: '**', redirectTo: '/login' }
];
