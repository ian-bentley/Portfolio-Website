import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { client } from '../../sanityClient'

export default function Projects() {
    const sanityErrorMessage = "Error: There was a problem getting the project data. Please refresh and try again. If the problem persists, please contact the wbesite administrator"
    const [projects, setProjects] = useState(null)
    const [hasSanityError, setHasSanityError] = useState(false)

    useEffect(()=>{
        getProjects()
    })

    const getProjects = () => {
        client.fetch(
            `*[_type == "project" && !(_id in path('drafts.**'))]{
                title,
                slug,
                description,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
            }`
        )
        .then(data=>setProjects(data))
        .catch(()=>{
            console.error(sanityErrorMessage)
            setHasSanityError(true)
        })
    }

    if (!projects) return <div>{hasSanityError? <p className='text-red-600'>{sanityErrorMessage}</p> : "Loading..."}</div>

    if (projects.length == 0) return <div>No projects yet! Stay tuned!</div>

    return (
        <>
            <main className='pt-20 flex flex-wrap justify-center'>
                {projects && projects.map((project,index)=>(
                    <ProjectCard
                    key={index}
                    title={project.title}
                    imageUrl={project.mainImage.asset.url}
                    imageAlt={project.mainImage.alt}
                    description={project.description}
                    slug={project.slug.current}
                    />
                ))}
            </main>
        </>
    )
}