

export default function SubscribePopup({isOpen, onClose}) {
    if (!isOpen) return null

    const Subscribe = () => {
        alert("Subscribed")
    }

    return (
        <>
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
            onClick={()=>onClose()}>
                <div className='max-w-80 h-54 m-4 bg-white p-4'>
                    <form className='flex flex-col p-4'>
                        <label className='pb-4'>
                            Enter your email here to be notified on new blog posts!
                        </label>
                        <input className='border-2 rounded-sm mb-4'
                        type='text' id="email"/>
                        <input className='border-2 rounded-md bg-gray-200 p-1 px-4'
                        type='submit' value='SUBSCRIBE'
                        onClick={()=>Subscribe()}/>
                    </form>
                </div>
            </div>
        </>
    )
}