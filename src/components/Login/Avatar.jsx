import React from 'react';

const Avatar = (props) => {
  const styles ={
    "borderRadius": "20%",
    "border": "5px solid black",
    "width": "100px"
  }

  return (
    <div>
        <img src="/assets/img/AvatarOwlHOrange.png" style={styles} alt="OwlH Logo"/>
    </div>
  )
}

export default Avatar;