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

    //get all ticket upto today 

    const genTicketReport = () => {
        if (date === "") {
            alert("select a date.")
            return
        }
        const uptoDate = moment(date).format(Define.MYSQL_DATE)
        setDate("")
        axios.get(`support/ticket-summery-report/${uptoDate}`).then(res => {
            if (!res.data.error) {

                const result = res.data.response
                // [
                //     'title',
                //     {
                //         ol: []
                //     },

                // ]
                const arrray = []
                //1
                arrray.push(`Total Pending: ${result.total_pending.num}`)
                arrray.push({
                    ol: result.total_pending.tickets.map(item => item.ticket_title)
                })

                //2
                arrray.push(`Total Processing: ${result.total_processing.num}`)
                arrray.push({
                    ol: result.total_processing.tickets.map(item => item.ticket_title)
                })

                //3
                arrray.push(`Total Snoozed: ${result.total_snoozed.num}`)
                arrray.push({
                    ol: result.total_snoozed.tickets.map(item => item.ticket_title)
                })
                //4
                arrray.push(`Total Completed: ${result.total_completed.num}`)
                arrray.push({
                    ol: result.total_completed.tickets.map(item => item.ticket_title)
                })
                //final
                arrray.push(`Total Ticket: ${res.data.response.total_pending.num + res.data.response.total_processing.num + res.data.response.total_snoozed.num + res.data.response.total_completed.num}`)

                pdfMake.createPdf(getPDFobj("Ticket Status List from " + uptoDate + " to today", arrray)).download();
            } else {
                console.log(res.data)
                alert("No Data Found!Change Date.")
            }
        })

    }

    //AO report
    const genTicketAssignReport = () => {
        if (date === "") {
            alert("select a date.")
            return
        }
        const uptoDate = moment(date).format(Define.MYSQL_DATE)
        setDate("")
        axios.get(`support/ticket-assign-summery/${uptoDate}`).then(res => {
            if (!res.data.error) {

                // [
                //     'title',
                //     {
                //         ol: []
                //     },

                // ]

                const arrray = []

                res.data.response.forEach((item) => {
                    if (item.name !== "Pending") {
                        let title = ` ${item.name}- Completed Ticket: ${item.total_completed}, processing Ticket: ${item.total_processing} `
                        let tickets = item.tickets//[]
                        const ticket_str_arr = tickets.map(item => {
                            return item.ticket_title + " ( " + item.ticket_state + " )"
                        })
                        arrray.push(title)
                        arrray.push({
                            ol: ticket_str_arr
                        })
                    } else {
                        arrray.push(` ${item.name}- Ticket: ${item.total}`)
                    }
                })
                pdfMake.createPdf(getPDFobj("Ticket Assign AO Report from " + uptoDate + " to today", arrray)).download();


            } else {
                alert("No Data Found!Change Date.")
                console.log(res.data)
            }
        })

    }

    return (
        <ProtectedPage>
            <Main title="Report">
                {/* select a date */}
                <Row className="ml-1">
                    <Col xs={12} md={6} className="border p-2">
                        <h3>Ticket Status Report</h3>
                        <small>Get Ticket Status List upto today from selected date</small><br />
                        <label htmlFor="date">Select Date From?</label>
                        <input className="mt-3 form-control" type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)}
                            max={moment().format(Define.MYSQL_DATE)}
                        />
                        <Button className="mt-3 bg-primary" onClick={genTicketReport}>Generate Now</Button>
                    </Col>
                    {/* new column */}
                    <Col xs={12} md={6} className="border p-2">
                        <h3>Assign Report</h3>
                        <small>Get AO List with their ticket list upto today from selected date</small><br />
                        <label>Generate Report to see how many AO ticket assignment details</label>
                        <input className="mt-3 form-control" type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)}
                            max={moment().format(Define.MYSQL_DATE)}
                        />
                        <Button className="mt-3 bg-primary" onClick={genTicketAssignReport}>Generate Now</Button>
                    </Col>

                </Row>
            </Main>
        </ProtectedPage>
    )
}
