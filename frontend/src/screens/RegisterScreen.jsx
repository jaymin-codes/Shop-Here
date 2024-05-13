import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { FaAt, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import signUp from "../assets/signUp.svg";
import logo from "../assets/logo.png";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPswd) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        //sending {email,password} to ${USERS_URL}/auth with login mutation(userApiSlice)

        dispatch(setCredentials({ ...res }));
        //stores the res{email, passsword in local storage with setCredentials reducer(authSlice)

        navigate(redirect);
        //if redirect null than from sign in -> home| else to ?queryparameter
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 gap-4">
        <section className="relative flex h-40 items-end lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="shophere"
            src={signUp}
            className="absolute inset-0 h-full w-full object-cover opacity-100 md:opacity-70"
          />

          {/* <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img src={logo} alt="ShopHere" className="block h-[50px]" />
            </a>

            <h2 className="mt-6 text-xl font-bold text-[#ed553b] sm:text-3xl md:text-4xl">
              Welcome to ShopHere
            </h2>

            <p className="mt-4 leading-relaxed text-[#0074d9]">
            Unlock exclusive deals and personalized shopping experiences by creating your account today.
            </p>
          </div> */}
        </section>

        <main className="flex items-center justify-center py-8 px-2 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <img src={logo} alt="ShopHere" className="block h-[50px]" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                <span className="text-[#ed553b]">Welcome</span> to ShopHere
              </h1>

              <p className="my-2 leading-relaxed text-gray-500">
                Unlock exclusive deals and personalized shopping experiences by
                creating your account today.
              </p>
            </div>
            <div className="text-center text-3xl font-semibold pb-3 md:p-0">
              Register
            </div>

            <Form
              onSubmit={submitHandler}
              className=" border-2 rounded-2xl shadow-xl p-3"
            >
              <div className="w-full mb-3">
                <label
                  htmlFor="Name"
                  className="block text-sm p-1 font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-2 text-md shadow-md"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  htmlFor="email"
                  className="block text-sm p-1 font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-2 text-md shadow-md"
                />
                <span class="absolute flex items-center inset-y-0 right-0 mt-4 mr-3 cursor-none">
                  <FaAt />
                </span>
              </div>

              <div className="relative w-full mb-3">
                <label
                  htmlFor="Password"
                  className="block text-sm p-1 font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2 text-md shadow-md"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span class="absolute flex items-center inset-y-0 right-0 mt-4 mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FaRegEyeSlash className="text-gray-400 font-semibold" />
                ) : (
                  <FaRegEye className="text-gray-400" />
                )}
                </span>
              </div>

              <div className="relative w-full mb-3">
                <label
                  htmlFor="cnfmPassword"
                  className="block text-sm p-1 font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPswd}
                  onChange={(e) => setConfirmPswd(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-2 text-md shadow-md"
                />
                <span class="absolute flex items-center inset-y-0 right-0 mt-4 mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FaRegEyeSlash className="text-gray-400 font-semibold" />
                ) : (
                  <FaRegEye className="text-gray-400" />
                )}
                </span>
              </div>

              <div className="py-2">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-gray-700 underline">
                    terms and conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-700 underline">
                    privacy policy.
                  </a>
                </p>
              </div>

              <div className="flex flex-col">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-[#0074D9] px-4 py-2 text-xl font-medium text-white"
                  disabled={isLoading}
                >
                  Sign Up
                </button>

                <p className="mt-2 text-center text-sm text-gray-500 sm:mt-0">
                  Already have an account?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    className="underline"
                  >
                    SignIn
                  </Link>
                </p>
              </div>
            </Form>
            {isLoading && <Loader />}
          </div>
        </main>
      </div>
      <Toaster />
    </section>
  );
}

export default RegisterScreen;

{
  /* <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>

      <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId="confirmPswd" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPswd}
            onChange={(e) => setConfirmPswd(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Register
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          Already a member?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            LogIn
          </Link>
        </Col>
      </Row>
      
    </FormContainer> */
}
