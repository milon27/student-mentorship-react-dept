import React from 'react'
import { Form } from 'react-bootstrap';

export default function InputSelectValue({ title, value, name, onChange, question, disable = false }) {
    return (
        <>
            <Form.Group>
                <select className="form-select form-control form-controlInput" name={name} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true} aria-label="Default select example">
                    <option value={""}>Select the correct answer</option>
                    <option value={question.op_1}>Option 1</option>
                    <option value={question.op_2}>Option 2</option>
                    <option value={question.op_3}>Option 3</option>
                    <option value={question.op_4}>Option 4</option>
                </select>
            </Form.Group>
        </>
    )
}
