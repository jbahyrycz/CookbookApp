import {RecipesFormValues} from "../../../types/RecipesFormValues";
import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";

export const createRecipe = async (data: RecipesFormValues) => {
    return ky.post(`${API_URL}/recipes`, {json: data, credentials: 'include'}).json<RecipeType>();
}