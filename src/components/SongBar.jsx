import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineMenu } from 'react-icons/hi';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  return(
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <div className="flex-1 flex flex-row justify-between items-center">
        { 
          !artistId ? (
            <div className="relative h-[100%] group">
              <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
              <PlayPause
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={() => handlePlayClick(song, i)}
                />
              </div>
              <img
                className="w-[3rem] h-[3rem] rounded-lg"
                src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
                alt={song?.title}
              />
            </div> )
            :
            <img
              className="w-[3rem] h-[3rem] rounded-lg"
              src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
              alt={song?.title}
            />
          }

        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${song.key}`}>
              <p className="text-[16px] font-bold text-white hover:underline">
                {song?.title}
              </p>
            </Link>
          ) : (
              <p className="text-[16px] font-bold text-white">
                {song?.attributes?.name}
              </p>
          )}

          {
            artistId ? (
              <p className="text-[12px] text-gray-300 mt-1">
                {song?.attributes?.albumName}
              </p>
            ) :  (
              // <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                <p className="text-[12px] text-gray-300 mt-1 hover:underline">
                  {song?.subtitle}
                </p> 
              // </Link>
            )
          }
          
        </div>
      </div>
      <HiOutlineHeart className="outlinedHeart w-6 h-6 mr-2" />
    </div>
  )
};

export default SongBar;
