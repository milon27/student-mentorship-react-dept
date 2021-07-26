import React from 'react'
import { Form } from 'react-bootstrap';

export default function InputSelectValue({ title, value, name, onChange, disable = false}) {
    return (
        <>
            <Form.Group>
                <select className="form-select form-control form-controlInput" name={name} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true} aria-label="Default select example">
                <option >Select the correct answer</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                </select>
            </Form.Group>
        </>
    )
}
