import {useForm} from "@mantine/form";
import {RecipesFormValues} from "../../../types/RecipesFormValues";

export const useRecipesForm = () => {
    const form = useForm<RecipesFormValues>({
        initialValues: {
            title: '',
            estimate: 15,
            content: ''
        },

        validate: {
            title: (value) => {
                if (value.length < 5) {
                    return 'Title must be at least 5 characters long'
                }
            },
            estimate: (value) => {
                if (value < 1) {
                    return 'Estimate can not be less than 1 minute'
                }
            },
            content: (value) => {
                if (value.length < 20) {
                    return 'Content must be at least 20 characters long'
                }
            }
        }
    })
    return form
}