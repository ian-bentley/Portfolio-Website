import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../sanityClient'
import ProjectCard from '../projects/ProjectCard'
import PostCard from '../blog/PostCard'
import projectPlus from '../imgs/comptia-project-plus.png';
import aws from '../imgs/aws-cloud-practitioner.png';
import ciwDev from '../imgs/ciw-site-dev-asoc.jpg';
import ciwHtmlCss from '../imgs/ciw-html-css.jpg';
import wguBackend from '../imgs/wgu-backend-developer.webp';
import wguFrontend from '../imgs/wgu-frontend-developer.webp';
import mePng from '../imgs/me.jpg'

export default function Home() {
    const sanityPostErrorMessage = "Error: There was a problem getting the post data. Please refresh and try again. If the problem persists, please contact the wbesite administrator"
    const sanityProjectErrorMessage = "Error: There was a problem getting the project data. Please refresh and try again. If the problem persists, please contact the wbesite administrator"
    const skillList = [
        'C#', 'SQL', 'PowerShell', 'JS', 'Git', 'React', '.Net API', 'Azure', 'Tailwind',
        'Sanity', 'SSMS', 'VS Code', 'Visual Studio', 'IntelliJ', 'MS Access', 'GitHub'
    ]
    const [projects, setProjects] = useState(null)
    const [posts, setPosts] = useState(null)
    const [hasPostSanityError, setHasPostSanityError] = useState(false)
    const [hasProjectSanityError, setHasProjectSanityError] = useState(false)

    useEffect(()=>{
        getProjects()
        getPosts()
    }, [])

    const getProjects = () => {
        client.fetch(
            `*[_type == "project"  && !(_id in path('drafts.**'))][0..1]{
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
            console.error(sanityProjectErrorMessage)
            setHasProjectSanityError(true)
        })
    }

    const getPosts = () => {
        client.fetch(
            `*[_type == "post" && !(_id in path('drafts.**'))][0..1]{
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
        .then(data=>setPosts(data))
        .catch(()=>{
            console.error(sanityPostErrorMessage)
            setHasPostSanityError(true)
        })
    }

    return(
        <>
            <main>
                <section id='table-of-contents' className='pl-8 pt-10'>
                    <ul className='list-disc list-inside'>
                        <li className='text-sm'>Who am I?</li>
                        <li className='text-sm'>My Projects</li>
                        <li className='text-sm'>My Blog</li>
                        <li className='text-sm'>Qualifications</li>
                    </ul>
                </section>
                <section id='intro' className='py-16 sm:flex sm:flex-row-reverse'>
                    <img src={mePng} alt='A photo of me; Ian Bentley' className='pb-6 px-6 max-w-80 m-auto'/>
                    <div className='sm:pr-10'>
                        <h1 className='text-2xl font-semibold pb-4'>Hello! I am Ian Bentley, a software engineering graduate in California.</h1>
                        <p>
                            I received my Bachelor of Science in Software Engineering from Western Governor's 
                            University. I am super passionate about programming and am always striving to 
                            learn as much as I can on a daily basis. This website is for showcasing my work, 
                            you can find more information about this website in the following sections.
                        </p>
                    </div>
                </section>
                <section id='projects-intro' className='pb-16'>
                    <h1 className='text-2xl font-semibold pb-4'>Projects</h1>
                    <p className='pb-10'>
                        All of my projects are posted on this website. You can view all of them in the Projects 
                        page. This page contains details about each project describing their purpose, the 
                        development process, and the technology used
                    </p>
                    <div className='flex flex-col items-center [@media(min-width:890px)]:flex-row [@media(min-width:890px)]:flex-wrap [@media(min-width:890px)]:justify-center'>
                        {projects && projects.map((project, index)=>(
                            <ProjectCard
                            key={index}
                            title={project.title}
                            imageUrl={project.mainImage.asset.url}
                            imageAlt={project.mainImage.alt}
                            description={project.description}
                            slug={project.slug.current}/>
                        ))}
                        {projects && projects.length == 0 && <p>No projects yet. Stay tuned!</p>}
                        {hasProjectSanityError && <p className='text-red-600'>{sanityProjectErrorMessage}</p>}  
                        {projects && projects.length != 0 && <Link 
                            className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 px-4 p-1'
                            to='/projects'>
                                View more
                        </Link>}
                    </div>
                </section>
                <section id='blog-intro' className='pb-16'>
                    <h1 className='text-2xl font-semibold pb-4'>Blog</h1>
                    <p className='pb-10'>
                        You can go to the Blog page to track any updates and view the history of not only this 
                        website, but also my learning journey and the progress of my projects.
                    </p>
                    <div className='flex flex-col items-center [@media(min-width:890px)]:flex-row [@media(min-width:890px)]:flex-wrap [@media(min-width:890px)]:justify-center'>
                        {posts && posts.map((post, index)=>(
                            <div
                            className='w-80 m-8'
                            key={index}>
                                <PostCard
                                title={post.title}
                                imageUrl={post.mainImage.asset.url}
                                imageAlt={post.mainImage.alt}
                                description={post.description}
                                slug={post.slug.current}/>
                            </div>
                        ))}
                        {posts && posts.length == 0 && <p>No posts yet. Stay tuned!</p>}
                        {hasPostSanityError && <p className='text-red-600'>{sanityPostErrorMessage}</p>} 
                        {posts && posts.length != 0 && 
                        <Link 
                        className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 px-4 p-1'
                        to='/blog'>
                            View more
                        </Link>}
                    </div>
                </section>
                <section id='qualifications' className='pb-20'>
                    <h1 className='text-2xl font-semibold pb-4'>Qualifications</h1>
                    <div className='m-auto max-w-96 grid grid-rows-2 grid-cols-3 pb-8 px-4'>
                        <img src={projectPlus} alt='CompTIA Project+ badge'/>
                        <img src={aws} alt='AWS Certified Cloud Practitioner badge'/>
                        <img src={ciwDev} alt='CIW Site Development Associate badge'/>
                        <img src={ciwHtmlCss} alt='CIW Advanced HTML5 & CSS3 Specialist badge'/>
                        <img src={wguBackend} alt='WGU Back-End Developer badge'/>
                        <img src={wguFrontend} alt='WGU Front-End Developer badge'/>
                    </div>
                    <div className='[@media(min-width:740px)]:grid [@media(min-width:740px)]:grid-cols-2'>
                        <div className='border-2 border-black rounded-3xl p-2 [@media(min-width:368px)]:w-[320px] mb-5 m-auto'>
                            <h3 className='font-bold pb-2'>Certifications</h3>
                            <ul className='list-disc pl-8 text-xs'>
                                <li><strong>Project+</strong> | CompTIA</li>
                                <li><strong>Certified Cloud Practitioner</strong> | Amazon Web Services</li>
                                <li><strong>Site Development Associate</strong> | CIW</li>
                                <li><strong>Advanced HTML5 & CSS3 Specialist</strong> | CIW</li>
                                <li><strong>Back-End Developer</strong> | Western Governor's University</li>
                                <li><strong>Front-End Developer</strong> | Western Governor's University</li>
                            </ul>
                        </div>
                        <div className='border-2 border-black rounded-3xl p-4 [@media(min-width:368px)]:w-[320px] mb-5 m-auto'>
                            <h3 className='font-bold pb-2'>Education</h3>
                            <ul className='list-disc pl-8 text-xs'>
                                <li><strong>Bachelor of Science, Software Engineering</strong> | Western Governor's University, Milcreek, UT</li>
                                <li><strong>Associate of Science, Computer Science and Information Systems</strong> | Grossmont College, El Cajon, CA</li>
                                <ul>
                                    <li>Awarded Certificate of Achievement in Computer Programming</li>
                                </ul>
                            </ul>
                        </div>
                        <div className='border-2 border-black rounded-3xl p-4 [@media(min-width:368px)]:w-[320px] mb-5 m-auto'>
                            <h3 className='font-bold pb-2'>Work Experience</h3>
                            <p className='text-xs'><strong>Help Desk Technician II</strong> | Anchor General Insurance</p>
                            <ul className='list-disc pl-8 text-xs'>
                                <li>Worked together with development and QA team to determine causes of issues with 
                                    our custom proprietary applications</li>
                                <li>Scripted automated processes to improve company workflow</li>
                                <li>Designed UI applications to improve department processes</li>
                            </ul>
                        </div>
                        <div className='border-2 border-black rounded-3xl p-4 [@media(min-width:368px)]:w-[320px] m-auto'>
                            <h3 className='font-bold pb-2'>Key Skills</h3>
                            <div className='flex text-xs flex-wrap'>
                                {skillList.map((skill,index)=>(
                                    <div key={index} className='border-2 border-black rounded-md p-1 m-0.5'>{skill}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}