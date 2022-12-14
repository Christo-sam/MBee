import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId].attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img 
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          alt="art"
          src={artistId?artist?.artwork?.url.replace('{w}','500').replace('{h}','500'):
              songData?.images?.coverart      
          }
        />

        <div className="ml-5">
          {artistId? 
            <p className="font-bold text-[4.5rem] tracking-wide text-white">
              {artist.name}
            </p> : 
            <p className="text-[2rem] font-bold tracking-wide text-white">
              {songData?.title}
            </p>
          }

          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}</p>
            </Link>
          )}


          {/*  ?. means we wanna make sure this data actually exists, in case if it doesn't javascript would give us an error,
                but if we put this operator, its going to give us UNDEFINED, which is ofcourse better than an error 
          */}

          <p className="text-base text-gray-400 mt-2">
            {artistId ?
              artist?.genreNames[0] :
              songData?.genres?.primary}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  )
}

export default DetailsHeader;
