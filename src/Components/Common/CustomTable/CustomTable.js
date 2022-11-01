import React, {useState, useRef} from 'react';
import { Dropdown, Table } from 'react-bootstrap';
import {BsThreeDotsVertical} from 'react-icons/bs';
import getSymbolFromCurrency from 'currency-symbol-map';

function CustomTable({
    data
}) {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <p
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </p>
    ));
  return (
    <Table
        borderless={true} 
        responsive
    >
        <thead>
            <tr>
                <th>Fullname</th>
                <th>Employee ID</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Employee strt Dt.</th>
                <th>Status</th>
                <th>Net Salary</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((cur) => (
                    <tr key={cur.id}>
                        <td> {cur.fullname} </td>
                        <td> {cur.employeeId} </td>
                        <td> {cur.phoneNumber} </td>
                        <td> 
                            <p style={{overflowX: 'hidden', width: 70}}>
                            {cur.email}    
                            </p> 
                        </td>
                        <td> {cur.employmentStartDate} </td>
                        <td> 
                          <p 
                            style={{
                                fontWeight: '400',
                                color: cur.status === 'Active' ? '#007737' : cur.status === 'Inactive' ? '#333333' : '#910202',
                                backgroundColor: cur.status === 'Active' ? 'rgba(230, 252, 239, 1)' : cur.status === 'Inactive' ? 'rgba(230, 230, 230, 1)' : 'rgba(255, 236, 236, 1)',
                                width: 80,
                                textAlign: 'center',
                                borderRadius: 3
                            }}
                          >
                            {cur.status}  
                          </p>  
                        </td>
                        <td> 
                            {getSymbolFromCurrency('NGN')} {cur.netSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    <BsThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item style={{color: 'rgba(255, 178, 0, 1)'}}> Suspend account </Dropdown.Item>
                                    <Dropdown.Item style={{color: 'rgba(195, 0, 0, 1)'}} > Deactive account </Dropdown.Item>
                                    <Dropdown.Item style={{color: 'rgba(3, 166, 60, 1)'}} > Restore account </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
  )
}

export default CustomTable;