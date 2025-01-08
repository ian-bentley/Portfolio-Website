import { Link } from "react-router-dom"

export default function PostCard(props) {
    return (
        <>
            <div className='pb-8'>
                <img className='pb-4'
                src={props.imageUrl} alt={props.imageAlt}/>
                <h3 className='font-semibold text-2xl'>{props.title}</h3>
                <p className='italic pb-2'>By {props.author}</p>
                <p> Posted on {props.date}</p>
                <p className='pb-2'>{props.description}</p>
                <Link className='font-semibold underline hover:text-blue-600'
                to={'/blog/posts/'+props.slug}>Read more</Link>
            </div>
        </>
    )
}