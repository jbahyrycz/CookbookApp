import {Navigate, RouteObject, useRoutes} from 'react-router-dom';
import {Layout} from '../components/Layout';
import {RecipesList} from './cookbook/RecipesList';
import {RecipesForm} from './cookbook/RecipesForm';
import {ErrorPage} from './error/ErrorPage';
import {LoginPage} from './login/LoginPage';
import {useIsLogged} from '../hooks/useIsLogged';

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '*',
                element: <Navigate to='login' replace/>
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
                path: '/recipes/new',
                element: <RecipesForm/>
            },
            {
                path: '/recipes/:id',
                element: <RecipesForm/>
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