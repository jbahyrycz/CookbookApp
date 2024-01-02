import {RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {RecipesList} from "./cookbook/RecipesList";
import {RecipesForm} from "./cookbook/RecipesForm";
import {ErrorPage} from "./error/ErrorPage";

const routes: RouteObject[] = [
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
    return useRoutes(routes)
}