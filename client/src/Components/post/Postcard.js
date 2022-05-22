import React  from 'react'
import './postcard.css'
import Moment from 'react-moment'
// import ReactHtmlParser from 'react-html-parser'
import {Link} from 'react-router-dom'

const Postcard = ({image , title ,date, id  }) => {
     

    return (
        <div className="container shadow">
            <div className="row row-cols-sm-2 row-cols-md-2 mx-auto mt-4">
                <div className="col">
                    <h1 className="text-wrap Capatilize">{title}</h1>
                    {/* <p className="text-justify text-break text-truncate font-weight-light">{ReactHtmlParser(info)}</p> */}
                    <div className="btn-group mt-4" role="group" aria-label="Basic example">

                        <Link to={`/posts/${id}`} className="btn btn-inline-block btn-outline-success ml-2" >Read</Link>
                    </div>
                    <div className="pl-2 pt-4">
                        <p>Created At: <span> <Moment format="DD/MM/YYYY">
                            {date}
                        </Moment></span> </p>
                    </div>
                </div>
                <div className=" ml-auto" style={{ width: "300px" }} >
                   <img className="img-thumbnail" src={image} alt={id} />
                </div>
            </div>
            <br />
        </div>
    )
}



export default Postcard
