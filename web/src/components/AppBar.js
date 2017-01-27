import React, { PropTypes } from 'react';

const appBarStyle = {
  height: '48px',
  width: '100%',
  backgroundColor: '#fafafa',
  borderBottom: 'solid 1px #f3f3f3',
  zIndex: '-1',
};

const contentStyle = {
  listStyle: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
};

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '4%',
  paddingRight: '2%'
};

const titleStyle = {
  background: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  cursor: 'pointer',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '1.4em',
};

const logoutStyle = {
  fontFamily: 'Montserrat, sans-serif',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#72218a',
  fontSize: '0.6em',
  cursor: 'pointer',
}

const AppBar = ({onLogoutClicked}) => {
  return (
    <div style={appBarStyle}>
      <div style={contentStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>Peepz</h1>
          <button style={logoutStyle} onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export {
  AppBar
};
