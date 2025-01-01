import { useParams, Link } from "react-router-dom"
import PostCard from "../../blog/PostCard"
import { useEffect, useState } from "react"
import { client } from "../../../sanityClient"
import SanityBlockContent from "@sanity/block-content-to-react"

export default function Project() {
    const { slug } = useParams()
    const [project, setProject] = useState(null)

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
            .then(data=>setProject(data[0]))
            .catch(console.error)
    })

    if (!project) return <div>Loading...</div>

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
            <div className='prose lg:prose-xl max-w-full pb-4'>
                <SanityBlockContent
                blocks={project.body}
                projectId="zr1c570a"
                dataset="production"
                />
            </div>
            <div id='links-to-posts' className='pb-20'>
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