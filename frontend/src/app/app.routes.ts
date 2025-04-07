// app.routes.ts
import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'blogs', component: BlogListComponent, canActivate: [authGuard] },
  { path: 'create', component: BlogCreateComponent, canActivate: [authGuard] },
  { path: 'blog/:id', component: BlogDetailComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' }
];
