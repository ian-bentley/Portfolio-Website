import { useParams, Link, useNavigate } from "react-router-dom"
import PostCard from "../../blog/PostCard"
import { useEffect, useState } from "react"
import { client } from "../../../sanityClient"
import SanityBlockContent from "@sanity/block-content-to-react"

export default function Project() {
    const sanityErrorMessage = "Error: There was a problem getting the project data. Please refresh and try again. If the problem persists, please contact the wbesite administrator"
    const { slug } = useParams()
    const [project, setProject] = useState(null)
    const navigate = useNavigate()
    const [hasSanityError, setHasSanityError] = useState(false)

    useEffect(()=>{
        client.fetch(
            `*[slug.current == "${slug}"]{
                _id,
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                body,
                githubLink,
                projectLink,
            }`)
            .then(data=>{
                if (data[0] == null)
                {
                    navigate('/projects/404')
                }
                setProject(data[0])
            })
            .catch(()=>{ 
                console.error(sanityErrorMessage)
                setHasSanityError(true)
            })
    })

    if (!project) return <div>{hasSanityError? <p className='text-red-600'>{sanityErrorMessage}</p> : "Loading..."}</div>

    return (
        <>
            <section className='pl-8 py-10'>
                <ul className='list-disc'>
                    <li className='text-sm'>Details</li>
                    <li className='text-sm'>Development</li>
                </ul>
            </section>
            <h1 className='text-center font-semibold text-4xl pb-10'>{project.title}</h1>
            <img className='w-4/5 sm:w-[512px] m-auto pb-8'
            src={project.mainImage.asset.url} alt={project.mainImage.alt}/>
            <div id='project-links'
            className='flex justify-center'>
                <a className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 p-1 px-4 mx-4'
                href={project.projectLink}>
                View project</a>
                <a className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 p-1 px-4 mx-4'
                href={project.githubLink}>View on GitHub</a>
            </div>
            <div className='prose lg:prose-xl max-w-full pb-20'>
                <SanityBlockContent
                blocks={project.body}
                projectId="zr1c570a"
                dataset="production"
                />
            </div>
        </>
    )
}