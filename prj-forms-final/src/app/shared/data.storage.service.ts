import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
// RXJS 6+ SYNTAX
import "rxjs/RX";
import { Observable } from "rxjs/RX";
// RXJS-COMPAT SYNTAX
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class DataStorageService {
  // tslint:disable-next-line: deprecation
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    const url = "https://ng-recipe-book-8760f.firebaseio.com/.json";
    return this.http.put(url, this.recipeService.getRecipes());
  }

  getRecipes() {
    const url = "https://ng-recipe-book-8760f.firebaseio.com/.json";
    this.http
      .get(url)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe["ingredients"]) {
            console.log(recipe);
            recipe["ingredients"] = [];
          }
        }
        return recipes;
      })
      .subscribe(
        // tslint:disable-next-line: deprecation
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
