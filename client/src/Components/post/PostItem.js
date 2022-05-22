import React, { useContext } from 'react'
import Moment from 'react-moment'
import PostContext from '../../Context/posts/postContext';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import '../../css/singlePost.css'

const PostItem = ({ title, image, id, date }) => {
    const postContext = useContext(PostContext);
    const { deletePost } = postContext;

    const deleteItem = () => {
        deletePost(id)
        
        toast.success("Post delete SuccessFully")
    }

   
    return (
        <div className="container shadow">
            <div className="row row-cols-sm-2 row-cols-md-2 mx-auto mt-4" style={{ boxShadow:"11px 21px 0 hsla(180,9%,98%,.12), 0 6px 11px 0 rgba(0,0,0,.09)"}}>
                <div className="col">
                    <h1 className="text-wrap Capatilize">{title}</h1>
                    {/* <p className="text-justify text-break text-truncate font-weight-light">{text}</p> */}
                    <div className="btn-group mt-4" role="group" aria-label="Basic example">

                        <Link to={`/posts/${id}`} className="btn btn-inline-block btn-outline-success ml-2" >Read</Link>
                        <Link to="/" className="btn btn-inline-block btn-outline-danger ml-2" onClick={deleteItem}>Delete</Link>
                    </div>
                    <div className="pl-2 pt-4">
                        <p>Created At: <span> <Moment format="DD/MM/YYYY">
                           {date}
                        </Moment></span> </p>
                    </div>
                </div>
                <div className=" ml-auto" style={{ width: "300px" }}>
                    <img className="img-thumbnail" src={image} alt={id} />
                </div>
            </div>
            <br />
        </div>
    )
}

export default PostItem
