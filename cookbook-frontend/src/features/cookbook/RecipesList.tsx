import {useSearchParams} from "react-router-dom";
import {Button, SimpleGrid} from "@mantine/core";
import {RecipeType} from "../../types/RecipeType";
import {Recipe} from "./Recipe";
import {useEffect, useState} from "react";
import {listRecipes} from "./api/cookbook";

export const RecipesList = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    useEffect(() => {
        listRecipes().then((response) => setData(response));
    }, [])
    return (
        <div style={{width: '100%'}}>
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                {data.map((recipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
            </SimpleGrid>
        </div>
    )
}