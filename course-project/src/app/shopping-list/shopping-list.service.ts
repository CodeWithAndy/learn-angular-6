import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsCanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

    getIngredients() {
        return this.ingredients.slice(); // shallow copy of array and not reference to same array
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsCanged.next(this.ingredients.slice()); // shallow copy of array and not reference to same array
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        // ...spread operator changes array to a list and pushes each item, same as iterating through array and pushing individually
        this.ingredients.push(...ingredients);
        this.ingredientsCanged.next(this.ingredients.slice());
    }
}
