import React from 'react';
import { useSelector } from 'react-redux';
import Music from './Music';
import ReactPlayer from 'react-player';
const Modal = ({ onClose }) => {
    const link = useSelector(state => state.mediaLink.link);
    const mediaType = useSelector(state => state.mediaLink.type);
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-[800px] h-[600px] m-auto' >
            {mediaType === 'video' && <ReactPlayer url={link} controls={true} />}
            {mediaType === 'audio' && <Music link={link} />}

            <button className='border p-4 mt-2 bg-purple-500 text-slate-100' onClick={onClose}>Close</button>
        </div>
    );
}

export default Modal;
