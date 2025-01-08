import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import config from '../../../portfolio.config.json'


export default function SubscribeValidation() {
    const { hashId, email } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(config.api.url+'Subscribers/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                hashId: hashId
            })
        })
        .then(res=> {
            if (!res.ok) {
                throw res.status
            }
        })
        .catch(error=>console.log(error))
    }, [])

    return (
        <>
            <h1>Email confirmed! You are now subscribed.</h1>
        </>
    )
}