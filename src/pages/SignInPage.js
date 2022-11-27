import React, { useEffect } from "react";
import AuthenticationPage from "./AuthenticationPage";
import { Label } from "components/label";
import { Field } from "components/field";

import { Input } from "components/input";
import { Button } from "components/button";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address ")
    .required("Please enter your email address"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .min(8, "password must be 8 characters or more")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  //   reactHookForm
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // Handle errors
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors?.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 100,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        {/* email */}
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>

        {/* password */}
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        {/* Didn't have account */}
        <div className="have-account">
          Didn't have an account? <NavLink to={"/sign-up"}>Register</NavLink>
        </div>

        {/* Button */}
        <Button
          bgColor="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0px auto",
          }}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
