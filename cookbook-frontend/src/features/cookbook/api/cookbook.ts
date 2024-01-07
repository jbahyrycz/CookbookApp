import {API_URL} from "../../../config";
import ky from "ky";
import {RecipeType} from "../../../types/RecipeType";
import {IngredientType} from "../../../types/IngredientType";

export const listRecipes = async () => {
    return ky.get(`${API_URL}/recipes`, {credentials: 'include'}).json<RecipeType[]>();
}

export const listMyRecipes = async () => {
    return ky.get(`${API_URL}/recipes/my`, {credentials: 'include'}).json<RecipeType[]>();
}

export const listIngredientsByRecipe = async (recipeId: number)=> {
    return ky.get(`${API_URL}/ingredients/recipe/${recipeId}`, {credentials: 'include'}).json<IngredientType[]>();
}