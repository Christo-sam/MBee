import { Link, useNavigate } from "react-router-dom";

const ArtistCard = ({track}) => {
  const navigate = useNavigate();

  return(
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
         backdrop-blur-sm animate-slideup rounded-full hover:bg-white 
         transition-all delay-12  cursor-pointer
         bg-gradient-to-tr from-transparent to-black"
      onClick={()=>navigate(`/artists/${track?.artists[0].adamid}`)}
      >
        <img 
          className="w-full h-56 rounded-full"
          src={track?.images?.background}
          alt="artist"
        />    
    </div>
  )
};

export default ArtistCard;


{/* <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${track?.subtitle === track.subtitle ? 'flex bg-black bg-opacity-70':'hidden'}`}>
          <p>{track.subtitle}</p>
        </div> */}
