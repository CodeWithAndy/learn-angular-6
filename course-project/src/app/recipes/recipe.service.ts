import { Recipe } from './recipe-list/recipe.model';
import { Injectable } from '../../../node_modules/@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'A Tasty Shnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://lh3.googleusercontent.com/W13ceIzN8LAhfgQXnLQ2zMdur6akuYiima8B9VDzpiYvzE-XW2R0OqXOzjuvn2Ii9QKr8GGXxjq1LUafxQcDl5xTg3Zt-gDFJidFTK4=w600-l68',
      [
          new Ingredient('Meat', 1),
          new Ingredient('French Fry', 20)
      ]
    ),
    new Recipe(
      'A Tasty Burger',
      'Yum!!!',
      'https://img.apmcdn.org/fd3a545502114a88604cd9a271f7a32964662ff2/uncropped/2b1fc8-20180725-impossible-burger.jpg',
      [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 1),
          new Ingredient('Cheese', 2)
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice(); // returns new array copy with new reference
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
