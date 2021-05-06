


import { v4 as uuidv4 } from "uuid";
import * as actionTypes from '../../stores/actions/actionTypes';
import axios from 'axios'
import fetch from 'fetch'


const initialState = {
    meals: [
        {
            id: uuidv4(),
            mealType: 'Breakfast',
            food: [
                { id: uuidv4(), name: 'Egg', cal: 70 },
                { id: uuidv4(), name: 'Latte', cal: 50 },
                { id: uuidv4(), name: 'Bread', cal: 100 },
            ]
        },
        {
            id: uuidv4(),
            mealType: 'Snack',
            food: [
                { id: uuidv4(), name: 'Protein Bar', cal: 100 },
                { id: uuidv4(), name: 'Diet Coke', cal: 10 },
            ]
        },
    ]
}


const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_ALL_MEALS":
            console.log("SHOW_ALL_MEALS action", action.meals)

            // return state
            return {
                ...state,
                meals: action.meals
            }

        case 'DELETE_ALL_MEALS':
            return {
                ...state,
                meals: []
            }

        case 'EDIT_FOOD':
            let updateFoodInMeals = state.meals.map(meal => {
                if (meal.id === action.targetMealId) {
                    let updateFood = meal.food.map(food => {
                        if (food.id === action.targetFoodId) {
                            return {
                                ...food,
                                name: action.name,
                                cal: action.cal
                            }
                        } else { return food }
                    })
                    return {
                        ...meal,
                        food: updateFood
                    }
                } else { return meal }
            })
            return {
                ...state,
                meals: updateFoodInMeals
            }



        case 'DELETE_FOOD':
            let deleteFoodInMeals = state.meals.map(meal => {
                if (meal.id === action.targetMealId) {
                    let deleteFood = meal.food.filter(food => food.id !== action.targetFoodId)

                    return {
                        ...meal,
                        food: deleteFood
                    }
                } else {
                    return meal
                }
            })
            return {
                ...state,
                meals: deleteFoodInMeals
            }


        case 'ADD_FOOD':
            let addFoodInMeal = state.meals.map(meal => {
                if (meal.id === action.targetId) {
                    return {
                        ...meal,
                        food: [...meal.food, action.newFood]
                    }
                } else {
                    return meal
                }
            })
            return {
                ...state,
                meals: addFoodInMeal
            }


        case "EDIT_MEAL":
            console.log(action)
            let updateMeal = state.meals.map(meal => {
                if (meal.id === action.targetMealId) {
                    return { ...meal, mealType: action.name }
                } else { return meal }
            })
            return {
                ...state,
                meals: updateMeal
            }


        case 'DELETE_MEAL':
            console.log('state.meals', state.meals)
            
            let deleteMeal = state.meals.filter(meal => meal.id !== action.targetMealId)
            
            return {
                ...state,
                meals: deleteMeal
            }

        case 'ADD_MEAL':
            console.log(action)
            return {
                ...state,
                meals: [
                    {
                        id: uuidv4(),
                        mealType: action.mealType,
                        food: []
                    },
                    ...state.meals
                ]
            }

        default:
            return state
        // {
        //     ...state,
        //     meals: axios.get('http://localhost:4000/api/meals/view-meals/606d0251a11618c9eefcb3c7').then(result => state.meals = result.data)
        // }
    }
}

export default mealsReducer