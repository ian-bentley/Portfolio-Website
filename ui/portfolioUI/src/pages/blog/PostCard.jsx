import { Link } from "react-router-dom"

export default function PostCard(props) {
    return (
        <>
            <div className='pb-8'>
                <img className='pb-4'
                src={props.imageUrl} alt={props.imageAlt}/>
                <h3 className='font-semibold text-2xl pb-4'>{props.title}</h3>
                <p className='pb-4'>{props.description}</p>
                <Link className='font-semibold underline'
                to={'/blog/posts/'+props.slug}>Read more</Link>
            </div>
        </>
    )
}