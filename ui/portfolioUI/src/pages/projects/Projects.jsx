import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { client } from '../../sanityClient'

export default function Projects() {
    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        getProjects()
    })

    const getProjects = () => {
        client.fetch(
            `*[_type == "project"]{
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
        .catch(console.error)
    }

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