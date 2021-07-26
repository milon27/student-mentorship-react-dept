import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from '../../layouts/ProtectedPage';
import SubSkillset from './SubSkillset';
import axios from 'axios';


export default function SubSkill() {
    //local 
    const [skill, setSkill] = useState({})

    //get the currrent skill id
    const { skill_id } = useParams()
    //load skill details
    useEffect(() => {
        const load = async () => {
            //load the skill
            //career/get-one/:table/:field/:value
            const s = await axios.get('career/get-one/skill/id/' + skill_id).catch(e => {
                console.log("error on laoding the skill details by id", e)
            })
            //console.log(s.data.response)
            if (!s.data.error) {
                setSkill(s.data.response)
            } else {
                console.log("error on laoding the skill details by id", s.data)
            }
        }
        load()
    }, [skill_id])


    return (
        <ProtectedPage>
            <Main title={skill.title}>
                <SubSkillset />
            </Main>
        </ProtectedPage>
    )
}
