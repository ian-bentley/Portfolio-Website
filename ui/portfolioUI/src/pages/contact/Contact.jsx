

export default function Contact() {
    return (
        <>
            <div id='contact-boxes'>
                <div id='page-links'>
                    <h1>LINKS TO MY PAGES!</h1>
                    <a href=''>LinkedIn</a>
                    <a href=''>GitHub</a>
                </div>
                <div id="contact-info">
                    <h1>CONTACT INFO</h1>
                    <p>Email: ibentley981203@gmail.com</p>
                    <p>Phone: (619) 850-4688</p>
                </div>
            </div>
            <form>
                <h1>CONTACT ME</h1>
                <div>
                    <label htmlFor='full-name'>
                        <span>Full name</span>
                        <span>*Required</span>
                    </label>
                    <input type='text' id='full-name' name='full-name'/>
                </div>
                <div>
                    <label htmlFor='company'>
                        <span>Company</span>
                    </label>
                    <input type='text' id='company' name='company'/>
                </div>
                <div>
                    <label htmlFor='reason'>
                        <span>Reason</span>
                        <span>*Required</span>
                    </label>
                    <select id='reason' name='reason'>
                        <option id='no-selection' value='no-selection'>Select an option...</option>
                        <option id='job' value='job'>Job Opportunity</option>
                        <option id='contract' value='contract'>Contract Work</option>
                        <option id='question' value='question'>Programming Question</option>
                        <option id='issue' value='issue'>Website Issue</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='email'>
                        <span>Email</span>
                        <span>*Required</span>
                    </label>
                    <input type='text' id='email' name='email'/>
                </div>
                <div>
                    <label htmlFor='phone'>
                        <span>Phone number</span>
                    </label>
                    <input type='text' id='phone' name='phone'/>
                </div>
                <div>
                    <label htmlFor='message'>
                        <span>Message</span>
                        <span>*Required</span>
                    </label>
                    <textarea></textarea>
                </div>
                <input type='submit' value='Send'/>
            </form>
        </>
    )
}