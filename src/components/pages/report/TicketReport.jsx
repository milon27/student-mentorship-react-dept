import React from 'react'
import ProtectedPage from './../../layouts/ProtectedPage';
import Main from './../../layouts/dashborad/Main';
import { Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import moment from "moment"
import axios from "axios"
import Define from './../../../utils/helpers/Define';



import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getPDFobj from './../../../utils/helpers/getPDFobj';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function TicketReport() {

    const [date, setDate] = useState("")

    const genTicketReport = () => {
        if (date === "") {
            alert("select a date.")
            return
        }
        const uptoDate = moment(date).format(Define.MYSQL_DATE)
        axios.get(`support/summary/dept/${uptoDate}`).then(res => {
            if (!res.data.error) {
                console.log(res.data.response);
                let str_arr = [
                    `Total Pending:  ${res.data.response.total_pending}`,
                    `Total Processing: ${res.data.response.total_processing}`,
                    `Total Snoozed: ${res.data.response.total_snoozed}`,
                    `Total Completed: ${res.data.response.total_completed}`,
                ]
                pdfMake.createPdf(getPDFobj("Ticket Status List from " + uptoDate + " to today", str_arr)).download();
            }
        })

    }


    const genTicketAssignReport = () => {

        axios.get(`support/ticket-assign-summery`).then(res => {
            if (!res.data.error) {
                console.log(res.data.response);
                const string_arr = res.data.response.map((item) => {
                    if (item.name === "Pending") {
                        return `Total Pending: ${item.total} `
                    }
                    return ` ${item.name}- Completed Ticket: ${item.total_completed}, processing Ticket: ${item.total_processing} `
                })
                pdfMake.createPdf(getPDFobj("Ticket Assign AO Report", string_arr)).download();
            }
        })

    }

    return (
        <ProtectedPage>
            <Main title="Report">
                {/* select a date */}
                <Row className="ml-1">
                    <Col xs={12} md={6} className="border p-2">
                        <h3>Ticket Report</h3>
                        <label htmlFor="date">Select date upto which you want to generate report?</label>
                        <input className="mt-3 form-control" type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)} />
                        <Button className="mt-3 bg-primary" onClick={genTicketReport}>Generate Now</Button>
                    </Col>
                    {/* new column */}
                    <Col xs={12} md={6} className="border p-2">
                        <h3>Assign Report</h3>
                        <p>Generate Report to see how many AO<br></br> ticket assignment details</p>
                        <Button className="mt-3 bg-primary" onClick={genTicketAssignReport}>Generate Now</Button>
                    </Col>

                </Row>
            </Main>
        </ProtectedPage>
    )
}
