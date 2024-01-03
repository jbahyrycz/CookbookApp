import {RecipesFormValues} from "../../types/RecipesFormValues";
import {useRecipesForm} from "./hooks/useRecipesForm"
import {Button, Group, Paper, Stack, Textarea, TextInput} from "@mantine/core";

export const RecipesForm = () => {
    const form = useRecipesForm()

    const handleSubmit = (vals: RecipesFormValues) => {
        console.log(vals)
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
                    <TextInput
                        withAsterisk
                        label='Estimate'
                        {...form.getInputProps('estimate')}>
                    </TextInput>
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