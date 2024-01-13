import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";
import {IngredientType} from "../../../types/IngredientType";

export const deleteRecipe = async (recipeId: number) => {
    return ky.delete(`${API_URL}/recipes/${recipeId}`, {credentials: 'include'}).json<RecipeType>();
}
export const deleteIngredient = async (ingredientId: number) => {
    return ky.delete(`${API_URL}/ingredients/${ingredientId}`, {credentials: 'include'}).json<IngredientType>();
}