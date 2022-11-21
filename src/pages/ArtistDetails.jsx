import { useParams } from "react-router-dom";          // It'll give access to the song-id that we just clicked on!!
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs, TopPlay } from '../components';
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state)=> state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);


    if(isFetchingArtistDetails)
        return <Loader title="Loading Artist details..." />
    if(error)
        return <Error />

    return (
            <div className="flex flex-col w-[100%] overflow-y-scroll hide-scrollbar pb-40">
                <DetailsHeader 
                    artistId={artistId}
                    artistData={artistData}
                /> 

                <RelatedSongs 
                    data={Object.values(artistData?.songs)}
                    artistId={artistId}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                />
            </div>
    )
}

export default ArtistDetails;