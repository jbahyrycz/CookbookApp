import {API_URL} from "../../../config";
import ky from "ky";
import {RecipeType} from "../../../types/RecipeType";

export const listRecipes = async () => {
    return ky.get(`${API_URL}/recipes`, {credentials: 'include'}).json<RecipeType[]>();
}

export const listMyRecipes = async () => {
    return ky.get(`${API_URL}/recipes/my`, {credentials: 'include'}).json<RecipeType[]>();
}