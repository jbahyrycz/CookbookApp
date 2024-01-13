import {RecipeType} from '../../types/RecipeType';
import {FC, memo} from 'react';
import {Card, Image, Text} from '@mantine/core';
import {useNavigate} from "react-router-dom";

interface RecipeProps {
    recipe: RecipeType
}

export const RecipeRepresentation: FC<RecipeProps> = memo(({recipe}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/recipes/${recipe.id}`);
    }
    return (
        <Card
            shadow='sm'
            component='a'
            onClick={handleClick}
            target='_blank'
            withBorder
        >
            <Card.Section>
                <Image
                    src={recipe.url}
                    h={200}
                    alt='No way!'
                />
            </Card.Section>
            <Text fw={500} size='lg' mt='md'>
                {recipe.title}
            </Text>
            <Text mt='xs' c='dimmed' size='sm'>
                {recipe.estimate} min
            </Text>
        </Card>
    )
})