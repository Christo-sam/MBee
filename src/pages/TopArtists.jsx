import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { ArtistCard, Error, Loader } from '../components';

const TopArtists = () => {
    const { data, isFetching, error } = useGetTopChartsQuery();
    const topArtistArr = data?.slice(10,);

    if(isFetching)
        return <Loader title="Loading top Artists.." />
    if(error)
        return <Error />


    return(
        <div className='flex flex-col w-[100%] overflow-y-scroll hide-scrollbar pb-40'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
                Top Artists
            </h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'> 
                {topArtistArr?.map((track)=>(
                    <ArtistCard 
                        key={track.key}
                        track={track}
                    />
                ))}
            </div>
        </div>
    )
};

export default TopArtists;