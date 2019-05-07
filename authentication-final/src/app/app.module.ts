import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipe.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  // define which components, directives, or pipes does this module uses
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  // define which other modules that this module uses
  imports: [
    SharedModule,
    BrowserModule, // only needed in app module, contains common module plus other stuff
    HttpModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule // position routing module last to ensure catch-all/wildcard routes to work correctly
  ],
  // define which services that this module uses, singleton service
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard],
  // root component that angular creates and inserts into index.html
  bootstrap: [AppComponent]
})
export class AppModule { }
