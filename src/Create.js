import { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';
const Create = () => {
    const [title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsPending(true);

        axios.post("http://localhost:8000/blogs",{title,body,author}).then(()=>{
             setIsPending(false);
             history.push('/');
         })

    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text"required value={title} onChange={(e) => setTitle(e.target.value)}/>

                <label>Blog Content</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <label>Blog Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Adding Blog...</button>}
            </form>
        </div>
      );
}
 
export default Create;