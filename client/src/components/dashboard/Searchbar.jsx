import '../../styles/dashboard/_searchbar.scss'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
const Searchbar = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state) => state.tasks.search_query)
  
  const handleSearchQuery = (e) =>{
    dispatch(
      {
        type: 'SEARCH_QUERY', 
        payload: e.target.value
      }
    )
  }


  return (
    <div className='search-bar'>
      <span className="material-symbols-outlined">
        search   
      </span>
      <input type="text" name='search-query' id='search-query' placeholder='Search' defaultValue={searchQuery} onChange={handleSearchQuery} />
  </div>
  )
}

export default Searchbar