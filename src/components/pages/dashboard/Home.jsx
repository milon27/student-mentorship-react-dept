import React, { useContext } from 'react'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';
import { Row, Col } from 'react-bootstrap';
import DashCard from './DashCard';
import SkillDash from './SkillDash';
import TicketDash from './TickerDash';


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
                        <DashCard title="Current Month Ticket Summary" >
                            <TicketDash />
                        </DashCard>
                    </Col>
                    <Col>
                        <DashCard title="Coming Soon" />
                    </Col>
                </Row>

            </Main>
        </ProtectedPage>
    )
}
