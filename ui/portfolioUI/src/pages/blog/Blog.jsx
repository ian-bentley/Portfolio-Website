import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import SubscribePopup from './SubcribePopup'
import { client } from '../../sanityClient'

export default function Blog() {
    const sanityErrorMessage = "Error: There was a problem getting the post data. Please refresh and try again. If the problem persists, please contact the wbesite administrator"
    const [showPopup, setShowPopup] = useState(null)
    const [posts, setPosts] = useState(null)
    const [hasSanityError, setHasSanityError] = useState(false)

    // search bar text
    const [searchText, setSearchText] = useState('')

    // tags checkbox states
    const [isCheckedHTML, setIsCheckedHTML] = useState(false)
    const [isCheckedCSS, setIsCheckedCSS] = useState(false)
    const [isCheckedJavaScript, setIsCheckedJavaScript] = useState(false)
    const [isCheckedCSharp, setIsCheckedCSharp] = useState(false)
    const [isCheckedJava, setIsCheckedJava] = useState(false)
    const [isCheckedSQL, setIsCheckedSQL] = useState(false)
    const [isCheckedReact, setIsCheckedReact] = useState(false)
    const [isCheckedNetAPI, setIsCheckedNetAPI] = useState(false)
    const [isCheckedTailwind, setIsCheckedTailwind] = useState(false)

    // categories checkbox states
    const [isCheckedDevUpdate, setIsCheckedDevUpdate] = useState(true)
    const [isCheckedPatchNotes, setIsCheckedPatchNotes] = useState(true)
    const [isCheckedCodingTalks, setIsCheckedCodingTalks] = useState(true)

    //date ranges text
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(()=>{
        getPosts()
    }, [searchText, isCheckedHTML, isCheckedCSS, isCheckedJavaScript, isCheckedCSharp, isCheckedJava,
        isCheckedSQL, isCheckedReact, isCheckedNetAPI, isCheckedTailwind, isCheckedDevUpdate, 
        isCheckedPatchNotes, isCheckedCodingTalks, startDate, endDate])

    const getPosts = () => {

        // Set tags array
        const tags = []
        if (isCheckedHTML) tags.push("HTML")
        if (isCheckedCSS) tags.push("CSS")
        if (isCheckedJavaScript) tags.push("JavaScript")
        if (isCheckedCSharp) tags.push("C#")
        if (isCheckedJava) tags.push("Java")
        if (isCheckedSQL) tags.push("SQL")
        if (isCheckedReact) tags.push("React")
        if (isCheckedNetAPI) tags.push(".Net Web API")
        if (isCheckedTailwind) tags.push("Tailwind")
        
        // Set tags count
        const tagsCount = tags.length

        // Set categories array
        const categories = []
        if (isCheckedDevUpdate) categories.push("Dev Update")
        if (isCheckedPatchNotes) categories.push("Patch Notes")
        if (isCheckedCodingTalks) categories.push("Coding Talks")

        const query = `*[_type == "post" && !(_id in path('drafts.**'))
                            && title match "*${searchText}*" 
                            && count((tags[]->title)[@ in $tags]) == $tagsCount
                            && count((categories[]->title)[@ in $categories]) > 0
                            && ($startDate == '' || publishedAt > $startDate)
                            && ($endDate == '' || publishedAt < $endDate)] | order(publishedAt desc) {
                title,
                "authorName": author->name,
                slug,
                description,
                publishedAt,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
            }`
        client.fetch(
            query, {tags, tagsCount, categories, startDate, endDate}
        )
        .then(data=>setPosts(data))
        .catch(()=>{
            console.error(sanityErrorMessage)
            setHasSanityError(true)
        })
    }

    return (
        <>
            <main className='pb-10'>
                <div id='subscribe-banner' className='flex flex-wrap justify-end py-10'>
                    <span className='pb-4'>Want to keep up with the latest posts?</span>
                    <button className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 p-1 px-4 mx-4'
                    onClick={()=>setShowPopup(true)}>SUBSCRIBE</button>
                </div>
                <SubscribePopup 
                isOpen={showPopup}
                Close={()=>setShowPopup(false)}/>
                <div className='pb-4 flex max-w-xl'>
                    <span className='pr-4'>Search</span>
                    <input 
                    className='border-2 rounded-sm grow mr-4'
                    type='text' 
                    id='search-text' 
                    placeholder='Search for titles here...'
                    value={searchText} 
                    onChange={(event)=>{
                        setSearchText(event.target.value)
                    }}/>
                </div>
                <section className='lg:flex'>
                    <form id='filter' className='max-w-96 lg:max-w-60'>
                        <span>Filter results</span>
                        <fieldset className='border-2 p-4'>
                            <fieldset className='pb-4'>
                                <label htmlFor='tags'>Tags</label>
                                <div className='flex flex-wrap'>
                                    <div className='pr-4'>
                                        <div>
                                            <input
                                            type='checkbox'
                                            name='tags'
                                            id='html-tag'
                                            checked={isCheckedHTML}
                                            onChange={(event)=>{
                                                setIsCheckedHTML(event.target.checked)
                                            }}/>
                                            <label>HTML</label>
                                        </div>
                                        <div>
                                            <input type='checkbox'
                                            name='tags'
                                            id='css-tag'
                                            checked={isCheckedCSS}
                                            onChange={(event)=>{
                                                setIsCheckedCSS(event.target.checked)
                                            }}/>
                                            <label>CSS</label>
                                        </div>
                                        <div>
                                            <input
                                            type='checkbox'
                                            name='tags'
                                            id='javascript-tag'
                                            checked={isCheckedJavaScript}
                                            onChange={(event)=>{
                                                setIsCheckedJavaScript(event.target.checked)
                                            }}/>
                                            <label>JavaScript</label>
                                        </div>
                                        <div>
                                            <input type='checkbox'
                                            name='tags'
                                            id='c#-tag'
                                            checked={isCheckedCSharp}
                                            onChange={(event)=>{
                                                setIsCheckedCSharp(event.target.checked)
                                            }}/>
                                            <label>C#</label>
                                        </div>
                                        <div>
                                            <input 
                                            type='checkbox'
                                            name='tags' 
                                            id='java-tag' 
                                            checked={isCheckedJava}
                                            onChange={(event)=>{
                                                setIsCheckedJava(event.target.checked)
                                            }}/>
                                            <label>Java</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <input type='checkbox' 
                                            name='tags' 
                                            id='sql-tag' 
                                            checked={isCheckedSQL}
                                            onChange={(event)=>{
                                                setIsCheckedSQL(event.target.checked)
                                            }}/>
                                            <label>SQL</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' 
                                            name='tags' 
                                            id='react-tag' 
                                            checked={isCheckedReact}
                                            onChange={(event)=>{
                                                setIsCheckedReact(event.target.checked)
                                            }}/>
                                            <label>React</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' 
                                            name='tags' 
                                            id='net-web-api-tag'
                                            checked={isCheckedNetAPI}
                                            onChange={(event)=>{
                                                setIsCheckedNetAPI(event.target.checked)
                                            }}/>
                                            <label>.NET Web API</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' 
                                            name='tags' 
                                            id='tailwind-tag' 
                                            onChange={(event)=>{
                                                setIsCheckedTailwind(event.target.checked)
                                            }}/>
                                            <label>Tailwind</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className='pb-4'>
                            <label htmlFor='categories'>Categories</label>
                                <div className='flex flex-wrap lg:flex-col'>
                                    <div className='pr-2'>
                                        <input 
                                        type='checkbox' 
                                        name='categories' 
                                        id='dev-update-category' 
                                        checked={isCheckedDevUpdate}
                                        onChange={(event)=>{
                                            setIsCheckedDevUpdate(event.target.checked)
                                        }}/>
                                        <label>Dev update</label>
                                    </div>
                                    <div className='pr-2'>
                                        <input type='checkbox' 
                                        name='categories' 
                                        id='patch-notes-category' 
                                        checked={isCheckedPatchNotes}
                                        onChange={(event)=>{
                                            setIsCheckedPatchNotes(event.target.checked)
                                        }}/>
                                        <label>Patch notes</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' 
                                        name='categories' 
                                        id='coding-talks-category' 
                                        checked={isCheckedCodingTalks}
                                        onChange={(event)=>{
                                            setIsCheckedCodingTalks(event.target.checked)
                                        }}/>
                                        <label>Coding talks</label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <label htmlFor='date-range'>Date range</label>
                                <div className='flex flex-wrap pt-2'>
                                    <div className='flex justify-between mr-8 w-full max-w-44'>
                                        <label htmlFor='start-date' className='pr-2'>After</label>
                                        <input 
                                        className='border-2 rounded-sm w-28'
                                        type='text' 
                                        id='start-date'
                                        value={startDate} 
                                        placeholder='YYYY/MM/DD'
                                        onChange={(event)=>{
                                            setStartDate(event.target.value)
                                        }}/>
                                    </div>
                                    <div className='flex justify-between mr-8 w-full max-w-44'>
                                        <label htmlFor='end-date' className='pr-2'>Before</label>
                                        <input 
                                        className='border-2 rounded-sm w-28'
                                        type='text' 
                                        id='end-date'
                                        value={endDate} 
                                        placeholder='YYYY/MM/DD'
                                        onChange={(event)=>{
                                            setEndDate(event.target.value)
                                        }}/>
                                    </div>
                                </div>
                            </fieldset>
                        </fieldset>
                    </form>
                    <div id='post-list' className='px-6 pt-10'>
                        {!posts && <div>{hasSanityError? "Loading..." : <p className='text-red-600'>{sanityErrorMessage}</p>}</div>}
                        {posts && posts.map((post,index)=>(
                            <PostCard
                            key={index}
                            title={post.title}
                            author={post.authorName}
                            date={post.publishedAt}
                            imageUrl={post.mainImage.asset.url}
                            imageAlt={post.mainImage.alt}
                            description={post.description}
                            slug={post.slug.current}/>
                        ))}
                        {posts && posts.length == 0 && <p>No posts match the current search.</p>}
                    </div>
                </section>
            </main>
        </>
    )
}