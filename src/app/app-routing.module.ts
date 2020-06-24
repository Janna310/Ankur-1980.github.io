import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginFormComponent } from './components/new-user/login-form/login-form.component';
import { NewUserFormComponent } from './components/new-user/new-user-form/new-user-form.component';
import { PostDrinkFormComponent } from './components/post-drink-form/post-drink-form.component';
import { TheFeedPostsComponent } from './components/the-feed/the-feed-posts/the-feed-posts.component';
import { AuthGuard } from './services/auth-guard.guard';
import { GuestGuard } from './services/guest.guard';

const routes: Routes = [
  { path: '', component: LoginFormComponent, canActivate: [GuestGuard] },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'the-feed',
    component: TheFeedPostsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: NewUserFormComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'drink-post',
    component: PostDrinkFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'quiz',
    loadChildren: () =>
      import('./components/quiz/quiz.module').then((m) => m.QuizModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'preferences',
    loadChildren: () =>
      import('./components/preferences/preferences.module').then(
        (module) => module.PreferencesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'recipe-book',
    loadChildren: () =>
      import('./components/recipe-book/recipe-book.module').then(
        (module) => module.RecipeBookModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-recipes',
    loadChildren: () =>
      import('./components/user-recipes/user-recipes.module').then(
        (module) => module.UserRecipesModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
