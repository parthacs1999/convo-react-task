import { updateDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';
const style = {
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex flex-col `,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 mt-2 bg-purple-500 text-slate-100`
}

const UpdateBucket = ({ bucket }) => {
    const [cardName, setCardName] = useState("");
    const [url, setUrl] = useState("");
    const [bucketName, setBucketName] = useState("");
    const [mediaType, setMediaType] = useState("");
    //Update buckets
    const updateBuckets = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, 'buckets', bucket.id), {
            name: cardName === "" ? bucket.name : cardName,
            url: url === "" ? bucket.url : url,
            bucketName: bucketName === "" ? bucket.bucketName : bucketName,
            mediatype: mediaType === "" ? bucket.mediatype : mediaType
        })
        setCardName("");
        setUrl("");
        setBucketName("");
        setMediaType("");
    }
    return (

        <form className={style.form} onSubmit={updateBuckets}>
            <input type="text" placeholder='Enter Card Name' className={style.input} value={cardName} onChange={(e) => setCardName(e.target.value)} />
            <input type="text" placeholder='Enter Url' className={style.input} value={url} onChange={(e) => setUrl(e.target.value)} />
            <input type="text" placeholder='Enter bucket name' className={style.input} value={bucketName} onChange={(e) => setBucketName(e.target.value)} />
            <input type="text" placeholder='video/audio' className={style.input} value={mediaType} onChange={(e) => setMediaType(e.target.value)} />
            <button type='submit' className={style.button}>Submit Changes</button>
        </form>

    );
}
export default UpdateBucket;
