import {showNotification} from '@mantine/notifications';

export const signUpErrorNotification = () => {
    showNotification({
        color: 'red',
        title: 'Error',
        message: 'Sign in failed'
    })
}