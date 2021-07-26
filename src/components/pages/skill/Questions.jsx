import React from 'react'
import { useLocation} from 'react-router-dom';
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from '../../layouts/ProtectedPage';
import QuestionsSet from './QuestionsSet';


export default function Questions() {
    const location = useLocation();
    const question_item = location.state.question_item;

    return (
        <ProtectedPage>
            <Main title={question_item.title}>
                <QuestionsSet question_item={question_item}/>
            </Main>
        </ProtectedPage>
    )
}
