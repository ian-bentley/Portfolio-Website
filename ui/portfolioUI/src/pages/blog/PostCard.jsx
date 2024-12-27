import { Link } from "react-router-dom"

export default function PostCard(props) {
    return (
        <>
            <img src={props.imageUrl} alt={props.imageAlt}/>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <Link to={'/blog/posts/'+props.slug}>Read more</Link>
        </>
    )
}