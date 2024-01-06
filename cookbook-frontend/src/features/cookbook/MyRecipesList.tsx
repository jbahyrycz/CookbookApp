import {Center, SimpleGrid} from '@mantine/core';
import {RecipeType} from '../../types/RecipeType';
import {RecipeRepresentation} from './RecipeRepresentation';
import {useEffect, useState} from 'react';
import {listMyRecipes} from './api/cookbook';
import {IconPlus} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export const MyRecipesList = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/recipes/new');
    }
    const [data, setData] = useState<RecipeType[]>([]);
    useEffect(() => {
        listMyRecipes().then((response) => setData(response));
    }, [])
    return (
        <div style={{width: '100%'}}>
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                <Center>
                    <IconPlus onClick={handleClick} size="15rem" stroke={1.5}/>
                </Center>
                {data.map((recipe) => <RecipeRepresentation key={recipe.id} recipe={recipe}/>)}
            </SimpleGrid>
        </div>
    )
}