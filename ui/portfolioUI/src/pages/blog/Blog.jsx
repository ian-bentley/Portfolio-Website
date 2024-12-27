import PostCard from './PostCard'
import SubscribePopup from './SubcribePopup'

export default function Blog() {
    return (
        <>
            <main>
                <div id='subscribe-banner'>
                    <span>Want to keep up with the latest posts?</span>
                    <button>SUBSCRIBE</button>
                    <SubscribePopup/>
                </div>
                <form>
                    <input type='text' id='search-text'/>
                    <input type='submit' value='Search'/>
                </form>
                <section>
                    <form id='filter'>
                        <span>Filter results</span>
                        <fieldset>
                            <label htmlFor='tags'>Tags</label>
                            <fieldset>
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
                            </fieldset>
                            <label htmlFor='categories'>Categories</label>
                            <fieldset>
                                <div>
                                    <input type='checkbox' name='categories' id='dev-update-category'/>
                                    <label>Dev update</label>
                                </div>
                                <div>
                                    <input type='checkbox' name='categories' id='patch-notes-category'/>
                                    <label>Patch notes</label>
                                </div>
                                <div>
                                    <input type='checkbox' name='categories' id='coding-talks-category'/>
                                    <label>Coding talks</label>
                                </div>
                            </fieldset>
                            <label htmlFor='date-range'>Date range</label>
                            <fieldset>
                                <input type='text' id='start-date'/>
                                <span>to</span>
                                <input type='text' id='end-date'/>
                            </fieldset>
                        </fieldset>
                    </form>
                    <div id='post-list'>
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