import '../../styles/dashboard/_filter.scss'
import React, { useState } from 'react'

const Filter = ({handleSort}) => {

  const filterOptions = ['All', 'Completed', 'In Progress']
  const [isOpen, setIsOpen] = useState(false)
  const [SelectedOption, setSelectedOption] = useState('All')
  
  const handleToggle = () =>{
    setIsOpen(!isOpen)
  }
  const handleSelect = (option) =>{
    setSelectedOption(option)
    handleSort(option)
    handleToggle()
  }

  return (
    <div className='filter-btn'>
      <button className='filter-btn-toggle' onClick={handleToggle}>
        <span className="material-symbols-outlined">
          tune
        </span>
        Filter
      </button>
      <ul className={`filter-btn-options ${isOpen ? 'open' : ''}`}>
        
        {
          filterOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`filter-btn-option ${
                SelectedOption === option ? 'active' : ''
              }`}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Filter