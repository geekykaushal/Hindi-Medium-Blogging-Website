import React , {useContext , useEffect} from 'react'
import PostContext from '../../Context/posts/postContext'
import './postcard.css'
import PostCard from './Postcard'
import { Spinner } from 'react-bootstrap'
const DashboardPost = () => {
    const postContext = useContext(PostContext)
    const { loading, allposts, GetAllPosts , clearLoading} = postContext
    
    useEffect(() => {
        GetAllPosts();
        
        //eslint-disable-next-line
    }, [])

     useEffect(() => {
        if (loading) {
            clearLoading();
        }

        //eslint-disable-next-line
    }, [loading])
   
    if(loading) {
          return <Spinner animation="border" variant="dark" />
    }
  
    
    return (
        <div className=" main__card " style={componetClass}>
             {allposts.map(post => <PostCard
             title={post.title}
             id={post._id}
             info={post.info}
             image={post.image}
             date={post.date}
             key={post._id.toString()}
              />)}
        </div>
    )
}

const componetClass = {
width: "80%",

zIndex: -1,
transform: "translate(-50 %, -50 %)",
left: "50%",
top: "110%",
margin:"60px auto",
boxShadow: "11px 21px 0 hsla(180,9%,98%,.12), 0 6px 11px 0 rgba(0,0,0,.09)",

}

export default DashboardPost
