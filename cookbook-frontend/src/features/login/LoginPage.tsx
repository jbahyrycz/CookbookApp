import React, {FC} from "react";
import {useForm} from "@mantine/form";
import {Button, Stack, TextInput} from "@mantine/core";
import {login} from "./api/login";
import {loginErrorNotification} from "./notifications";
import {useNavigate} from "react-router-dom";

type LoginFormType = {
    username: string
    password: string
}
export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<LoginFormType>({
        initialValues: {
            username: '',
            password: ''
        },
    })
    const handleSubmit = async (data: LoginFormType) => {
        try {
            await login(data.username, data.password);
            navigate('/recipes');
        } catch (error) {
            loginErrorNotification();
        }
    }
    return (
        <div style={{width: '100%'}}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Stack gap={'md'}>
                    <TextInput required type='username' label='Username' {...form.getInputProps('username')}/>
                    <TextInput required type='password' label='Password' {...form.getInputProps('password')}/>
                    <Button type='submit'>Log in</Button>
                </Stack>
            </form>
        </div>
    );
}