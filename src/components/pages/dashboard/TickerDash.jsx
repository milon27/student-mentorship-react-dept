
import React from 'react'
import URL from './../../../utils/helpers/URL';
import { Link } from 'react-router-dom';
import careerImg from "../../../assets/img/career.png";
import moment from 'moment';
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';

export default function TicketDash() {
    //this month ticket summery
    const [summery, setSummery] = useState({ total_pending: 0, total_processing: 0, total_snoozed: 0, total_completed: 0 })

    useEffect(() => {
        const date = moment().format("YYYY-MM-01")
        //http://localhost:2727/support/summary/dept/:id
        //:id is date upto all ticket count will show
        axios.get(`support/summary/dept/${date}`).then(res => {
            if (!res.data.error) {
                setSummery(res.data.response);
            }
        })

    }, [])

    return (
        <div className="media d-flex justify-content-between">
            <div className=" ">
                <img src={careerImg} alt="" className="icon_width" />
            </div>
            <div className="media-body ml-4">
                Total Processing Ticket: {summery.total_processing}
                <br />
                Total Pending Ticket: {summery.total_pending}
                <br />
                Total Snoozed Ticket: {summery.total_snoozed}
                <br />
                Total Completed Ticket: {summery.total_completed}
                <br />
                <Link to={URL.TICKET_REPORT}>Generate Report</Link>
            </div>
        </div>
    )
}