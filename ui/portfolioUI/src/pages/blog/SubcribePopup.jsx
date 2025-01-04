import { useState } from 'react'
import config from '../../../portfolio.config.json'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function SubscribePopup({isOpen, Close}) {
    const [email, setEmail] = useState('')
    const [allowSend, setAllowSend] = useState(false)
    const navigate = useNavigate()

    const Subscribe = (event) => {
        event.preventDefault()

        fetch(config.api.url+'UnverifiedEmails/Add', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(res=> {
            if (!res.ok) {
                throw res.status
            }
            navigate('/blog/subscribe/success')
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{
        if (email == '') {
            setAllowSend(false)
        } else {
            setAllowSend(true)
        }
    }, [email])

    if (!isOpen) return null

    return (
        <>
            <div id="background" 
            className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
            onClick={(event)=>{
                const background = document.getElementById("background")
                if (event.target == background) {
                    Close()
                }
            }}>
                <div className='max-w-80 h-54 m-4 bg-white p-4'>
                    <form className='flex flex-col p-4'>
                        <label className='pb-4'>
                            Enter your email here to be notified on new blog posts!
                        </label>
                        <input 
                        className='border-2 rounded-sm mb-4'
                        type='text' 
                        id="email"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}/>
                        <button 
                        className={`border-2 rounded-md ${allowSend? 'hover:bg-gray-300' : 'text-gray-400'} p-1 px-4 bg-gray-200`}
                        type='submit'
                        disabled={!allowSend}
                        onClick={(event)=>Subscribe(event)}>SUBSCRIBE</button>
                    </form>
                </div>
            </div>
        </>
    )
}