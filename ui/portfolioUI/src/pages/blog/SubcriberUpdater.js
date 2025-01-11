import { client } from '../../sanityClient'
import config from '../../../portfolio.config.json'

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const query = `*[_type == "post"]`
// const params = {visibility: "query"} // Wait until post is visibile to queries to run the function
// client.listen(query).subscribe(update=>{
//     if (update.transition == "appear") { 
//         console.log(update)
//     }
// })
client.listen(query).subscribe(async update=>{
    if (update.transition == "appear") { // We only want to update when posts are created, not when updated or removed
        await wait(5000)
        console.log("Listener: Waited 5s after detecting a new post")
        console.log(update)

        client.fetch(`*[ _type == "post" && _id == "${update.documentId}"] {
                title,
                slug,
                "authorName": author->name,
                description,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
            }`)
        .then(data=>{
            const newPost = data[0]
            console.log(newPost)
            console.log('Title: '+newPost.title)
            console.log('Slug: '+newPost.slug.current)
            console.log('Author: '+newPost.authorName)
            console.log('Description: '+newPost.description)
            console.log('Image URL: '+newPost.mainImage.asset.url)
            console.log('Image alt: '+newPost.mainImage.alt)

            fetch(config.api.url+'Email/NotifySubscribers', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({
                    title: newPost.title,
                    link: 'http://localhost:5173/blog/posts/'+newPost.slug.current,
                    author: newPost.authorName,
                    description: newPost.description,
                    imageUrl: newPost.mainImage.asset.url,
                    imageAlt: newPost.mainImage.alt
                })
            }).then(res=> {
                if (!res.ok) {
                    throw res.status
                }
                console.log(res)
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    }
})