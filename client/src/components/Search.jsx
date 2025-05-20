import { TextSearch } from "lucide-react"

const Search = ({placeholder,handleSearch,handleClick,handleChange,value}) => {
  return (
    <div className='w-[100%] flex items-center bg-neutral-900 px-[2%] rounded-lg text-white'>
      <form onSubmit={handleSearch} className='flex relative w-[100%]'>
        <input 
        value={value} 
        onChange={handleChange} 
        placeholder={placeholder} 
        type='search' 
        className='w-[100%] px-[2%] py-[1.5%] rounded-lg bg-transparent outline-none' 
        />
        <button onCanPlay={handleClick}>
          <TextSearch/>
        </button>
        </form>
    </div>
  )
}

export default Search
