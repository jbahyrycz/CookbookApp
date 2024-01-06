import {Card, Grid} from '@mantine/core';
import {getRecipe} from './api/get-recipe';
import React, {useEffect, useState} from "react";
import {RecipeType} from "../../types/RecipeType";
import {useParams} from "react-router-dom";

export const Recipe = () => {
    const [data, setData] = useState<RecipeType>({ id: 0, title: '', estimate: 0, content: ''});
    const {id} = useParams<{id: string}>();
    useEffect(() => {
        if (id) {
            const recipeId = parseInt(id, 10);
            getRecipe(recipeId).then((response) => setData(response));
        }
    }, [id]);

    return (
        <Card shadow="sm">
            <Grid
                gutter="lg"
                columns={12}
                style={{ alignItems: 'center' }}
            >
                <Grid.Col span={12}>
                    <h1 style={{ textAlign: 'center' }}>
                        {data.title}
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        {data.estimate} min
                    </p>
                </Grid.Col>
                <Grid.Col span={6}>
                    <h2>Ingredients</h2>
                </Grid.Col>
                <Grid.Col span={6}>
                    <img
                        src='/images/testphoto.png'
                        alt={data.title}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <p>{data.content}</p>
                </Grid.Col>
            </Grid>
        </Card>
    );
}