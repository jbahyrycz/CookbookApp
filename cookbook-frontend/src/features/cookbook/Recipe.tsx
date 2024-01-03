import {RecipeType} from "../../types/RecipeType";
import {FC, memo} from "react";
import {Card, Image, Text} from "@mantine/core";

interface RecipeProps {
    recipe: RecipeType
}

export const Recipe: FC<RecipeProps> = memo(({recipe}) => {
    return (
        <Card
            shadow="sm"
        >
            <Card.Section>
                <Image
                    src="https://placehold.co/400x200"
                    h={200}
                    alt="No way!"
                />
            </Card.Section>
            <Text fw={500} size="lg" mt="md">
                {recipe.title}
            </Text>
            <Text mt="xs" c="dimmed" size="sm">
                {recipe.estimate}
            </Text>
            <Text mt="xs" c="dimmed" size="sm">
                {recipe.content}
            </Text>
        </Card>
    )
})