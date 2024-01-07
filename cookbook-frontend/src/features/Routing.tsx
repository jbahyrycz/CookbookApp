import {Navigate, RouteObject, useRoutes} from 'react-router-dom';
import {Layout} from '../components/Layout';
import {RecipesList} from './cookbook/RecipesList';
import {RecipesForm} from './cookbook/RecipesForm';
import {ErrorPage} from './error/ErrorPage';
import {SignInPage} from './signin/SignInPage';
import {useIsLogged} from '../hooks/useIsLogged';
import {MyRecipesList} from "./cookbook/MyRecipesList";
import {SignUpPage} from "./signup/SignUpPage";
import {Recipe} from "./recipe/Recipe";
import {EditRecipeForm} from "./cookbook/EditRecipeForm";

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <RecipesList/>
            },
            {
                path: '/signin',
                element: <SignInPage/>
            },
            {
                path: '/signup',
                element: <SignUpPage/>
            },
            {
                path: '*',
                element: <Navigate to='signin' replace/>
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/recipes',
                element: <RecipesList/>
            },
            {
                path: '/recipes/my',
                element: <MyRecipesList/>
            },
            {
                path: '/recipes/new',
                element: <RecipesForm/>
            },
            {
                path: '/recipes/:id/edit',
                element: <EditRecipeForm/>
            },
            {
                path: '/recipes/:id',
                element: <Recipe/>,
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]
export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}