import {Grid, NavLink, Paper} from '@mantine/core';
import {getRecipe} from './api/get-recipe';
import React, {useEffect, useState} from "react";
import {RecipeType} from "../../types/RecipeType";
import {useNavigate, useParams} from "react-router-dom";
import {listIngredientsByRecipe} from "../cookbook/api/cookbook";
import {IngredientType} from "../../types/IngredientType";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import {deleteIngredient, deleteRecipe} from "../cookbook/api/delete-recipe";
import {getMe} from "../user/api/get-me";
import {UserType} from "../../types/UserType";

export const Recipe = () => {
    const [recipeData, setRecipeData] = useState<RecipeType>({ id: 0, title: '', estimate: 0, url: 'https://placehold.co/400x200', content: ''});
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

    const [myData, setMyData] = useState<UserType>({id: 0, username: '', password: ''});
    useEffect(() => {
        getMe().then((response) => setMyData(response));
    }, [myData.id]);

    const navigate = useNavigate()
    const del = async () => {
        const ingrs = await listIngredientsByRecipe(recipeData.id);
        for (const ingr of ingrs) {
            await deleteIngredient(ingr.id);
        }
        await deleteRecipe(recipeData.id);
        navigate('/recipes');
    }
    const myRecipe = (
        <div>
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
                <NavLink onClick={() => navigate(`/recipes/${recipeData.id}/edit`)} label="Edit"
                         leftSection={<IconPencil size="1rem" stroke={1.5}/>}/>
                <NavLink onClick={() => del()} label="Delete"
                         leftSection={<IconTrash size="1rem" stroke={1.5}/>}/>
                <Grid.Col span={6}>
                    <Paper shadow="xl" radius="xs" p="xl">
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredientData.map((ingredient, index) => (
                                <li key={index}>{ingredient.content}</li>
                            ))}
                        </ul>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="xl" radius="xs" p="xl">
                        <img
                            src={recipeData.url}
                            alt={recipeData.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Paper shadow="xl" radius="xs" p="xl">
                        <p>{recipeData.content}</p>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
    const notMyRecipe = (
        <div>
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
                    <Paper shadow="xl" radius="xs" p="xl">
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredientData.map((ingredient, index) => (
                                <li key={index}>{ingredient.content}</li>
                            ))}
                        </ul>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="xl" radius="xs" p="xl">
                        <img
                            src={recipeData.url}
                            alt={recipeData.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Paper shadow="xl" radius="xs" p="xl">
                        <p>{recipeData.content}</p>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
    if (recipeData.userId == myData.id) {
        return myRecipe;
    }
    else {
        return notMyRecipe;
    }
}