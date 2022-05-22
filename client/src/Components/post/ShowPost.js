import React, { useEffect, useContext, useState } from 'react'
import PostItem from './PostItem'
import AuthContext from '../../Context/auth/authContext';
import PostContext from '../../Context/posts/postContext';
import { Spinner } from 'react-bootstrap'
const ShowPost = () => {
    const authContext = useContext(AuthContext)
    const postContext = useContext(PostContext);
    const { allposts, getData, loading, clearLoading , filterPost , filter ,  } = postContext
    const { isAuthenticated, user } = authContext;

    const id = user._id;

    const [text, setText] = useState('');
    
    useEffect(() => {
        getData(id)
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (loading) {
            clearLoading();
        }

        //eslint-disable-next-line
    }, [loading])

    if (!isAuthenticated) {
        return <h1>Access Denied...</h1>
    }

    
    
    const onChange = (e) => {
        //console.log(e.target.value)
        setText(e.target.value)
    }
    
    const submitForm = () => {
        filter(text)
    }
    

    return (
        <div className="container mt-4">
            <form className="container row" style={{marginTop:"80px"}}>
                <div className="form-group col-8">
                    <input className="form-control" value={text} onChange={onChange} placeholder="Search Post..." />
                </div>
                <div className="form-group col-4">
                    <input type="button" value="Search" onClick={submitForm} className="btn btn-block btn-dark" />
                </div>
            </form>
            {allposts.length === 0 ? <p className="pl-4  text-primary mt-2">You have no post to show , Create one </p> : ""}
            {loading ? <Spinner animation="border" variant="dark" /> : (
                filterPost !== null ? filterPost.map(post => <PostItem
                    key={post._id}
                    image={post.image}
                    title={post.title}
                    info={post.info}
                    date={post.date}
                    id={post._id}
                />) : allposts.map(post => <PostItem
                    key={post._id}
                    image={post.image}
                    title={post.title}
                    info={post.info}
                    date={post.date}
                    id={post._id}
                />)
            )}

        </div>
    )
}

export default ShowPost


    // (allposts.map(post => <PostItem
    //     key={post._id}
    //     image={post.image}
    //     title={post.title}
    //     info={post.info}
    //     date={post.date}
    //     id={post._id}
    // />))