import { useParams } from "react-router-dom"


export default function Post() {
    const { slug } = useParams()

    return (
        <>
            <img src='' alt='An image of the post'/>
            <h1>Post Title</h1>
            <p>By The Author</p>
            <div>REPLACE WITH BLOCK CONTENT</div>
        </>
    )
}