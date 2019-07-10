import React from 'react';
import MainContainer from './MainContainer'

class NotFound extends React.Component {
  render() {
    return (
      <MainContainer>
        <h1 className="page-header">Not Found</h1>
        <p>Page Not Found</p>
      </MainContainer>
    ); 
  } 
} 

export default NotFound;