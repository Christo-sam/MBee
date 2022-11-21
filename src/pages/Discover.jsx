import { useDispatch, useSelector } from 'react-redux';

import  {Error, Loader, SongCard, TopPlay } from '../components';
import { genres } from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';


const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
    const genreTitle = genreListId.slice(0,1) + (genreListId).slice(1,).toLowerCase();
    
    if(isFetching)
        return <Loader title="Loading songs..." />
    if(error)
        return <Error />

    return(
    <div className="overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
        <div className="flex-1 flex flex-col h-fit pb-40">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="position-fixed font-bold text-3xl text-white text-left">Discover {genreTitle?genreTitle:'Pop'}</h2>
                <select 
                    onChange={(e)=> dispatch(selectGenreListId(e.target.value)) } 
                    value={genreListId || 'pop'}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>

        <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
        </div> 
    </div>
    )}

export default Discover;
