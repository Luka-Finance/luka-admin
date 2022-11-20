import React, {useState} from 'react';
import { Dropdown, Table } from 'react-bootstrap';
import {BsThreeDotsVertical} from 'react-icons/bs';
import getSymbolFromCurrency from 'currency-symbol-map';
import axiosInstance from '../../../Utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';

function CustomTable({
    data,
    refresh
}) {
    const [loading, setLoading] = useState(false);
    const staffToggle = async(id, action) => {
       setLoading(true);
       try {
        const res = await axiosInstance({
            url: `/business/toggle/${id}`,
            method: 'POST',
            data: {
                action: `${action}`
            }
        })
        const {message} = res.data;
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false);
        refresh();
        return(<ToastContainer />)
       } catch (error) {
        setLoading(false);
        const err = error.response.data.message
        toast.error(err, {
            position: toast.POSITION.TOP_RIGHT
        })
        return(<ToastContainer />)
       }
    };

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
    <>
        {loading && (
            <h5 style={{textAlign: 'center', color: 'green', transition: 'ease-in-out 0.3s', marginBottom: 20}}>
                updating staff
            </h5>
        )}
        <Table
            responsive={true}
            borderless={true}
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
                            <td> {`${cur.firstName} ${cur.lastName}`} </td>
                            <td>
                                {/* <p style={{width: '70%', display: 'flex', flexWrap: 'wrap'}}>
                                {cur.id} 
                                </p>  */}
                                {cur.id}
                            </td>
                            <td> {cur.phone} </td>
                            <td> 
                                {/* <p style={{width: 100, display: 'flex', flexWrap: 'wrap',border: '1px solid black', borderColor: 'black', borderWidth: 1, height: 60}}>
                                {cur.email}    
                                </p>  */}
                                {cur.email} 
                            </td>
                            <td> 
                                {
                                    cur.createdAt ? (
                                        <Moment date={cur.createdAt} />
                                    ) : (<p>awaiting</p>)
                                } 
                            </td>
                            <td> 
                            <p 
                                style={{
                                    fontWeight: '400',
                                    color: cur.status === 'active' ? '#007737' : cur.status === 'pending' ? '#333333' : cur.status === 'suspended'  ? '#AA6C39' : '#910202',
                                    backgroundColor: cur.status === 'active' ? 'rgba(230, 252, 239, 1)' : cur.status === 'pending' ? 'rgba(230, 230, 230, 1)' : cur.status === 'suspended'  ? 'rgba(255, 255, 220, 0.5)' : 'rgba(255, 236, 236, 1)',
                                    width: 100,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    padding: '2px 3px'
                                }}
                            >
                                {cur.status}  
                            </p>  
                            </td>
                            <td> 
                                {getSymbolFromCurrency('NGN')} {cur.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        <BsThreeDotsVertical />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => staffToggle(cur.id, 'suspend')} style={{color: 'rgba(255, 178, 0, 1)'}}> Suspend account </Dropdown.Item>
                                        <Dropdown.Item onClick={() => staffToggle(cur.id, 'deactivate')} style={{color: 'rgba(195, 0, 0, 1)'}} > Deactive account </Dropdown.Item>
                                        <Dropdown.Item onClick={() => staffToggle(cur.id, 'restore')} style={{color: 'rgba(3, 166, 60, 1)'}} > Restore account </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </>
  )
}

export default CustomTable;