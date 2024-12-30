import { Link } from 'react-router-dom'

export default function Home() {
    const skillList = [
        'C#', 'SQL', 'PowerShell', 'JS', 'Git', 'React', '.Net API', 'Azure', 'Tailwind',
        'Sanity', 'SSMS', 'VS Code', 'Visual Studio', 'IntelliJ', 'MS Access', 'GitHub'
    ]

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
                    <img src='src/imgs/me.jpg' alt='A photo of me; Ian Bentley' className='pb-6     px-6 max-w-80 m-auto'/>
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
                    <p>
                        All of my projects are posted on this website. You can view all of them in the Projects 
                        page. This page contains details about each project describing their purpose, the 
                        development process, and the technology used
                    </p>
                    <div id='project-list'>
                        <Link to='/projects'>View more</Link>
                    </div>
                </section>
                <section id='blog-intro' className='pb-16'>
                    <h1 className='text-2xl font-semibold pb-4'>Blog</h1>
                    <p>
                        You can go to the Blog page to track any updates and view the history of not only this 
                        website, but also my learning journey and the progress of my projects.
                    </p>
                    <div id='blog-list'>
                        <Link to='/blog'>View more</Link>
                    </div>
                </section>
                <section id='qualifications' className='pb-10'>
                    <h1 className='text-2xl font-semibold pb-4'>Qualifications</h1>
                    <div className='m-auto max-w-96'>
                        <img src='' alt='CompTIA Project+ badge'/>
                        <img src='' alt='AWS Certified Cloud Practitioner badge'/>
                        <img src='' alt='>CIW Site Development Associate badge'/>
                        <img src='' alt='CIW Advanced HTML5 & CSS3 Specialist badge'/>
                        <img src='' alt='WGU Back-End Developer badge'/>
                        <img src='' alt='WGU Front-End Developer badge'/>
                    </div>
                    <div>
                        <div className='border-2 border-black rounded-3xl p-2 [@media(min-width:368px)]:w-[320px] m-auto  mb-5'>
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
                        <div className='border-2 border-black rounded-3xl p-4 [@media(min-width:368px)]:w-[320px] m-auto  mb-5'>
                            <h3 className='font-bold pb-2'>Education</h3>
                            <ul className='list-disc pl-8 text-xs'>
                                <li><strong>Bachelor of Science, Software Engineering</strong> | Western Governor's University, Milcreek, UT</li>
                                <li><strong>Associate of Science, Computer Science and Information Systems</strong> | Grossmont College, El Cajon, CA</li>
                                <ul>
                                    <li>Awarded Certificate of Achievement in Computer Programming</li>
                                </ul>
                            </ul>
                        </div>
                        <div className='border-2 border-black rounded-3xl p-4 [@media(min-width:368px)]:w-[320px] m-auto  mb-5'>
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
                                {skillList.map(skill=>
                                    <div className='border-2 border-black rounded-md p-1 m-0.5'>{skill}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}