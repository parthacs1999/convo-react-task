import React, { useRef } from 'react';


const Music = ({ link }) => {

    const audioRef = useRef(null);
    const handlePlayAudio = () => {
        audioRef.current.play();
    }

    return (
        <div>
            <a href="#" onClick={handlePlayAudio} className="border p-4 mt-2 bg-purple-500 text-slate-100 mr-2">
                Play
            </a>
            <audio ref={audioRef}>
                <source src={link} />
            </audio>
        </div>
    );
}

export default Music;
