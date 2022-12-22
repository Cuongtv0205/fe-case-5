import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../../services/userService";
import {Field, Form, Formik} from "formik";
import {addBlog} from "../../../services/blogsService";
import {useEffect, useState} from "react";
import {storage} from "../../../firebase";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";

export default function AddBlog() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        console.log('abc',state.user)
        return state.user.user
    })

    const [submitting, setSubmitting] = useState(false)
    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");
    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImg(url)
                setSubmitting(false)
            });
        })

    };
    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    const handleAdd = (values) => {
        console.log(values)
        let data = {
            ...values,userId:user.user.id,image:img,
            createTime: (new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate())
        }
        dispatch(addBlog(data))
        navigate('/home')
    }
    return (

        <div className={'row'}>
            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Add Blog</h1>
                <Formik initialValues={{title: '', image: imageUrls, status: '', createTime: '', description: ''}}
                        onSubmit={(values) => {
                            handleAdd(values)
                        }}>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title</label>
                            <Field type="text" className={'form-control'} name={'title'}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Image</label>
                            <Field name={'image'} type={'file'} onChange={(event) => {
                                setSubmitting(true)
                                uploadFile(event.target.files[0])
                            }}/>
                        </div>
                        <div className="form-group">
                            <Field as="select" name="status">
                                <option disabled value="">Private</option>
                                <option value='1'>Public</option>
                                <option value='2'>Friend</option>
                            </Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Description</label>
                            <Field as={"textarea"} className={'form-control'} name={'description'}/>
                        </div>
                        <button type="submit" disabled={submitting} className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
