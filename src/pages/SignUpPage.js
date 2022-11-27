import React from "react";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Input } from "components/input";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const schema = yup.object({
  fullname: yup.string().required("Please enter your full name"),
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

const SignUpPage = () => {
  const navigate = useNavigate();
  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    // watch,
    // reset,
  } = useForm({
  mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;

    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });

    toast.success("Register user successfully!!!");
    navigate("/");
  };

  // Handle Errors
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors?.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 100,
      });
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        {/* username */}
        <Field>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            name="fullname"
            type="text"
            placeholder="Enter your full name"
            control={control}
          ></Input>
        </Field>

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
        <div className="have-account">
          Already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
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
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
