import {RecipeFormValues} from "../../../types/RecipeFormValues";
import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";
import {IngredientFormValues} from "../../../types/IngredientFormValues";
import {IngredientType} from "../../../types/IngredientType";

export const createRecipe = async (data: RecipeFormValues) => {
    return ky.post(`${API_URL}/recipes`, {json: data, credentials: 'include'}).json<RecipeType>();
}
export const createIngredient = async (data: IngredientFormValues, recipeId: number) => {
    return ky.post(`${API_URL}/ingredients/recipe/${recipeId}`, {json: data, credentials: 'include'}).json<IngredientType>();
}