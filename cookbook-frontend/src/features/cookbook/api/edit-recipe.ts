import {RecipeFormValues} from "../../../types/RecipeFormValues";
import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";
import {IngredientFormValues} from "../../../types/IngredientFormValues";
import {IngredientType} from "../../../types/IngredientType";

export const editRecipe = async (data: RecipeFormValues, recipeId: number) => {
    return ky.put(`${API_URL}/recipes/${recipeId}`, {json: data, credentials: 'include'}).json<RecipeType>();
}
export const editIngredient = async (data: IngredientFormValues, ingredientId: number) => {
    return ky.put(`${API_URL}/ingredients/${ingredientId}`, {json: data, credentials: 'include'}).json<IngredientType>();
}