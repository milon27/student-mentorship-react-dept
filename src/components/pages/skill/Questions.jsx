import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from '../../layouts/ProtectedPage';
import QuestionsSet from './QuestionsSet';
import axios from 'axios';


export default function Questions() {
    //local 
    const [sub_skill, setSubSkill] = useState({})
    //get the currrent skill id
    const { skill_id, sub_skill_id } = useParams()
    //load sub skill details
    useEffect(() => {
        const load = async () => {
            //load the sub skill
            //career/get-one/:table/:field/:value
            const s = await axios.get('career/get-one/sub_skill/id/' + sub_skill_id).catch(e => {
                console.log("error on laoding the sub skill details by id", e)
            })
            //console.log("sub skill details", s.data.response)
            if (!s.data.error) {
                setSubSkill(s.data.response)
            } else {
                console.log("error on laoding the sub skill details by id", s.data)
            }
        }
        load()
    }, [sub_skill_id])

    return (
        <ProtectedPage>
            <Main title={sub_skill.title}>
                <QuestionsSet />
            </Main>
        </ProtectedPage>
    )
}
