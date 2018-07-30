import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '../../../node_modules/@angular/core';

export class ShoppingListService {
    ingredientsCanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

    getIngredients() {
        return this.ingredients.slice(); // shallow copy of array and not reference to same array
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsCanged.emit(this.ingredients.slice()); // shallow copy of array and not reference to same array
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        // ...spread operator changes array to a list and pushes each item, same as iterating through array and pushing individually
        this.ingredients.push(...ingredients);
        this.ingredientsCanged.emit(this.ingredients.slice());
    }
}
