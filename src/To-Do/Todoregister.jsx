import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Chiku from 'yup';
import { Button, TextField } from '@mui/material'

export function Todoregister() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userid: '',
            password: '',
            email: ''
        },
        validationSchema: Chiku.object({
            userid: Chiku.string().required("User Id is required:").min(4, "User Id must be atleast 4 characters"),
            password: Chiku.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
                .matches(/^(?=.*[A-Z])/, "Password must contain at least one capital letter")
                .matches(/^(?=.*[0-9])/, "Password must contain at least one number"), // Updated regex
            email: Chiku.string().email("Invalid Email").required("Email is required")
        }),
        onSubmit: (details) => {
            axios.post('http://localhost:4000/User', details)
                .then(response => {
                    navigate('/login')
                })
        }
    });

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center " style={{ height: '600px' }}>
                <form className="bg-form p-4 rounded rounded-4" style={{ width: '300px' }} onSubmit={formik.handleSubmit}  >
                    <h2>User Register</h2>
                    <dl>
                        {/* <dt><label className="fw-bold fs-5 text-success ">User Id</label></dt> */}
                        <dd><TextField type="text" variant="standard" name="userid" className="form-control" onChange={formik.handleChange} placeholder="Enter user id" label="Userid" /></dd>
                        <dd className="text-danger">{formik.errors.userid}</dd>
                        {/* <dt><label className="fw-bold fs-5 text-success ">Password</label></dt> */}
                        <dd><TextField type="password" variant="standard" name="password" className="form-control " onChange={formik.handleChange} placeholder="Enter password" label="password" /></dd>
                        <dd className="text-danger">{formik.errors.password}</dd>
                        {/* <dt><label className="fw-bold fs-5 text-success ">Email</label></dt> */}
                        <dd><TextField type="text" variant="standard" name="email" className="form-control " onChange={formik.handleChange} placeholder="Enter email" label="email" /></dd>
                        <dd className="text-danger">{formik.errors.email}</dd>
                    </dl>
                    <Button className=" mt-2 Resister type1"type="submit"></Button>
                    <div className="mt-5"><span className="fw-bold fs-5">Back to</span> <Link to='/login'><Button variant="contained" className="btn btn-warning" >Login</Button></Link></div>
                </form>
            </div>
        </div>
    )
}