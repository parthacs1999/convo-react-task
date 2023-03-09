import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

import { collection, onSnapshot, query } from 'firebase/firestore'
const History = () => {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'history'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let historyArr = [];
            querySnapshot.forEach((doc) => {
                historyArr.push({ ...doc.data(), id: doc.id });
            });
            setHistory(historyArr);
        });
        return () => unsubscribe();
    }, [])
    return (
        <>
            {
                history.map((item) => (
                    <>
                        <div className='w-full border bg-slate-400 flex-auto justify-evenly m-auto'>
                            <div className='font-serif font-normal'>Card name-{item.name}</div>
                            <div className='font-serif font-normal'>Time-{item.time}</div>
                            <div className='font-serif font-normal'>Url-{item.url}</div>
                        </div>
                    </>
                ))
            }

        </>


    );
}

export default History;
