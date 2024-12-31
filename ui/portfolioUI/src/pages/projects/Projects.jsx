import ProjectCard from './ProjectCard'

export default function Projects() {
    return (
        <>
            <main className='pt-20 flex flex-wrap justify-center'>
                <ProjectCard
                title='Project 1' 
                imageUrl='src/imgs/testing-img.jpg'
                imageAlt='Image of project 1'
                description='This is my project 1'
                slug='project-1'/>
                <ProjectCard 
                title='Project 2' 
                imageUrl='src/imgs/testing-img.jpg'
                imageAlt='Image of project 2'
                description='This is my project 2'
                slug='project-1'/>
                <ProjectCard 
                title='Project 3' 
                imageUrl='src/imgs/testing-img.jpg'
                imageAlt='Image of project 3'
                description='This is my project 3'
                slug='project-1'/>
                <ProjectCard 
                title='Project 4' 
                imageUrl='src/imgs/testing-img.jpg'
                imageAlt='Image of project 4'
                description='This is my project 4'
                slug='project-1'/>
                <ProjectCard 
                title='Project 5' 
                imageUrl='src/imgs/testing-img.jpg'
                imageAlt='Image of project 5'
                description='This is my project 5'
                slug='project-1'/>
                <ProjectCard 
                title='Project 6' 
                imageUrl='src/imgs/testing-img.jpg'
                imageAlt='Image of project 6'
                description='This is my project 6'
                slug='project-1'/>
            </main>
        </>
    )
}