import { Link } from 'react-router-dom'

export default function Home() {
    return(
        <>
            <main>
                <section id='table-of-contents'>
                    <ul>
                        <li>Who am I?</li>
                        <li>My Projects</li>
                        <li>My Blog</li>
                        <li>Qualifications</li>
                    </ul>
                </section>
                <section id='intro'>
                    <div>
                        <h1>Hello! I am Ian Bentley, a software engineering graduate in California.</h1>
                        <p>
                            I received my Bachelor of Science in Software Engineering from Western Governor's 
                            University. I am super passionate about programming and am always striving to 
                            learn as much as I can on a daily basis. This website is for showcasing my work, 
                            you can find more information about this website in the following sections.
                        </p>
                    </div>
                    <img src='' alt='A photo of me; Ian Bentley'/>
                </section>
                <section id='projects-intro'>
                    <h1>Projects</h1>
                    <p>
                        All of my projects are posted on this website. You can view all of them in the Projects 
                        page. This page contains details about each project describing their purpose, the 
                        development process, and the technology used
                    </p>
                    <div id='project-list'>
                        <Link to='/projects'>View more</Link>
                    </div>
                </section>
                <section id='blog-intro'>
                    <h1>Blog</h1>
                    <p>
                        You can go to the Blog page to track any updates and view the history of not only this 
                        website, but also my learning journey and the progress of my projects.
                    </p>
                    <div id='blog-list'>
                        <Link to='/blog'>View more</Link>
                    </div>
                </section>
                <section id='qualifications'>
                    <h1>Qualifications</h1>
                    <div id='badge-grid'>
                        <img src='' alt='CompTIA Project+ badge'/>
                        <img src='' alt='AWS Certified Cloud Practitioner badge'/>
                        <img src='' alt='>CIW Site Development Associate badge'/>
                        <img src='' alt='CIW Advanced HTML5 & CSS3 Specialist badge'/>
                        <img src='' alt='WGU Back-End Developer badge'/>
                        <img src='' alt='WGU Front-End Developer badge'/>
                    </div>
                    <div class='.bubble-grid'>
                        <div>
                            <h3>Certifications</h3>
                            <ul>
                                <li><strong>Project+</strong> | CompTIA</li>
                                <li><strong>Certified Cloud Practitioner</strong> | Amazon Web Services</li>
                                <li><strong>Site Development Associate</strong> | CIW</li>
                                <li><strong>Advanced HTML5 & CSS3 Specialist</strong> | CIW</li>
                                <li><strong>Back-End Developer</strong> | Western Governor's University</li>
                                <li><strong>Front-End Developer</strong> | Western Governor's University</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Education</h3>
                            <ul>
                                <li><strong>Bachelor of Science, Software Engineering</strong> | Western Governor's University, Milcreek, UT</li>
                                <li><strong>Associate of Science, Computer Science and Information Systems</strong> | Grossmont College, El Cajon, CA</li>
                                <ul>
                                    <li>Awarded Certificate of Achievement in Computer Programming</li>
                                </ul>
                            </ul>
                        </div>
                        <div>
                            <h3>Work Experience</h3>
                            <p><strong>Help Desk Technician II</strong> | Anchor General Insurance</p>
                            <ul>
                                <li>Worked together with development and QA team to determine causes of issues with 
                                    our custom proprietary applications</li>
                                <li>Scripted automated processes to improve company workflow</li>
                                <li>Designed UI applications to improve department processes</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Key Skills</h3>
                            <div class='.bubble-grid'>
                                <div>C#</div>
                                <div>Java</div>
                                <div>SQL</div>
                                <div>PowerShell</div>
                                <div>JS</div>
                                <div>Git</div>
                                <div>React</div>
                                <div>.Net Web API</div>
                                <div>Azure</div>
                                <div>Tailwind</div>
                                <div>Sanity</div>
                                <div>SSMS</div>
                                <div>VS Code</div>
                                <div>Visual Studio</div>
                                <div>IntelliJ</div>
                                <div>MS Access</div>
                                <div>GitHub</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}