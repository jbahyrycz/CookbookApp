import {showNotification} from '@mantine/notifications';

export const addRecipeErrorNotification = () => {
    showNotification({
        color: 'red',
        title: 'Error',
        message: 'Add recipe failed'
    })
}