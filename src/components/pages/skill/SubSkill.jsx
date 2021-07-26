import React from 'react'
import { useLocation} from 'react-router-dom';
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from '../../layouts/ProtectedPage';
import SubSkillset from './SubSkillset';


export default function SubSkill() {
    const location = useLocation();
    const sub_item = location.state.sub_items;

    return (
        <ProtectedPage>
            <Main title={sub_item.title}>
                <SubSkillset sub_item={sub_item}/>
            </Main>
        </ProtectedPage>
    )
}
