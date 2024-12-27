import { Link } from 'react-router-dom'

export default function ProjectCard(props) {
    return (
        <>
            <h3>{props.title}</h3>
            <img src={props.imageUrl} alt={props.imageAlt}/>
            <p>{props.description}</p>
            <Link to={'/projects/project/'+props.slug}>See more</Link>
        </>
    )
}