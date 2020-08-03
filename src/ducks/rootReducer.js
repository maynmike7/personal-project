import {combineReducers} from 'redux';
import recipeReducer from './recipeReducer';
import usersReducer from './usersReducer';

export default combineReducers({recipeReducer, usersReducer})