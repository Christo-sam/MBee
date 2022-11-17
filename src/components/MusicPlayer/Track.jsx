import React from 'react';
import { Link } from 'react-router-dom';

const Track = ({ isPlaying, isActive, activeSong }) => {
  console.log(activeSong);

  return(
    <div className="flex-1 flex items-center justify-start">
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <Link to={`/songs/${activeSong?.key}`}>
          <p className="text-white font-bold text-lg truncate">
            {activeSong?.title ? activeSong?.title : 'No active Song'}
          </p>
        </Link>

        <Link to={`/artists/${activeSong?.artists[0]?.adamid}`}>
          <p className="truncate text-gray-300">
            {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
          </p>
        </Link>
      </div>
    </div>
  )
};

export default Track;
