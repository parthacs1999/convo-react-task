import React, { useState } from 'react';
import Modal from './Modal';
import UpdateBucket from './updateBucket';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { MediaLinkAction } from '../store/mediaLink-slice';
import { multipleSliceAction } from '../store/multiple-slice';
import createHistory from './createHistory';
const style = {
    li: `bg-slate-200 p-4 my-2 capitalize`,
    liDeleteMul: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    // row: `flex`,
    text: `cursor-pointer  text-xl font-bold text-center`,
    button: `cursor-pointer `
}

const Card = ({ bucket, deleteBucket }) => {
    const dispatch = useDispatch();
    const [showFeedBackForm, setShowFeedBackForm] = useState(false);
    const editHandler = () => {
        setShowFeedBackForm(!showFeedBackForm);
    }
    const [openModal, setOpenModal] = useState(false);

    const openModalHandler = () => {
        setOpenModal(!openModal);
        dispatch(MediaLinkAction.getLink({
            link: bucket.url,
            type: bucket.mediatype
        }));
        const d = new Date();
        const updated_time_stamp = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

        createHistory({
            cardName: bucket.name,
            link: bucket.url,
            time: updated_time_stamp
        })

    }
    const checkBoxHandler = () => {
        dispatch(multipleSliceAction.updateIds(bucket.id));
    }


    return (
        <>
            <li className={style.li} onClick={openModalHandler}>
                <div className={style.row} >
                    <p className={style.text}>{bucket.name} - {bucket.mediatype}</p>
                </div>
            </li>
            <div className='w-full flex justify-evenly'>
                <input type="checkbox" onChange={checkBoxHandler} />
                <button onClick={() => deleteBucket(bucket.id)}>{<FaRegTrashAlt />}</button>
                <button onClick={editHandler}>{<AiFillEdit />}</button>
            </div>
            {showFeedBackForm && <UpdateBucket bucket={bucket} />}

            {openModal && <Modal onClose={openModalHandler} />}
        </>
    );
}

export default Card;
