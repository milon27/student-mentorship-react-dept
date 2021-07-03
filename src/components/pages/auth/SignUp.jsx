import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory, Redirect } from 'react-router-dom'
import '../../../assets/css/auth.css'
import URL from '../../../utils/helpers/URL'
import Input from '../../layouts/form/Input'
import Define from './../../../utils/helpers/Define';
import AlertLoading from './../../layouts/AlertLoading';
import { DispatchContext } from './../../../utils/context/MainContext';
import AppAction from './../../../utils/context/actions/AppAction';
import AuthAction from './../../../utils/context/actions/AuthAction';
import Response from './../../../utils/helpers/Response';
import CUser from './../../../utils/helpers/CUser';
import logo from '../../../assets/img/logo.webp'

export default function SignUp() {
    const history = useHistory()
    //global state
    const { appDispatch, authDispatch } = useContext(DispatchContext)
    //local state
    const initvalue = {
        name: "",
        email: "",
        phone: "",
        password: "",
        c_password: "",
        photo_url: Define.NOT_SET
    }
    const [dept, setDept] = useState(initvalue)

    //lifecycle method 

    //local method
    const onSubmit = async (e) => {
        e.preventDefault()
        const app = new AppAction(appDispatch)
        //ck password & confirm pass is same or not
        if (dept.password.length <= 6) {
            app.SET_RESPONSE(Response(false, "Password length should be more than 6 character.", "", Define.BT_DANGER))
            return
        }
        if (dept.password !== dept.c_password) {
            app.SET_RESPONSE(Response(false, "Password and Confirm Password doesn't match.", "", Define.BT_DANGER))
            return
        }
        //start loding..
        app.START_LOADING()
        //signup user
        try {
            const response = await new AuthAction(authDispatch).signup(dept)
            console.log(response)
            app.STOP_LOADING()
            history.push(URL.HOME)
        } catch (e) {
            app.SET_RESPONSE(Response(false, "SignUp failed.", e.message, Define.BT_DANGER))
            app.START_LOADING()
        }
    }
    const onChange = (e) => {
        setDept({ ...dept, [e.target.name]: e.target.value })
    }


    //check alrady logged in or not
    if (CUser.isLoggedIn()) {
        return <Redirect to={URL.HOME}></Redirect>
    }

    //return 
    return (
        <div className="auth">
            <div className="inner">

                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center mb-2">
                        <img src={logo} width={50} alt="" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h3>Register as a Department Admin</h3>
                    </div>
                </div>

                <form onSubmit={onSubmit}>

                    <Input name="name" title="Name" value={dept.name} onChange={onChange} />

                    <Input name="email" type="email" title="Email" value={dept.email} onChange={onChange} />

                    <Input name="phone" type="tel" title="Phone" value={dept.phone} onChange={onChange} />

                    <Input name="password" type="password" title="Password" value={dept.password} onChange={onChange} />

                    <Input name="c_password" type="password" title="Confirm Password" value={dept.c_password} onChange={onChange} />

                    <AlertLoading loadColor={Define.BT_INFO} />

                    <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " >Register Now</Button>

                    <p className="forgot-password text-right">
                        Already registered <Link to={URL.SIGN_IN}><a>log in?</a></Link>
                    </p>
                </form>
            </div>
        </div >
    )
}
