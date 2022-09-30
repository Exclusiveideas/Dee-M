import React from 'react';
import { Close } from '@mui/icons-material';
import './discoverFriends.css';

const DiscoverFriends = ({ onClose }) => {
  return (
  <div className="dialog_wrapper">
  <div className="dialog_top_container">
    <h1 className='dialog_title'>Discover Friends</h1>
    <div className="closeDialog_icon_container" onClick={onClose} >
      <Close />
    </div>
  </div>
</div>
  )
}

export default DiscoverFriends;