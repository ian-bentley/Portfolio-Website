import { useState } from 'react'
import config from '../../../portfolio.config.json'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Contact() {
    const contactErrorMessage = 'Error: Could not send contact email to server. Please try again later. If the problem persists, please reach out to the website administrator'

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
    const [hasContactError, setHasContactError] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        // *******************************************************************************
        // * Field Validation Step 1: Validate fields and set states                     *
        // *******************************************************************************
        console.log('Field Validation Step 1: Validate fields')
        validateFields()
    }, [name, email, reason, message])

    useEffect(()=>{
        // *******************************************************************************************
        // * Field Validation Step 2: Check all if all validation states are true and set allowSend  *
        // *******************************************************************************************
        console.log('Field Validation Step 2: Check all if all validation states are true and set allowSend')
        if (allFieldsValid()) {
            // *********************************************************
            // * Field Validation Step 2b: Set allowSend               *
            // *********************************************************
            setAllowSend(true)
            console.log('Field Validation Step 2b: allowSend set to true')
            return
        }
        setAllowSend(false)
        console.log('Field Validation Step 2b: allowSend set to false')
    }, [nameInvalid, emailInvalid, reasonInvalid, messageInvalid])

    const validateFields = ()=> {
        // *******************************************************************************
        // * Field Validation Step 1a: Validate name, name cannot be blank               *
        // *******************************************************************************
        console.log('Field Validation Step 1a: Validating name.')
        console.log('name: '+name)
        if (name == '')
        {
            setNameInvalid(true)
            console.log('Field Validation Step 1a: Failed. Name is invalid.')
        } else {
            setNameInvalid(false)
            console.log('Field Validation Step 1a: Success! Name is valid.')
        }
        // *******************************************************************************
        // * Field Validation Step 1b: Validate email, email cannot be blank             *
        // *******************************************************************************
        console.log('Field Validation Step 1b: Validating email.')
        console.log('email: '+email)
        if (email == '') {
            setEmailInvalid(true)
            console.log('Field Validation Step 1b: Failed. Email is invalid.')
        } else {
            setEmailInvalid(false)
            console.log('Field Validation Step 1b: Success! Email is valid.')
        }

        // *******************************************************************************
        // * Field Validation Step 1c: Validate reason, reason must be selected          *
        // *******************************************************************************
        console.log('Field Validation Step 1c: Validating reason.')
        console.log('reason: '+reason)
        if (reason == '') {
            setReasonInvalid(true)
            console.log('Field Validation Step 1c: Failed. Reason is invalid.')
        } else {
            setReasonInvalid(false)
            console.log('Field Validation Step 1c: Success! Reason is valid.')
        }

        // *******************************************************************************
        // * Field Validation Step 1d: Validate message, message cannot be blank         *
        // *******************************************************************************
        console.log('Field Validation Step 1d: Validating message.')
        console.log('message: '+message)
        if (message == '') {
            setMessageInvalid(true)
            console.log('Field Validation Step 1d: Failed. Message is invalid.')
        } else {
            setMessageInvalid(false)
            console.log('Field Validation Step 1d: Success! Message is valid.')
        }
    }

    const allFieldsValid = () => {
        // **************************************************************************
        // * Field Validation Step 2a: Check if all validation states are true      *
        // **************************************************************************
        console.log('Field Validation Step 2a: Check if all validation states are true.')

        console.log('nameInvalid: '+nameInvalid)
        console.log('emailInvalid: '+emailInvalid)
        console.log('reasonInvalid: '+reasonInvalid)
        console.log('messageInvalid: '+messageInvalid)
        
        if (nameInvalid || emailInvalid || reasonInvalid || messageInvalid)
        {
            console.log('Field Validation Step 2a: Failed. At least one field state is invalid.')
            return false
        }
        console.log('Field Validation Step 2a: Success! All field states are valid.')
        return true
    }

    const sendContactEmail = (event) => {
        event.preventDefault()
        const url = config.api.url+"Email/ContactMe"
        fetch(url, {
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
        }).then(async res=> {
            console.log('Server response received')
            if (!res.ok)
            {
                if (res.status == '400') {
                    const response = await res.json()
                    console.error('Server response error: (400) '+response.title)
                    for (const key in response.errors) {
                        response.errors[key].forEach(error=>console.error(error))
                    }
                } else if (res.status == '404') {
                    console.error('Error 404: '+url+' could not be found. Verify the client is requesting the correct address.')
                } else if (res.status == '405') {
                    console.error('Error 405: '+url+' expects a POST method. Please verify the method type being sent by the client')
                }
                
                throw Error()
            }

            console.log('Response ok! Contact email has been sent by the server.')
            navigate("/contact/success")
        }).catch(()=>{
            console.error(contactErrorMessage)
            setHasContactError(true)
        })
    }

    return (
        <>
            <div id='contact-boxes' className='flex flex-wrap justify-center py-10'>
                <div id='page-links' className='px-20 pb-8 text-center'>
                    <h1 className='pb-4'>LINKS TO MY PAGES!</h1>
                    <a className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 px-4 p-1 mx-4'
                    href='https://www.linkedin.com/in/ian-bentley-658b4421b/'>LinkedIn</a>
                    <a className='border-2 rounded-md hover:bg-gray-300 bg-gray-200 px-4 p-1 mx-4'
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
                { hasContactError && <p className='text-red-600'>{contactErrorMessage}</p> }
            </form>
        </>
    )
}