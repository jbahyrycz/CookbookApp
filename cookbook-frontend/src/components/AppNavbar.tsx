import {IconList, IconLogin, IconLogin2, IconNotebook, IconPencilPlus, IconUserPlus} from "@tabler/icons-react";
import {NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useIsLogged} from "../hooks/useIsLogged";
import {signOut} from "../features/signout/api/sign-out";

export const AppNavbar = () => {
    const navigate = useNavigate()
    const out = async () => {
        await signOut();
        navigate('/');
    }
    const privateNav = (
        <div>
            <NavLink onClick={() => navigate('/recipes')} label="All recipes"
                 leftSection={<IconList size="1rem" stroke={1.5}/>}/>
            <NavLink onClick={() => navigate('/recipes/my')} label="My recipes"
                 leftSection={<IconNotebook size="1rem" stroke={1.5}/>}/>
            <NavLink onClick={() => navigate('/recipes/new')} label="Add Recipe"
                 leftSection={<IconPencilPlus size="1rem" stroke={1.5}/>}/>
            <NavLink onClick={() => out()} label="Sign out"
                     leftSection={<IconLogin size="1rem" stroke={1.5}/>}/>
        </div>
    )
    const publicNav = (
        <div>
            <NavLink onClick={() => navigate('/signin')} label="Sign in"
                     leftSection={<IconLogin2 size="1rem" stroke={1.5}/>}/>
            <NavLink onClick={() => navigate('/signup')} label="Sign up"
                     leftSection={<IconUserPlus size="1rem" stroke={1.5}/>}/>
        </div>
    )
    const isLogged = useIsLogged();
    const nav = isLogged ? privateNav : publicNav;

    return nav;
}