import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";

export const getRecipe = async (id: number) => {
    return ky.get(`${API_URL}/recipes/${id}`, {credentials: 'include'}).json<RecipeType>();
}