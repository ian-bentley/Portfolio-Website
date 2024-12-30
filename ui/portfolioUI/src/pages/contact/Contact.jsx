

export default function Contact() {
    return (
        <>
            <div id='contact-boxes' className='flex flex-wrap justify-center py-10'>
                <div id='page-links' className='px-20 pb-8 text-center'>
                    <h1 className='pb-4'>LINKS TO MY PAGES!</h1>
                    <a className='border-2 rounded-sm w-full bg-gray-200 p-1 px-2 mx-4'
                    href=''>LinkedIn</a>
                    <a className='border-2 rounded-sm w-full bg-gray-200 p-1 px-2 mx-4'
                    href=''>GitHub</a>
                </div>
                <div id='contact-info' className='px-20 pb-8 text-center'>
                    <h1>CONTACT INFO</h1>
                    <p>Email: ibentley981203@gmail.com</p>
                    <p>Phone: (619) 850-4688</p>
                </div>
            </div>
            <form className='max-w-sm m-auto pb-20'>
                <h1 className='text-center pb-4 font-semibold text-xl'>CONTACT ME</h1>
                <fieldset className='m-auto'>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='full-name'>
                            <div>Full name</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <input className='border-2 rounded-sm w-full h-7 sm:w-72'
                        type='text' id='full-name' name='full-name'/>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='company'>
                            <span>Company</span>
                        </label>
                        <input className='border-2 rounded-sm w-full h-7 sm:w-72'
                        type='text' id='company' name='company'/>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='reason'>
                            <div>Reason</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <select className='border-2 rounded-sm w-full h-7 sm:w-72'
                         id='reason' name='reason'>
                            <option id='no-selection' value='no-selection'>Select an option...</option>
                            <option id='job' value='job'>Job Opportunity</option>
                            <option id='contract' value='contract'>Contract Work</option>
                            <option id='question' value='question'>Programming Question</option>
                            <option id='issue' value='issue'>Website Issue</option>
                        </select>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='email'>
                            <div>Email</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <input className='border-2 rounded-sm w-full h-7 sm:w-72'
                        type='email' id='email' name='email'/>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='phone'>
                            Phone
                        </label>
                        <input className='border-2 rounded-sm w-full h-7 sm:w-72'
                        type='text' id='phone' name='phone'/>
                    </div>
                    <div className='pb-4 '>
                        <label htmlFor='message'>
                            <div>Message</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <textarea className='border-2 rounded-sm w-full'></textarea>
                    </div>
                    <input className='border-2 rounded-sm w-full bg-gray-200'
                     type='submit' value='Send'/>
                </fieldset>
            </form>
        </>
    )
}