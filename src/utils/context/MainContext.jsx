import React, { createContext, useReducer } from 'react'
import AppReducer, { initAppState } from './reducers/AppReducer';
import AuthReducer, { initAuthState } from './reducers/AuthReducer';
import ListReducer, { initListState } from './reducers/ListReducer';
import ObjectReducer, { initObjectState } from './reducers/ObjectReducer';

export const StateContext = createContext();
export const DispatchContext = createContext();

export default function MainContext(props) {
    const [auth, authDispatch] = useReducer(AuthReducer, initAuthState);//for student auth
    const [app, appDispatch] = useReducer(AppReducer, initAppState);//for app state
    const [list, listDispatch] = useReducer(ListReducer, initListState);//for any kind of list
    const [obj, objDispatch] = useReducer(ObjectReducer, initObjectState);//for any kind of object
    const [skill_list, skill_listDispatch] = useReducer(ListReducer, initListState);
    const [subSkill_list, subSkill_listDispatch] = useReducer(ListReducer, initListState);
    const [question_list, question_listDispatch] = useReducer(ListReducer, initListState);

    const global_state = {
        auth, list, app,skill_list,subSkill_list,question_list
    }
    const global_dispatch = {
        authDispatch, listDispatch, appDispatch,skill_listDispatch,subSkill_listDispatch,question_listDispatch
    }

    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
