import {IconList, IconPencilPlus} from "@tabler/icons-react";
import {NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export const AppNavbar = () => {
    const navigate = useNavigate()
    return (
        <div>
            <NavLink onClick={() => navigate('/recipes')} label="Recipes List"
                     leftSection={<IconList size="1rem" stroke={1.5}/>}/>
            <NavLink onClick={() => navigate('/recipes/new')} label="Add Recipe"
                     leftSection={<IconPencilPlus size="1rem" stroke={1.5}/>}/>
        </div>
    )
}