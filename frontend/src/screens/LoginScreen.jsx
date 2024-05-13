import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { FaAt, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import signIn from "../assets/signIn.svg";

import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation(); //search has the query string part of the URL
  const sp = new URLSearchParams(search); //manipulate query string of URL: /login/?redirect=/shipping
  const redirect = sp.get("redirect") || "/"; //redirect is query parameter

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      //sending {email,password} to ${USERS_URL}/auth with login mutation(userApiSlice)

      dispatch(setCredentials({ ...res }));
      //stores the res{email, passsword in local storage with setCredentials reducer(authSlice)

      navigate(redirect);
      //if redirect null than from sign in -> home| else to ?queryparameter
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="relative flex flex-wrap gap-3 lg:items-center">
      <div className="w-[1/2] border-2 rounded-2xl shadow-xl py-5 px-3">
        <div className="mx-auto max-w-lg text-justify px-2">
          <h1 className="text-3xl font-bold text-[#202020]">
            <span className="text-[#ed553b]">Welcome</span> Back,
          </h1>

          <p className="mt-2 text-gray-500 md:text-left text-justify">
            Sign in to explore our latest deals, discover new arrivals, and
            enjoy a seamless shopping experience tailored just for you.
          </p>
        </div>

        <Form
          onSubmit={submitHandler}
          className="mx-auto mb-0 mt-4 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              {/* <FaAt className="absolute inset-y-0 grid right-0 mt-4 text-gray-400" /> */}
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-3 text-md shadow-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute inset-y-0 right-0 grid place-content-center pr-4">
                <FaAt />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border-gray-200 p-3 text-md shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 grid place-content-center pr-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaRegEyeSlash className="text-gray-400 font-semibold" />
                ) : (
                  <FaRegEye className="text-gray-400" />
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col mt-3 items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg bg-[#0074D9] px-4 py-2 text-xl font-medium text-white"
              disabled={isLoading}
            >
              Sign in
            </button>
            <p className="text-[15px] text-gray-500 pt-2">
              No account?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
        {isLoading && <Loader />}
      </div>

      <div className="relative pt-4 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img src={signIn} alt="shop-here" />
      </div>
      <Toaster />
    </section>
  );
}

export default LoginScreen;

{
  /* <FormContainer>
        <Form onSubmit={submitHandler}>
          <h1 className="heading-login">Sign In</h1>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Form>

        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            First time here?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
        
      </FormContainer> */
}
