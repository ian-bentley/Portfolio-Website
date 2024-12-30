import { Link } from 'react-router-dom'

export default function ProjectCard(props) {
    return (
        <>
            <div className='w-64 p-4'>
                <h3 className='text-xl font-semibold'>{props.title}</h3>
                <img src={props.imageUrl} alt={props.imageAlt}/>
                <p>{props.description}</p>
                <Link to={'/projects/project/'+props.slug}>See more</Link>
            </div>
        </>
    )
}