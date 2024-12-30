import { useState } from 'react'
import PostCard from './PostCard'
import SubscribePopup from './SubcribePopup'

export default function Blog() {
    const [showPopup, setShowPopup] = useState(null)

    return (
        <>
            <main className='pb-10'>
                <div id='subscribe-banner' className='flex flex-wrap justify-end py-10'>
                    <span className='pb-4'>Want to keep up with the latest posts?</span>
                    <button className='border-2 rounded-md bg-gray-200 p-1 px-4 mx-4'
                    onClick={()=>setShowPopup(true)}>SUBSCRIBE</button>
                </div>
                <SubscribePopup isOpen={showPopup} onClose={()=>setShowPopup(false)}/>
                <form className='pb-4 flex max-w-xl'>
                    <input className='border-2 rounded-sm grow mr-4'
                    type='text' id='search-text'/>
                    <input className='border-2 rounded-sm bg-gray-200 px-2'
                    type='submit' value='Search'/>
                </form>
                <section className='lg:flex'>
                    <form id='filter' className='max-w-96 lg:max-w-60'>
                        <span>Filter results</span>
                        <fieldset className='border-2 p-4'>
                            <fieldset className='pb-4'>
                                <label htmlFor='tags'>Tags</label>
                                <div className='flex flex-wrap'>
                                    <div className='pr-4'>
                                        <div>
                                            <input type='checkbox' name='tags' id='html-tag'/>
                                            <label>HTML</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='css-tag'/>
                                            <label>CSS</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='javascript-tag'/>
                                            <label>JavaScript</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='c#-tag'/>
                                            <label>C#</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='java-tag'/>
                                            <label>Java</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <input type='checkbox' name='tags' id='sql-tag'/>
                                            <label>SQL</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='react-tag'/>
                                            <label>React</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='net-web-api-tag'/>
                                            <label>.NET Web API</label>
                                        </div>
                                        <div>
                                            <input type='checkbox' name='tags' id='tailwind-tag'/>
                                            <label>Tailwind</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className='pb-4'>
                            <label htmlFor='categories'>Categories</label>
                                <div className='flex flex-wrap lg:flex-col'>
                                    <div className='pr-2'>
                                        <input type='checkbox' name='categories' id='dev-update-category'/>
                                        <label>Dev update</label>
                                    </div>
                                    <div className='pr-2'>
                                        <input type='checkbox' name='categories' id='patch-notes-category'/>
                                        <label>Patch notes</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' name='categories' id='coding-talks-category'/>
                                        <label>Coding talks</label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <label htmlFor='date-range'>Date range</label>
                                <div className='flex flex-wrap pt-2'>
                                    <div className='flex justify-between mr-8 w-full max-w-40'>
                                        <label htmlFor='start-date' className='pr-2'>From</label>
                                        <input className='border-2 rounded-sm w-24'
                                        type='text' id='start-date'/>
                                    </div>
                                    <div className='flex justify-between mr-8 w-full max-w-40'>
                                        <label htmlFor='end-date' className='pr-2'>To</label>
                                        <input className='border-2 rounded-sm w-24'
                                        type='text' id='end-date'/>
                                    </div>
                                </div>
                            </fieldset>
                        </fieldset>
                    </form>
                    <div id='post-list' className='pl-6 pt-10'>
                        <PostCard
                        title='Post title'
                        imageUrl=''
                        imageAlt='Blog post image'
                        description='A short decription of the post'
                        slug='post-1'/>
                        <PostCard
                        title='Post title'
                        imageUrl=''
                        imageAlt='Blog post image'
                        description='A short decription of the post'
                        slug='post-1'/>
                    </div>
                </section>
            </main>
        </>
    )
}