
import React from 'react'
import URL from './../../../utils/helpers/URL';
import { Link } from 'react-router-dom';
import careerImg from "../../../assets/img/career.png";

export default function SkillDash() {
    return (
        <div className="media d-flex justify-content-between">
            <div className=" ">
                <img src={careerImg} alt="" className="icon_width" />
            </div>
            <div className="media-body ml-4">
                Create SKills and<br /> Sub Skills and<br /> Questions for those <br />Sub skills.
                <br />
                <Link to={URL.SKILL_MANAGEMENT}>Start Now</Link>
            </div>
        </div>
    )
}