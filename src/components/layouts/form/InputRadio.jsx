import React from 'react'
import { Form } from 'react-bootstrap';

export default function InputRadio({ title, value, name, onChange, disable = false, type = "radio", checked }) {
    return (
        <>
            <Form.Group>
                <div className="d-flex form-control form-controlInput p-1 ">
                    <input id={value} name={name} className="m-2 radioValue" type={type} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true} checked={checked} />
                    <label htmlFor={value}>{title}</label>
                </div>
            </Form.Group>
        </>
    )
}
