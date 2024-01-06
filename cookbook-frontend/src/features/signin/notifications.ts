import {showNotification} from '@mantine/notifications';

export const signInErrorNotification = () => {
    showNotification({
        color: 'red',
        title: 'Error',
        message: 'Sign in failed'
    })
}