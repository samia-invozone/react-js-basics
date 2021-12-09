import axios from "axios";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
const BlogDetails = () => {
    const {id} = useParams();
    const {data:blog, isPending, error} = useFetch("http://localhost:8000/blogs/" + id);
    const history = useHistory();

    const handleClick = ()=>{
        axios.delete("http://localhost:8000/blogs/" + blog.id,{
        }).then(()=>{
            history.push('/');
        })
    }
   return (  
<div className="blog-details">
    {isPending && <div>Loading... </div>}
    {error && <div>{error}</div>}
    {blog && (
        <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <p>{blog.body}</p>
            <button onClick={handleClick}>delete</button>
        </article>
    )}
</div>
    );
}
 
export default BlogDetails;