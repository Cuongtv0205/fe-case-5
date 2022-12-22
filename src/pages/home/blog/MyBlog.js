import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteBlog, getBlogs} from "../../../services/blogsService";

export default function MyBlog() {
    const blogs = useSelector(state => {
        console.log(state)
        return state.blogs.blogs;
    })
    const user = useSelector(state => {
        return state.user.user
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs());
    }, [])
    return (

        <div className={'row'}>
            <div className="col-12" style={{textAlign: "center"}}>
                <h1>My Blog</h1>
                <table className="table table-striped">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">CreateTime</th>
                        <th scope="col">IdUser</th>
                    </tr>

                    {blogs.map((item, index) => {
                        // if (item.userId === user.id){
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{new Date(item.createTime).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}</td>
                                <td>{item.userId}</td>
                                <button onClick={() => {
                                    dispatch(deleteBlog(item.blogs.id))
                                }}>Delete
                                </button>
                            </tr>
                        )
                    // }
                    })
                    }</table>
            </div>
        </div>
                )

}






