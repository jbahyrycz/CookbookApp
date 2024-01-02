import {useSearchParams} from "react-router-dom";
import {Button, SimpleGrid} from "@mantine/core";
import {RecipeType} from "../../types/RecipeType";
import {Recipe} from "./Recipe";

const data: RecipeType[] = [
    {
        id: 1,
        title: 'Pierogi',
        estimate: 60,
        content: 'Mix ingredients to make dough and make pierogi.'
    },
    {
        id: 2,
        title: 'Żurek',
        estimate: 30,
        content: 'Add vegetables and sausage to your soup and make delicious żurek.'
    },
    {
        id: 3,
        title: 'Scrambled eggs',
        estimate: 10,
        content: 'Mix your eggs on frying pan and enjoy.'
    },
    {
        id: 4,
        title: 'Sandwich',
        estimate: 5,
        content: 'Add butter, tomato, cheese and ham on your bread and enjoy!'
    },
]

export const RecipesList = () => {
    let [searchParams, setSearchedParams] = useSearchParams();
    console.log(searchParams.get('key'))
    return (
        <div style={{width: '100%'}}>
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                {data.map((recipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
            </SimpleGrid>
        </div>
    )
}