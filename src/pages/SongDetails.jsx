import { useParams } from "react-router-dom";          // it will give access to the song-id that we just clicked on!!
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs, TopPlay } from '../components';
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { useGetSongRelatedQuery } from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const { activeSong, isPlaying } = useSelector((state)=> state.player);
    const { data: songData, isFetching: isFetchingSongDetails, songErrorDetails } = useGetSongDetailsQuery({songid});
    const { data, isFetching:isFetchingRelatedSongs, error } = useGetSongRelatedQuery({songid});


    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    
    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i}));
        dispatch(playPause(true));
    };


    if(isFetchingSongDetails || isFetchingRelatedSongs)
        return <Loader title="Loading Song details..." />
    if(songErrorDetails || error)
        return <Error />

    return (
            <div className="flex flex-col w-[100%] overflow-y-scroll hide-scrollbar pb-40">
                <DetailsHeader 
                    artistId=""
                    songData={songData}
                /> 

                <div className="mb-10">
                    <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                    <div className="mt-5">
                        {songData?.sections[1].type==='LYRICS' ?
                            songData?.sections[1].text.map((line,i) => (
                                <p className="text-gray-400 text-base my-1"> {line}</p>     
                            )) : 
                            <p className="text-gray-400 text-base my-1"> Sorry, no lyrics found!! </p>
                        }
                    </div>
                </div>

                <RelatedSongs 
                    data={data}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                />
            </div>
    )
}

export default SongDetails;
