import { useParams } from "react-router-dom"


export default function SubscribeValidation() {
    const { id } = useParams()

    return (
        <>
            <h1>Email confirmed! You are now subscribed.</h1>
        </>
    )
}