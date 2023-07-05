import React from 'react'
import { imageAPI } from 'utils/api';

const Avatar = ({image}) => {
  return (
    <img
      src={`${imageAPI}${image}`}
      alt="avatar"
    />
  );
}

export default Avatar