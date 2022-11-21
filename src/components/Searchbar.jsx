import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  }

  const goBack = () => {
    navigate(-1);
  }

  const goForward = () => {
    navigate(1);
  }


  return(
    <div className="flex-1 flex flex-row gap-[1.5rem]">
      <div className="flex justify-center items-center gap-[1rem]">
        <IoIosArrowBack 
          onClick={goBack}
          className="text-gray-400 bg-[#0c0b11] cursor-pointer text-[2.35rem] rounded-[50%] p-[5px] hover:text-white" />
        <IoIosArrowForward 
          onClick={goForward}
          className="text-gray-400 bg-[#0c0b11] cursor-pointer text-[2.35rem] rounded-[50%] p-[5px] hover:text-white" />
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="input_form flex-1 text-gray-400 focus-within:text-gray-200">
        <label htmlFor="search-field" className="sr-only">
          Search all Songs
        </label>
        <div className="search_div flex flex-row justify-start items-center border-gray-50 rounded-[100px]">
          <FiSearch className="w-5 h-5 ml-4" />
          <input 
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="What do you want to listen to?"
            type="search"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="dark flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-[0.7rem]"
          />
        </div>
      </form>
    </div>

    
  )
};

export default Searchbar;
