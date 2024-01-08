import React, {FC} from "react";
import {useForm} from "@mantine/form";
import {Button, Stack, TextInput} from "@mantine/core";
import {signUp} from "./api/sign-up";
import {signUpErrorNotification} from "./notifications";
import {useNavigate} from "react-router-dom";
import {signIn} from "../signin/api/sign-in";

type SignUpFormType = {
    username: string
    password: string
}
export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<SignUpFormType>({
        initialValues: {
            username: '',
            password: ''
        },
    });
    const handleSubmit = async (data: SignUpFormType) => {
        try {
            await signUp(data);
            await signIn(data.username, data.password);
            navigate('/recipes');
        } catch (error) {
            signUpErrorNotification();
        }
    }
    return (
        <div style={{width: '100%'}}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Stack gap={'md'}>
                    <p>Sign up</p>
                    <TextInput required type='username' label='Username' {...form.getInputProps('username')}/>
                    <TextInput required type='password' label='Password' {...form.getInputProps('password')}/>
                    <Button type='submit' variant="filled" color="orange">Sign up</Button>
                </Stack>
            </form>
        </div>
    );
}