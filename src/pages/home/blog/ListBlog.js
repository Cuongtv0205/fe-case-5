import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs} from "../../../services/blogsService";
import {loginUser} from "../../../services/userService";

export default function ListBlog() {
    const dispatch = useDispatch();
    const blogs = useSelector(state => {
        return state.blogs.blogs;
    })

    useEffect(() => {
        dispatch(getBlogs());
    }, [])
    return (
        <div className={'row'}>
            <div className="col-12">
                    {
                        blogs.map((item, ) => {
                                return (
                                    <tr>
                                        <hr/>
                                        <h3 style={{color:'yellow',position:"absolute"}} className={"text"}>{item.title}</h3>
                                        <img src={item.image} style={{width:300,height:300,objectFit:'cover'}}/><hr/>
                                    </tr>)
                        })
                    }
            </div>
        </div>
    )
}
