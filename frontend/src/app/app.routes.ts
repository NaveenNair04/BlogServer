import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component'; // Import EditBlogComponent
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
  // Add route for editing a blog
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent,
    canActivate: [AuthGuard], // Ensure only authenticated users can edit
  },
];
