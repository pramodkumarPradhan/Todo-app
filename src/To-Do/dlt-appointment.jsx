import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function TodoAppointmentDlt() {
    let params = useParams();

    let Navigate = useNavigate();
    const [appointment, setappointment] = useState({ id: '', title: '', date: '', userid: '' })

    useEffect(() => {
        axios.get(`http://localhost:4000/Assignment/${params.id}`)
            .then(response => {
                setappointment(response.data)
            })
    }, [params.id])

    function deleteAppointment() {
        axios.delete(`http://localhost:4000/Assignment/${params.id}`)
            .then(() => {
                console.log('deleted..');
            })
        Navigate('/dash-board')
    }
    return (
        <div className="container bg-light p-4 mt-5 rounded rounded-3" style={{ width: '100%', maxWidth: '600px' }}>
            <h4 className="text-center">Are You Sure Want To Delete This Appointment !!<div className="text-danger">{appointment.title}</div></h4>
            <div className="d-flex justify-content-center">
                <button onClick={deleteAppointment} className="btn btn-danger mx-2">Delete</button>
                <Link className="btn btn-warning text-white" to={'/dash-board'}>Back</Link>
            </div>
        </div>
    )
}