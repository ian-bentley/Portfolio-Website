import { useParams, Link } from "react-router-dom"
import PostCard from "../../blog/PostCard"

export default function Project() {
    const { slug } = useParams()

    return (
        <>
            <ul>
                <li>Details</li>
                <li>Development</li>
            </ul>
            <h1>Project Title</h1>
            <img src='' alt='A photo of the project'/>
            <div id='roject-links'>
                <a href=''>View project</a>
                <a href=''>View on GitHub</a>
            </div>
            <h2>Details</h2>
            <div>CHANGE TO BLOCK CONTENT</div>
            <h2>Development</h2>
            <div>CHANGE TO BLOCK CONTENT</div>
            <div id='links-to-posts'>
                <div id='list-of-posts'>
                    <PostCard
                    title='Post title'
                    imageUrl=''
                    imageAlt='Blog post image'
                    description='A short decription of the post'
                    slug='post-1'/>
                </div>
                <Link to='/blog'>See more</Link>
            </div>
        </>
    )
}