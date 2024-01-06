import {API_URL} from "../../../config";

export const signOut = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    })
    if (response.status !== 200) throw new Error('Sign out failed');
    return await response.text();
}