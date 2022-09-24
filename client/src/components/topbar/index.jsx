import React, { useState } from 'react';
import './topbar.css';
import { useSelector } from "react-redux";
import { Call, Videocam, MoreVert } from '@mui/icons-material';

const TopBar = () => {
  const [openOptions, setOpenOptions] = useState(false);

  const currentUser = useSelector(state => state.user?.currentUser);
  // console.log(currentUser)

  const toggleOpenOptions = () => {
    setOpenOptions(!openOptions)
  }
  
  return (
    <div className="topbar_wrapper">
      <div className='topbar'>
        <div className='topbar_left'>
          <img className="avatar" src={`https://avatars.dicebear.com/api/${currentUser?.avatar}/${currentUser?.username}.svg`} alt="friend's avatar" />
          <div className="name_container">
            <h3>{currentUser?.username}</h3>
          </div>
        </div>
        <div className="topbar_center"></div>
        <div className='topbar_right'>
          <div className="topbar_iconContainer">
            <Call fontSize='medium' className="topbar_icon" />
          </div>
          <div className="topbar_iconContainer">
            <Videocam fontSize='medium' className="topbar_icon" />
          </div>
          <div className={`topbar_iconContainer ${openOptions ? "active": ""}`} onClick={toggleOpenOptions} >
            <MoreVert fontSize='medium' className="topbar_icon" />
          </div>
        </div>
      </div>
      <div className={`topbar_moreOptions ${openOptions ? "open": ""}`}>
        <p className="options">view user</p>
        <p className="options">block notifications</p>
        <p className="options">unfriend user</p>
      </div>
    </div>
  )
}

export default TopBar 