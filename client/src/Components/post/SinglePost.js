import React, { useContext, useEffect } from 'react'

import PostContext from '../../Context/posts/postContext';
import { Spinner } from 'react-bootstrap'
import Moment from 'react-moment'

import ReactHtmlParser from 'react-html-parser'
const SinglePost = (props) => {

    const postContext = useContext(PostContext);
    const { getSinglePost, singlePost } = postContext;
    useEffect(() => {
        (function () {
            getSinglePost(props.match.params.id)
        })()

        //eslint-disable-next-line
    }, [])

      

    const textToAudio = () => {
        let msg = singlePost.info;
        let speech = new SpeechSynthesisUtterance();
        speech.lang = "en-US";
        
        speech.text = msg;
        speech.volume = 1;
        speech.rate = 0.8;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech)
    }

    const AudioCancel = () => {
        window.speechSynthesis.cancel();
    }

    if (singlePost !== null) {
        // console.log(singlePost.title)
        const { info, title, image, user, _id, date } = singlePost

        return (
            <div className="container w-75 shadow" style={{marginTop:"4.0rem"}}>
                
                <div className="row">
                    <div>
                        < h2 className="display-3">{title}</h2>
                        <p className="lead">by {}<span className="text-muted">{user.name}</span> </p>
                        <p className="lead">Posted on <span className="text-muted"><Moment format="DD/MM/YYYY">
                            {date}
                        </Moment>
                        </span>
                        </p>
                    </div>
                     <div>
                    <button className="btn btn-sm btn-default" onClick={textToAudio}>Listen</button>
                    <button className="btn btn-sm btn-default" onClick={AudioCancel}>Cancel</button>
                    </div>
                    <div className="d-block h-25" >
                        <img className="img-fluid max-width:100%" src={image} alt={_id} />
                    </div>
                    <div className="lead text-justify mt-4">{ReactHtmlParser(info)}</div>
                </div>
            </div>
        )

    }
    return <Spinner animation="border" variant="dark" />
}




export default SinglePost
