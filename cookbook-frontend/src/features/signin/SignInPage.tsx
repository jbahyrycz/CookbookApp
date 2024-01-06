import React, {FC} from "react";
import {useForm} from "@mantine/form";
import {Button, Stack, TextInput} from "@mantine/core";
import {signIn} from "./api/sign-in";
import {signInErrorNotification} from "./notifications";
import {useNavigate} from "react-router-dom";

type LogInFormType = {
    username: string
    password: string
}
export const SignInPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<LogInFormType>({
        initialValues: {
            username: '',
            password: ''
        },
    })
    const handleSubmit = async (data: LogInFormType) => {
        try {
            await signIn(data.username, data.password);
            navigate('/recipes');
        } catch (error) {
            signInErrorNotification();
        }
    }
    return (
        <div style={{width: '100%'}}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Stack gap={'md'}>
                    <p>Sign in</p>
                    <TextInput required type='username' label='Username' {...form.getInputProps('username')}/>
                    <TextInput required type='password' label='Password' {...form.getInputProps('password')}/>
                    <Button type='submit'>Sign in</Button>
                </Stack>
            </form>
        </div>
    );
}