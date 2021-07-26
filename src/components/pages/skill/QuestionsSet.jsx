import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { StateContext } from '../../../utils/context/MainContext';
import Define from '../../../utils/helpers/Define';
import AlertLoading from '../../layouts/AlertLoading';
import QuestionsModal from './QuestionsModal';
import QuestionsTable from './QuestionsTable';

export default function QuestionsSet() {


    //local state
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);

    //global state
    const { question_list } = useContext(StateContext);
    //pagination handle
    const prev = () => {
        if (page > 1) {
            setPage(page => page - 1)
        } else {
            alert("no prev")
        }
    }
    const next = () => {
        if (question_list.length < Define.PAGE_SIZE) {
            //next page not availble
            alert("no next")
        } else {
            setPage(page => page + 1)
        }
    }

    return (
        <>
            <QuestionsModal show={show} setShow={setShow} />
            <Row >
                <Col className="d-flex justify-content-center mb-3">
                    <AlertLoading loadColor={Define.BT_DANGER} />
                </Col>
            </Row>
            <Row >
                <Col className="d-flex justify-content-start mb-3">
                    <Button className="mr-2 button_color" onClick={prev}>Prev</Button>
                    <Button className="mr-2 button_color" disabled>{page}</Button>
                    <Button className="mr-2 button_color" onClick={next}>Next</Button>
                </Col>
                <Col className="d-flex justify-content-end mb-3 ">
                    <Button className="button_color" onClick={() => { setShow(true) }}>Add New Question</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <QuestionsTable page={page} />
                </Col>
            </Row>
        </ >
    )
}
