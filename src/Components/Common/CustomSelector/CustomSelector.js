import React from 'react'
import { Form } from 'react-bootstrap'

function CustomSelector() {
  return (
    <Form.Select aria-label="Default select example">
        <option>Select Employee type*</option>
        <option value="1">Temporary</option>
        <option value="2">Permanent</option>
        <option value="3">Contract</option>
    </Form.Select>
  )
}

export default CustomSelector