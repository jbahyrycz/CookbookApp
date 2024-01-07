import {useEffect, useState} from "react";
import {useRecipesForm} from "./hooks/useRecipesForm";
import {useNavigate, useParams} from "react-router-dom";
import {getRecipe} from "../recipe/api/get-recipe";
import {Button, Group, NumberInput, Paper, Stack, Textarea, TextInput} from "@mantine/core";
import {addRecipeErrorNotification} from "./notifications";
import {listIngredientsByRecipe} from "./api/cookbook";
import {RecipeType} from "../../types/RecipeType";
import {IngredientType} from "../../types/IngredientType";
import {editIngredient, editRecipe} from "./api/edit-recipe";
import {createIngredient} from "./api/create-recipe";

export const EditRecipeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    if (!id) throw new Error('Recipe edit fail');
    const recipeId = parseInt(id, 10);
    const [recipeData, setRecipeData] = useState<RecipeType>({
        id: recipeId,
        title: '',
        estimate: 0,
        content: ''
    });
    const [ingredients, setIngredients] = useState<IngredientType[]>([{
        id: 0, content: '', recipeId: 0
    }]);
    const recipeForm = useRecipesForm();
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const fetchedRecipe = await getRecipe(recipeId);
                setRecipeData(fetchedRecipe);
                const fetchedIngredients = await listIngredientsByRecipe(recipeId);

                if (!isDataFetched) {
                    recipeForm.setValues({
                        title: fetchedRecipe.title,
                        estimate: fetchedRecipe.estimate,
                        content: fetchedRecipe.content,
                    });
                    setIngredients(fetchedIngredients);
                    setIsDataFetched(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecipeData();
    }, [recipeId, isDataFetched, recipeForm]);


    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index].content = value;
        setIngredients(newIngredients);
    };
    const handleIngredientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter' && index === ingredients.length - 1) {
            e.preventDefault();
            const newIngredients = [
                ...ingredients,
                { id: 0, content: '', recipeId: recipeId } // Nowy pusty składnik
            ];
            setIngredients(newIngredients);
        }
    };

    const handleSubmit = async () => {
        try {
            const existingIngredients = ingredients.filter((ingredient) => ingredient.id !== 0);

            const editIngredientPromises = existingIngredients.map(async (ingredient) => {
                const ingredientVals = {
                    content: ingredient.content
                };
                await editIngredient(ingredientVals, ingredient.id);
            });
            const newIngredients = ingredients.filter((ingredient) => ingredient.id === 0);
            const newIngredientPromises = newIngredients.map(async (ingredient) => {
                const ingredientVals = {
                    content: ingredient.content
                };
                await createIngredient(ingredientVals, recipeId); // Dodaj funkcję do dodawania nowych składników do bazy danych
            });

            const recipeVals = {
                title: recipeForm.values.title,
                estimate: recipeForm.values.estimate,
                content: recipeForm.values.content,
            };

            const recipe = await editRecipe(recipeVals, recipeId);

            await Promise.all([...editIngredientPromises, ...newIngredientPromises]);
            navigate(`/recipes/${recipeId}`);
        } catch (e) {
            addRecipeErrorNotification();
        }
    };
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
                        {...recipeForm.getInputProps('title')}
                    />
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
                        defaultValue={recipeData.content}
                    </Textarea>
                    <Group>
                        <Button type={'submit'}>Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
};
