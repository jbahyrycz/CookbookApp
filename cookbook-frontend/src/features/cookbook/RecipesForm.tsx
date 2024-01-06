import {RecipeFormValues} from "../../types/RecipeFormValues";
import {useRecipesForm} from "./hooks/useRecipesForm"
import {Button, Group, NumberInput, Paper, Stack, Textarea, TextInput} from "@mantine/core";
import {createRecipe} from "./api/create-recipe";
import {useNavigate} from "react-router-dom";
import {addRecipeErrorNotification} from "./notifications";
import {useState} from "react";

export const RecipesForm = () => {
    const form = useRecipesForm();
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState(['']);

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleIngredientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            const newIngredients = [...ingredients, ''];
            setIngredients(newIngredients);
        }
    };

    const handleSubmit = async (vals: RecipeFormValues) => {
        try {
            await createRecipe(vals);
            navigate('/recipes');
        } catch (e) {
            addRecipeErrorNotification();
        }
    }

    return (
        <Paper shadow="sm" radius="xs" withBorder p="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="xl">
                    <TextInput
                        withAsterisk
                        label='Title'
                        placeholder='Pierogi'
                        {...form.getInputProps('title')}>
                    </TextInput>
                    <NumberInput
                        withAsterisk
                        label='Estimate in minutes'
                        step={10}
                        min={10}
                        {...form.getInputProps('estimate')}>
                    </NumberInput>
                    {ingredients.map((ingredient, index) => (
                        <TextInput
                            key={index}
                            withAsterisk
                            label={`Ingredient ${index + 1}`}
                            placeholder='Enter ingredient'
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            onKeyDown={(e) => handleIngredientKeyDown(e, index)}
                        />
                    ))}
                    <Textarea
                        withAsterisk
                        label='Content'
                        placeholder='Mix all ingredients and bake for 20 minutes in 200 degrees.'
                        {...form.getInputProps('content')}>
                    </Textarea>
                    <Group>
                        <Button type={'submit'}>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    )
}