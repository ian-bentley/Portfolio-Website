import { Link } from 'react-router-dom'

export default function ProjectCard(props) {
    return (
        <>
            <div className='w-96 m-4 p-4'>
                <h3 className='p-4 text-xl font-semibold'>{props.title}</h3>
                <img className='p-4'
                src={props.imageUrl} alt={props.imageAlt}/>
                <p className='p-4'>{props.description}</p>
                <Link className='border-2 rounded-md bg-gray-200 p-1 px-4 block m-auto w-28 text-center'
                to={'/projects/project/'+props.slug}>See more</Link>
            </div>
        </>
    )
}