import {Card, Grid} from '@mantine/core';
import {getRecipe} from './api/get-recipe';
import React, {useEffect, useState} from "react";
import {RecipeType} from "../../types/RecipeType";
import {useParams} from "react-router-dom";
import {listIngredientsByRecipe} from "../cookbook/api/cookbook";
import {IngredientType} from "../../types/IngredientType";

export const Recipe = () => {
    const [recipeData, setRecipeData] = useState<RecipeType>({ id: 0, title: '', estimate: 0, content: ''});
    const {id} = useParams<{id: string}>();
    useEffect(() => {
        if (id) {
            const recipeId = parseInt(id, 10);
            getRecipe(recipeId).then((response) => setRecipeData(response));
        }
    }, [id]);

    const [ingredientData, setIngredientData] = useState<IngredientType[]>([]);
    useEffect(() => {
        if (recipeData.id) {
            listIngredientsByRecipe(recipeData.id).then((response) => setIngredientData(response));
        }
    }, [recipeData.id]);


    return (
        <Card shadow="sm">
            <Grid
                gutter="lg"
                columns={12}
                style={{ alignItems: 'center' }}
            >
                <Grid.Col span={12}>
                    <h1 style={{ textAlign: 'center' }}>
                        {recipeData.title}
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        {recipeData.estimate} min
                    </p>
                </Grid.Col>
                <Grid.Col span={6}>
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredientData.map((ingredient, index) => (
                            <li key={index}>{ingredient.content}</li>
                        ))}
                    </ul>
                </Grid.Col>
                <Grid.Col span={6}>
                    <img
                        src='/images/testphoto.png'
                        alt={recipeData.title}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <p>{recipeData.content}</p>
                </Grid.Col>
            </Grid>
        </Card>
    );
}