import React, { Fragment, useState } from "react";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if(!control) return null
  return (
    <Fragment>
      <Input
        name="password"
        type={togglePassword ? "text" : "password"}
        placeholder="Enter your password"
        control={control}
      >
        {togglePassword ? (
          <IconEyeOpen
            onClick={() => setTogglePassword(!togglePassword)}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            onClick={() => setTogglePassword(!togglePassword)}
          ></IconEyeClose>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
