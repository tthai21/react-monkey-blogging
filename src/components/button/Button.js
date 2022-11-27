import React from "react";
import styled, { css } from "styled-components";
import { LoadingSpinner } from "../loading";
import PropTypes from "prop-types";

const ButtonStyle = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  ${(props) =>
    props.bgColor !== "primary" &&
    css`
      color: ${(props) => props.theme.primary}
    `};
  ${(props) =>
    props.bgColor === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler OnClick
 * @require
 * @param {string} type Type of button 'button' || 'submit'
 */

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  
  return (
    <ButtonStyle type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyle>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
export default Button;
