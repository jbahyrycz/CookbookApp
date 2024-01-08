import {useRecipesForm} from "./hooks/useRecipesForm"
import {Button, Group, NumberInput, Paper, Stack, Textarea, TextInput} from "@mantine/core";
import {createIngredient, createRecipe} from "./api/create-recipe";
import {useNavigate} from "react-router-dom";
import {addRecipeErrorNotification} from "./notifications";
import React, {useState} from "react";
import {IngredientType} from "../../types/IngredientType";

export const RecipesForm = () => {
    const recipeForm = useRecipesForm();
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState<IngredientType[]>([{ id: 0, content: '', recipeId: 0 }]);

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index].content = value;
        setIngredients(newIngredients);
    };
    const handleIngredientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Zapobiega domyślnemu zachowaniu klawisza Enter w formularzu
            const newIngredients = [...ingredients];
            newIngredients.push({ id: 0, content: '', recipeId: 0 });
            setIngredients(newIngredients);
        }
    };
    const handleSubmit = async () => {
        try {
            const recipeVals = {
                title: recipeForm.values.title,
                estimate: recipeForm.values.estimate,
                content: recipeForm.values.content,
            };

            const createdRecipe = await createRecipe(recipeVals);
            const ingredientPromises = ingredients.map(async (ingredient) => {
                const ingredientVals = {
                    content: ingredient.content
                }
                await createIngredient(ingredientVals, createdRecipe.id);
            });

            await Promise.all(ingredientPromises);
            navigate('/recipes');
        } catch (e) {
            addRecipeErrorNotification();
        }
    }
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <Paper shadow="sm" radius="xs" withBorder p="xl">
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <Stack gap="xl">
                    <TextInput
                        withAsterisk
                        label='Title'
                        placeholder='Pierogi'
                        {...recipeForm.getInputProps('title')}>
                    </TextInput>
                    <NumberInput
                        withAsterisk
                        label='Estimate in minutes'
                        step={10}
                        min={10}
                        {...recipeForm.getInputProps('estimate')}>
                    </NumberInput>
                    {ingredients.map((ingredient, index) => (
                        <TextInput
                            key={index}
                            withAsterisk
                            label={`Ingredient ${index + 1}`}
                            placeholder='Enter ingredient'
                            value={ingredient.content}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            onKeyDown={(e) => handleIngredientKeyDown(e, index)}
                        />
                    ))}
                    <Textarea
                        withAsterisk
                        label='Content'
                        placeholder='Mix all ingredients and bake for 20 minutes in 200 degrees.'
                        {...recipeForm.getInputProps('content')}>
                    </Textarea>
                    <Group>
                        <Button type='submit' variant="filled" color="orange">Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
}