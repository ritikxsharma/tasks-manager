import { useSelector } from 'react-redux'
import '../../styles/dashboard/_sidebar.scss'
import React from 'react'

const Sidebar = ({onMenuItemClick}) => {
  const user = useSelector((state) => state.auth.user)
  const handleClick = (e) =>{
    onMenuItemClick(e.target.id)
  }

  return (
    <aside>
    <div className="heading">
        Hey there,
    </div>
    <div className="user-profile">
        {/* <div className="image-container">
            <img src={require('../../assets/logo512.png')} alt="" />
        </div> */}
        <div className="user-info">
            {user.name}
        </div>
    </div>
    <div className="menu">
        <div className="menu-item" id="home" onClick={handleClick}>
            <span className="material-symbols-outlined">
                home
            </span>
            Home
        </div>
        <div className="menu-item" id="adduser" onClick={handleClick}>
            <span className="material-symbols-outlined">
                person_add
            </span>
            Add User
        </div>
        {/* <div className="menu-item" id="settings">
            <span className="material-symbols-outlined">
            settings
            </span>
            Settings
        </div> */}
        <div className="menu-item" id="logout" onClick={handleClick}>
            <span className="material-symbols-outlined">
                logout
            </span>
            Log Out
        </div>
    </div>
</aside>
  )
}

export default Sidebar