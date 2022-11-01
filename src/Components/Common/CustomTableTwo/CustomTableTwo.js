import React, {useState, useRef} from 'react';
import { Dropdown, Table } from 'react-bootstrap';
import {BsThreeDotsVertical} from 'react-icons/bs';
import getSymbolFromCurrency from 'currency-symbol-map';

function CustomTableTwo({
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
                <th>Date Paid</th>
                <th>Amount Paid</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((cur) => (
                    <tr key={cur.id}>
                        <td> {cur.employmentStartDate} </td>
                        <td> 
                            {getSymbolFromCurrency('NGN')} {cur.netSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 
                        </td>
                        <td> 
                          <p 
                            style={{
                                fontWeight: '400',
                                color: cur.status === 'Success' ? '#007737' : cur.status === 'Pending' ? '#333333' : '#910202',
                                backgroundColor: cur.status === 'Success' ? 'rgba(230, 252, 239, 1)' : cur.status === 'Pending' ? 'rgba(230, 230, 230, 1)' : 'rgba(255, 236, 236, 1)',
                                width: 80,
                                textAlign: 'center',
                                borderRadius: 3
                            }}
                          >
                            {cur.status}  
                          </p>  
                        </td>   
                    </tr>
                ))
            }
        </tbody>
    </Table>
  )
}

export default CustomTableTwo;