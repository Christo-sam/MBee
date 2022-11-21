import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { logo3, userImg } from './assets';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { auth, provider } from './firebase';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from './redux/features/userSlice';


const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const [isValidImg, setIsValidImg] = useState(true);


  // Checking if user is already logged in.
  useEffect(()=>{
    auth.onAuthStateChanged(async(user)=>{
        if (user){
            setUser(user);
        }
    });
}, [userName]);


  // Handling Sign-In/Sign-Out.
  const handleAuth = () => {
    if (!userName){
        auth
            .signInWithPopup(provider)
            .then((result) => {
                setUser(result.user);
            })  
            .catch((error)=>{
                alert(error.message);
            })
    } else if(userName){
        auth.signOut().then(()=>{
            dispatch(setSignOutState());
        }).catch((err)=> alert(err.message));
    }
  };


  // Setting User details into the Store, once Signed-In.
  const setUser = (user) => {
    dispatch(
        setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        })
    )
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {
        userName ? (
          <div className='relative flex'>
            <Sidebar />
              <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
                <div className='flex-1 mt-[1rem] flex flex-row items-center justify-between px-2 pr-10 gap-[10rem]'>
                  <Searchbar />
                  <SignOut>
                    {
                      isValidImg
                      ?
                        <UserImg onError={()=>setIsValidImg(false)} src={userPhoto} alt={userName} />
                      :
                        <UserImg src={userImg} alt={userName} />
                    }

                    <DropDown>
                        <span className='text-white z-1000' onClick={handleAuth}>Sign Out</span>
                    </DropDown>
                  </SignOut>
                </div>

                <div className="mt-[3rem] px-6 h-[calc(100vh-7rem)] flex">
                  <Routes>
                    <Route path="/" element={<Discover />} />
                    <Route path="/top-artists" element={<TopArtists />} />
                    <Route path="/top-charts" element={<TopCharts />} />
                    <Route path="/around-you" element={<AroundYou />} />
                    <Route path="/artists/:id" element={<ArtistDetails />} />
                    <Route path="/songs/:songid" element={<SongDetails />} />
                    <Route path="/search/:searchTerm" element={<Search />} />
                  </Routes>
                </div>
              </div>

              {activeSong?.title && (
                <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                  <MusicPlayer />
                </div>
              )}
          </div>
          )
          : <div className='overflow-hidden flex flex-col text-center h-[100vh] bg-gradient-to-r from-[#020024] via-[#7070cf] to-[#400750]'>
              <div className="mb-[10vw] w-[100%] relative flex justify-center items-center flex-col py-[80px] px-[40] h-[100%]">
                <img src={logo3} className="h-[15rem] object-contain mt-10 shadow-lg shadow-[#2b2b2b] xsm:h-[12rem]" alt="logo"/>
                <Description>
                    TUNE IN TOGETHER
                </Description>
                <p className="mt-[0.5rem] mb-[1.5rem] text-[#e6e6e6] tracking-widest leading-6 text-[16px] xsm:text-[14px] xxsm:text-[12px]">Get Access to all Music for free here!! <br/>No Ads, ofcourse😁😉...</p>
                <Login onClick={handleAuth}>Login Now</Login>
              </div>
            </div>
      }
    </>
)};


const UserImg = styled.img`
    height:100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px; 
    right: 0;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
    padding: 10px 0 10px 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
    cursor: pointer;
`;


const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;  
    align-items: center;
    justify-content:center;
    ${UserImg}{
        border-radius: 50%;
        width: 100%;
    }
    &:hover{
        ${DropDown}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;


const Description = styled.p`
    color: white;
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 1.5rem 0 0 0;
    line-height: 1.5em;  

    
    @media (max-width: 698px) {
      font-size: 3rem;
    }
    
    @media (max-width: 518px) {
      font-size: 2.5rem;
    }

    @media (max-width: 488px) {
      font-size: 2rem;
    }

    @media (max-width: 378px) {
      font-size: 1.5rem;
    }
`;

const Login = styled.a`
    background-color: transparent;
    color: white;
    font-size: 1rem;
    padding: 13px 46px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 2px; 
    transition: all 0.2s ease-out;
    cursor: pointer;

    &:hover{
        background:white;
        color: #464646;
        border-color: transparent;
    }
`;


export default App;