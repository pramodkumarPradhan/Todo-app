import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField,Button } from "@mui/material";
export function TodoAssignmentEdit() {
    const [Cookies,setCookies,removeCookies] = useCookies(['userid'])
    const [appointment, setappointment] = useState({ id: '', title: '', date: '', userid: '' })
    let params = useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            id: appointment.id,
            title: appointment.title, 
            date : appointment.date,
            userid: appointment.userid
        },
        onSubmit: (value) => {
            axios.put(`http://localhost:4000/Assignment/${params.id}`, value)
                .then(() => {
                    console.log('saved');
                })
            navigate('/dash-board');
        },
        enableReinitialize: true

    })

    useEffect(() => {
        axios.get(`http://localhost:4000/Assignment/${params.id}`)
            .then(response => {
                setappointment(response.data);
            })
    }, [params.id])

    return (
        <div className="container bg-light  p-4 mt-5 rounded rounded-3" style={{ width: '500px' }}>
            <div className="d-flex justify-content-between text-center">
                <div className="fs-3 ">Edit Appointment</div>
                <div><h3 className="bi bi-person-circle text-success"> {Cookies['userid']}</h3></div>
            </div>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    {/* <label htmlFor="title" className="form-label">Title</label> */}
                    <TextField label="Title" variant="standard" type="text" onChange={formik.handleChange} name="title"  value={formik.values.title} className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="date" className="form-label">Date</label> */}
                    <TextField  variant="standard" type="date" onChange={formik.handleChange} name="date" value={formik.values.date} className="form-control mt-3" id="date" />
                </div>
                <Button type="submit" variant="contained" className="btn btn-primary mx-2">Save</Button>
                <Link to="/dash-board" className="btn btn-danger">Back</Link>
            </form>
        </div>
    )
}