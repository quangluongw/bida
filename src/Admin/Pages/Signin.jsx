import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { signin } from "../../Apis/Api.jsx";
import { message, Spin } from "antd";
import * as z from "zod";
import { useState } from "react";
const Signin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Must be a valid email "),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });
  const queryCline = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => signin(data),
    onSuccess: (user) => {
      queryCline.invalidateQueries(["user"], user.user);
      message.success("Thành công");
      localStorage.setItem("auth_token", JSON.stringify(user.token));
      localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/");
    },
    onError: (error) => {
      message.error(error.response.data.error);
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="container mt-[140px] mb-[50px]  w-full ">
      <h1
        style={{ textAlign: "center", marginBottom: 30 }}
        className="text-[29px]"
      >
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-user m-auto"
        style={{ boxShadow: "3px 4px 10px 0px #d3c5c5" }}
      >
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-envelope" />
          <input
            type="email"
            disabled={isLoading}
            className={`input-user`} // Optional: add error class
            placeholder="Enter your Email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"} // Accessibility enhancement
            aria-describedby="email-error" // Links to error message if present
          />
        </div>
        {errors.email?.message && (
          <p id="email-error" className="text-red-400">
            {errors.email.message}
          </p>
        )}

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-lock" />
          <input
            disabled={isLoading}
            type={`${showPassword ? "text" : "password"}`}
            className="input-user"
            id="passwords"
            {...register("password")}
            placeholder="Enter your Password"
          />
          <div className="ii" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
          </div>
        </div>
        {errors.password?.message && (
          <p id="password-error" className="text-red-400">
            {errors.password.message}
          </p>
        )}
        <div className="flex-row ">
          <div className="d-flex gap ">
            <input type="checkbox" />
            <label className="m-t-5">remember password </label>
          </div>
          <Link to={"/emailpassword"}>
            <span className="span">forgot password</span>
          </Link>
        </div>
        <button className="button-submit" type="submit">
          {isLoading && <Spin />} Sign In
        </button>
        <p className="p text-center">
        You already have an account?
          <Link to={"/signup"} className="span">
          Register
          </Link>
        </p>
        <p className="p line text-center">Or With</p>
        <div className="flex-row">
          <div className="btn google" >
            <svg
              version="1.1"
              width={20}
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              //   style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <path
                style={{ fill: "#FBBB00" }}
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
          c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
          C103.821,274.792,107.225,292.797,113.47,309.408z"
              />
              <path
                style={{ fill: "#518EF8" }}
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
          c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
          c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              />
              <path
                style={{ fill: "#28B446" }}
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
          c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
          c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              />
              <path
                style={{ fill: "#F14336" }}
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
          c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
          C318.115,0,375.068,22.126,419.404,58.936z"
              />
            </svg>
            Google
          </div>

        </div>
      </form>
    </div>
  );
};

export default Signin;
