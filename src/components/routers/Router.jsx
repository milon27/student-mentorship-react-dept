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
import TicketReport from './../pages/report/TicketReport';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={URL.HOME} component={Home} ></Route>
                <Route path={URL.SIGN_UP} component={SignUp}></Route>
                <Route path={URL.SIGN_IN} component={SignIn}></Route>
                <Route path={URL.SIGN_IN} component={SignIn}></Route>

                <Route path={URL.CONTRIBUTOR} component={Contributor}></Route>
                <Route exact path={URL.SKILL_MANAGEMENT} component={Skill}></Route>
                {/* show all subskill inside this skill */}
                <Route exact path={URL.SKILL_MANAGEMENT + "/:skill_id"} component={SubSkill}></Route>
                {/* show all subskill inside this skill */}
                <Route exact path={URL.SKILL_MANAGEMENT + "/:skill_id/:sub_skill_id"} component={Questions}></Route>

                <Route path={URL.TICKET_REPORT} component={TicketReport}></Route>
                {/* <Route path={URL.QUESTIONS} component={Questions}></Route> */}
                <Route default component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}
