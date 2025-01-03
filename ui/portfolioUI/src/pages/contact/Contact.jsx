import { useState } from 'react'
import config from '../../../portfolio.config.json'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [reason, setReason] = useState('')
    const [message, setMessage] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [allowSend, setAllowSend] = useState(false)
    const [nameInvalid, setNameInvalid] = useState(true)
    const [emailInvalid, setEmailInvalid] = useState(true)
    const [reasonInvalid, setReasonInvalid] = useState(true)
    const [messageInvalid, setMessageInvalid] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{

        // If any field is invalid, set to true otherwise set to false
        if (nameInvalid || emailInvalid || reasonInvalid || messageInvalid)
        {
            setAllowSend(false)
        }
        else {
            setAllowSend(true)
        }

        // set name validation, name cannot be blank
        if (name == '')
        {
            setNameInvalid(true)
        } else {
            setNameInvalid(false)
        }

        // set email validation, email cannot be blank and must be valid address format
        if (email == '') {
            setEmailInvalid(true)
        } else {
            setEmailInvalid(false)
        }

        // set reason validation, reason must be selected
        if (reason == '') {
            setReasonInvalid(true)
        } else {
            setReasonInvalid(false)
        }

        // set message validation, message cannot be blank
        if (message == '') {
            setMessageInvalid(true)
        } else {
            setMessageInvalid(false)
        }

    }, [name, email, reason, message])

    const sendContactEmail = (event) => {
        event.preventDefault()
        fetch(config.api.url+"Email/ContactMe", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                reason: reason,
                message: message,
                company: company,
                phone: phone
            })
        }).then(res=> {
            if (!res.ok) {
                throw res.status
            }

            navigate("/contact/success")
        }).catch(error=>console.log(error))
    }

    return (
        <>
            <div id='contact-boxes' className='flex flex-wrap justify-center py-10'>
                <div id='page-links' className='px-20 pb-8 text-center'>
                    <h1 className='pb-4'>LINKS TO MY PAGES!</h1>
                    <a className='border-2 rounded-sm w-full hover:bg-gray-300 bg-gray-200 p-1 px-2 mx-4'
                    href='https://www.linkedin.com/in/ian-bentley-658b4421b/'>LinkedIn</a>
                    <a className='border-2 rounded-sm w-full hover:bg-gray-300 bg-gray-200 p-1 px-2 mx-4'
                    href='https://github.com/ian-bentley'>GitHub</a>
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
                        <input 
                        className={`border-2 rounded-sm w-full h-7 sm:w-72 ${nameInvalid? 'bg-red-300' : ''}`}
                        type='text' 
                        id='full-name' 
                        name='full-name'
                        value={name}
                        onChange={(event)=>setName(event.target.value)}/>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='company'>
                            <span>Company</span>
                        </label>
                        <input 
                        className='border-2 rounded-sm w-full h-7 sm:w-72'
                        type='text' 
                        id='company' 
                        name='company'
                        value={company}
                        onChange={(event)=>setCompany(event.target.value)}/>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='reason'>
                            <div>Reason</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <select 
                        className={`border-2 rounded-sm w-full h-7 sm:w-72 ${reasonInvalid? 'bg-red-300' : ''}`}
                         id='reason' 
                         name='reason'
                         value={reason}
                         onChange={(event)=>setReason(event.target.value)}>
                            <option id='no-selection' value=''>Select an option...</option>
                            <option id='job' value='Job Opportunity'>Job Opportunity</option>
                            <option id='contract' value='Contract Work'>Contract Work</option>
                            <option id='question' value='Programming Question'>Programming Question</option>
                            <option id='issue' value='Website Issue'>Website Issue</option>
                        </select>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='email'>
                            <div>Email</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <input 
                        className={`border-2 rounded-sm w-full h-7 sm:w-72 ${emailInvalid? 'bg-red-300' : ''}`}
                        type='email' 
                        id='email' 
                        name='email'
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}/>
                    </div>
                    <div className='pb-4 sm:flex sm:justify-between'>
                        <label htmlFor='phone'>
                            Phone
                        </label>
                        <input 
                        className='border-2 rounded-sm w-full h-7 sm:w-72'
                        type='text' 
                        id='phone' 
                        name='phone'
                        value={phone}
                        onChange={(event)=>setPhone(event.target.value)}/>
                    </div>
                    <div className='pb-4 '>
                        <label htmlFor='message'>
                            <div>Message</div>
                            <div className='text-xs text-red-500'>*Required</div>
                        </label>
                        <textarea 
                        className={`border-2 rounded-sm w-full ${messageInvalid? 'bg-red-300' : ''}`}
                        value={message}
                        onChange={(event)=>setMessage(event.target.value)}
                        ></textarea>
                    </div>
                    <button
                    className={`border-2 rounded-sm w-full ${allowSend? 'hover:bg-gray-300' : 'text-gray-400'} bg-gray-200`}
                    disabled={!allowSend}
                    onClick={(event)=>sendContactEmail(event)}>Send</button>
                </fieldset>
            </form>
        </>
    )
}