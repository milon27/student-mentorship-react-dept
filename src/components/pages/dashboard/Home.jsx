import React, { useContext } from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';


export default function Home() {
    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <h3>Dashboard</h3>

            </Main>
        </ProtectedPage>
    )
}
