import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Recipes from './Components/Recipes/Recipes';
import Cookbook from './Components/Cookbook/Cookbook';
import Form from './Components/Form/Form';
import Auth from './Components/Auth/Auth';

export default (
    <Switch>
        <Route exact path = '/' component={Landing}/>
        <Route path = '/recipes' component={Recipes}/>
        <Route path = '/my-cookbook' component={Cookbook}/>
        <Route path = '/new-recipe' component={Form}/>
        <Route path = '/login' component={Auth}/>
    </Switch>
)