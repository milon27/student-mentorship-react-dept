import React from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from '../../layouts/ProtectedPage';
import Skillset from './Skillset';


export default function Skill() {
    return (
        <ProtectedPage>
            <Main title="Skill Management">
                <Skillset/>
            </Main>
        </ProtectedPage>
    )
}
