const initialState = {
    savedRecipes: []
}

const SAVE_RECIPE = 'SAVE_RECIPE'

export function saveRecipe(recipeArr){
    return {
        type: SAVE_RECIPE,
        payload: recipeArr
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SAVE_RECIPE:
            return {...state, savedRecipes: payload}
        default:
            return state
    }
}
