import React, { useState, useEffect } from 'react';
import Card from './Card';
import { db } from '../firebase';
import { addDoc, collection, onSnapshot, query, doc, deleteDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { bucketNamesAction } from '../store/bucketNames-slice';
import { useSelector } from 'react-redux';
import History from './history';
const style = {
  container: `bg-slate-100 max-w-[1000px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex flex-col `,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 mt-2 bg-purple-500 text-slate-100`
}

const Container = () => {
  const dispatch = useDispatch();
  const [buckets, setBuckets] = useState([]);
  const [cardName, setCardName] = useState("");
  const [url, setUrl] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const bucketNamesData = useSelector(state => state.bucketNames.bucketNames);
  const idsSelected = useSelector(state => state.multiple.idData);
  const [showHistory, setShowHistory] = useState(false);

  const showFormToggler = () => {
    setShowForm(!showForm);
  }
  const showHistoryToggler = () => {
    setShowHistory(!showHistory);
  }
  //create buckets

  const createBucket = async (e) => {
    e.preventDefault();
    if (cardName === '' || url === '' || bucketName === '') {
      alert('Please dont submit empty values');
      return;
    }

    await addDoc(collection(db, 'buckets'), {
      name: cardName,
      url: url,
      bucketName: bucketName,
      mediatype: mediaType
    });
    dispatch(bucketNamesAction.updatebucketNames(bucketName));
    setCardName('');
    setUrl('');
    setBucketName('');
    setMediaType('');
  }

  //Read buckets from firebase
  useEffect(() => {
    const q = query(collection(db, 'buckets'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let bucketsArr = [];
      querySnapshot.forEach((doc) => {
        bucketsArr.push({ ...doc.data(), id: doc.id });
      });
      setBuckets(bucketsArr);
      bucketsArr.forEach((item) => {
        dispatch(bucketNamesAction.updatebucketNames(item.bucketName));
      })
    });
    return () => unsubscribe();
  }, [dispatch])
  // Delete Bucket
  const deleteBucket = async (id) => {
    await deleteDoc(doc(db, 'buckets', id));
  };
  //Delete multiple
  const deleteMultiple = () => {
    idsSelected.map((id) => (
      deleteBucket(id)
    ))
  }
  return (
    <div className={style.container}>
      <h3 className={style.heading}>Media Player</h3>
      {
        <>
          <button className={style.button} onClick={showHistoryToggler}>History</button>
        </>
      }
      {
        showForm &&
        <form className={style.form} onSubmit={createBucket}>
          <input type="text" placeholder='Enter Card Name' className={style.input} value={cardName} onChange={(e) => setCardName(e.target.value)} />
          <input type="text" placeholder='Enter Url' className={style.input} value={url} onChange={(e) => setUrl(e.target.value)} />
          <input type="text" placeholder='Enter bucket name' className={style.input} value={bucketName} onChange={(e) => setBucketName(e.target.value)} />
          <input type="text" placeholder='video/audio' className={style.input} value={mediaType} onChange={(e) => setMediaType(e.target.value)} />
          <button type='submit' className={style.button}>Add card</button>
          <button onClick={showFormToggler} className={style.button}>Close Form</button>
        </form>
      }
      {
        !showForm &&
        <>
          <button onClick={showFormToggler} className={style.button}>Open Form</button>
        </>
      }
      {
        showHistory && <History />
      }

      {
        bucketNamesData.map((bucketName) => (
          <>

            <div className='text-xl font-mono ml-2 text-gray-800 p-2'>{bucketName}-</div>

            <ul>
              {
                buckets.filter((item) => item.bucketName === bucketName).map((bucket, index) => (

                  <Card
                    key={index}
                    bucket={bucket}
                    deleteBucket={deleteBucket}
                  />
                ))
              }
            </ul>
          </>
        ))
      }

      <button className='px-8 py-3 text-white bg-red-600 rounded focus:outline-none disabled:opacity-25' disabled={idsSelected.length === 0 ? true : false} onClick={deleteMultiple}>Delete selected</button>

    </div>



  );
}

export default Container;
