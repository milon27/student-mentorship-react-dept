import React, { useContext } from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';
import { Row, Col } from 'react-bootstrap';
import DashCard from './DashCard';
import SkillDash from './SkillDash';


export default function Home() {
    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <Row className="mt-2">
                    <Col>
                        <DashCard title="Skill Management" >
                            <SkillDash />
                        </DashCard>
                    </Col>
                    <Col>
                        <DashCard title="Coming Soon" />
                    </Col>
                    <Col>
                        <DashCard title="Coming Soon" />
                    </Col>
                </Row>

            </Main>
        </ProtectedPage>
    )
}
