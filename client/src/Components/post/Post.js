import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Context/auth/authContext'
import PostContext from '../../Context/posts/postContext'
//import AlertContext from '../../Context/alert/alertContext'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Post = () => {

    const authContext = useContext(AuthContext)
    const postContext = useContext(PostContext)
    //const alertContext = useContext(AlertContext)
    const { error, createPost, imageStatus, clearStatus } = postContext
    const { isAuthenticated } = authContext
    //const { setAlert } = alertContext

    const [event, setEvent] = useState({
        title: "",
        info: "",
        image: null,
    });

    const { info, title, image } = event
    let history = useHistory()

    useEffect(() => {
        if (error === "Post already with title") {
            // setAlert(error, 'danger')
            toast.error(error)
        }
    }, [error])

    useEffect(() => {
        if (imageStatus) {
            history.push('/')
            toast.success("Post Created")
            clearStatus()
            //clearStatus function make the imageStatus as false so that 
            //it can not be true 
        }

    })

    const TitleData = (e) => {
        e.preventDefault();
        //console.log(e.target.value)
        setEvent({ ...event, title: e.target.value })
    }



    const getImage = (e) => {
        e.preventDefault();
        setEvent({ ...event, image: e.target.files[0] })
    }



    const submitForm = (e) => {
       // console.log("e:",e)
        e.preventDefault();
        if (info === '' || title === "") {
            //setAlert('Fill All field', 'danger')
            toast.warn('All fields required')
        }
        const data = new FormData();
        data.append('image', image);
        data.append('info', info)
        data.append('title', title);
        createPost(data);
        // axios.post('/blog/create', data).then(res => {
        //     console.log(res.statusText)
        //     setState({ info: '', title: '', image: null, imageStatus: true })
        // }).catch(err => console.log(err.message))
    }

    if (!isAuthenticated) {
        return <h1>Not Authenticated...</h1>
    }



    const EditorData = (e, editor) => {
        const titleData = editor.getData();
        setEvent({ ...event, info: titleData })
    }

    return (
        <div className="container w-50  shadow global__margin" >
            <h2 className="text-center text-md">Add <span style={{color:"#0156ab"}}>Post</span></h2>
            <form  style={{ height: "350px" }} encType="multipart/form-data">
                <div className="form-group">
                    <label >Title</label>
                    <input type="text"
                        className="form-control"
                        name="title"
                        value={event.title || ''}
                        onChange={TitleData}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Write Content</label>

                    {/* <textarea className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="info"
                        onChange={onChange}

                        value={event.info} /> */}
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={EditorData}

                    />
                </div>
                <div className="custom-file mt-4">
                    <input type="file"
                        className="custom-file-input"
                        onChange={getImage}
                        name="image"
                    />
                  <span>size less than 2 mb</span>
                </div>
            
                <button onClick={submitForm} className="btn btn-primary btn-block mt-4">Submit</button>
            </form>

        </div>
    )
}

export default Post
