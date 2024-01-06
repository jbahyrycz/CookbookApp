import {API_URL} from "../../../config";
import ky from "ky";
import {UsersFormValues} from "../../../types/UserFromValues";
import {UserType} from "../../../types/UserType";

export const signUp = async (data: UsersFormValues) => {
    return ky.post(`${API_URL}/user`, {json: data, credentials: 'include'}).json<UserType>();
}