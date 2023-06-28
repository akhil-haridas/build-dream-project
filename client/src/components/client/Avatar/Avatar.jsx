import React from 'react'

const Avatar = ({image}) => {
  return (
    <img
      src={`http://localhost:4000/uploads/${image}`}
      alt="avatar"
    />
  );
}

export default Avatar