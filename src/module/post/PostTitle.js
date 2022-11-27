import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.25px;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `}
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `}
  @media screen and (max-width: 1023.98px) {
    font-size: 14px;
  }
`;

const PostTitle = ({ to = "/", children, className = "", size = "normal" }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
