import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'blogs', component: BlogListComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
];
