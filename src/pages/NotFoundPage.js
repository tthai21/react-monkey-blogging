import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageStyles = styled.div`
height: 100vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
.logo{
    display: block;
    margin-bottom: 40px;
}
.heading{
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
}
.homepage-link{
    color: ${props => props.theme.primary};
    font-size: 20px;
    font-weight: bold;
}
`

const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
           <NavLink to="/" className="logo">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" />
           </NavLink>
           <h1 className='heading'> Oops! Page not found</h1>
           <NavLink className="homepage-link" to="/">Click here to get back to Home Page</NavLink>
        </NotFoundPageStyles>
    );
};

export default NotFoundPage;