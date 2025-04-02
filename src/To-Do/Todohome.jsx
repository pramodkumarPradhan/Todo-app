import { Link } from "react-router-dom";

export function Todohome() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
            <Link to={'login'} className="mx-2 " ><button className="buttonLogin ">Login</button></Link>
            <Link to={'register'} ><button className="buttonResister">Resister</button></Link>
        </div>
    )
}