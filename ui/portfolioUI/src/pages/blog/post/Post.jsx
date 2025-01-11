import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { client } from "../../../sanityClient"
import SanityBlockContent from "@sanity/block-content-to-react"

export default function Post() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)

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
                "authorName": author->name,
            }`)
            .then(data=>setPost(data[0]))
            .catch(console.error)
    })

    if (!post) return <div>Loading...</div>

    return (
        <>
            <main className='py-10 px-4'>
                <article>
                    <header className='pb-4'>
                        <img
                        className='pb-4'
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt}/>
                        <div>
                            <h1 className='font-semibold text-3xl'>{post.title}</h1>
                            <p className='italic'>By {post.authorName}</p>
                        </div>
                    </header>
                    <div className='prose lg:prose-xl max-w-full'>
                        <SanityBlockContent
                        blocks={post.body}
                        projectId="zr1c570a"
                        dataset="production"
                        />
                    </div>
                </article>
            </main>
        </>
    )
}