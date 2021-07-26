import React from 'react'
import { Form } from 'react-bootstrap';

export default function InputTextArea({ title, value, name, onChange, disable = false}) {
    return (
        <>
            <Form.Group>
                <textarea className="form-control form-controlInput" name={name} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true}/>
            </Form.Group>
        </>
    )
}
