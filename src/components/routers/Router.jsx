import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NotFound from './../pages/404/index';
import Home from './../pages/dashboard/Home';
import URL from './../../utils/helpers/URL';
import SignUp from '../pages/auth/SignUp';
import SignIn from './../pages/auth/SignIn';
import Contributor from "./../pages/contributor/Contributor";
import Skill from "./../pages/skill/Skill";
import SubSkill from '../pages/skill/SubSkill';
import Questions from '../pages/skill/Questions';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={URL.HOME} component={Home} ></Route>
                <Route path={URL.SIGN_UP} component={SignUp}></Route>
                <Route path={URL.SIGN_IN} component={SignIn}></Route>
                <Route path={URL.SIGN_IN} component={SignIn}></Route>

                <Route path={URL.CONTRIBUTOR} component={Contributor}></Route>
                <Route path={URL.SKILL_MANAGEMENT} component={Skill}></Route>
                <Route path={URL.SUB_SKILL} component={SubSkill}></Route>
                <Route path={URL.QUESTIONS} component={Questions}></Route>
                <Route default component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}
