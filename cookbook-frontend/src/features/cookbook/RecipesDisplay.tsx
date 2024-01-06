import {SimpleGrid} from '@mantine/core';
import {RecipeType} from '../../types/RecipeType';
import {RecipeRepresentation} from './RecipeRepresentation';
import {useEffect, useState} from 'react';
import {listRecipes} from './api/cookbook';

export const RecipesDisplay = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    useEffect(() => {
        listRecipes().then((response) => setData(response));
    }, [])
    return (
        <div style={{width: '100%'}}>
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                {data.map((recipe) => <RecipeRepresentation key={recipe.id} recipe={recipe}/>)}
            </SimpleGrid>
        </div>
    )
}