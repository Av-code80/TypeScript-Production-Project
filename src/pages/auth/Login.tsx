import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../selectors";
import {
  deleteAccountAction,
  loginAction,
  logoutAction,
} from "../../slices/auth";
import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

interface LocationState {
  from: string;
}
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  let from = "";
  const state = location.state as LocationState;
  if (state) from = state.from;

  useEffect(() => {
    if (auth.token && from) {
      navigate(from, { replace: true });
    }
  }, [auth]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values, "values**");
      dispatch(
        loginAction({
          email: values.email,
          password: values.password,
        })
      );
    },
    validate: (values) => {
      const errors: { email?: string; password?: string } = {};
      if (!values.email) {
        errors.email = "Email is epmty";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Email format is not correct";
      }

      if (!values.password) {
        errors.password = "Password is empty";
      }
      return errors;
    },
  });

  const handleLogout = () => {
    dispatch(logoutAction({}));
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccountAction({}));
  };

  return (
    <>
      <header className="flex flex-col bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-2">
        <div>
          <ToastContainer />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className=" flex flex-row ">
            {!auth.loading && auth?.user?.name?.length && (
              <div className="text-sm mr-8 mt-2 font-semibold text-gray-100">
                Hi {auth.user.name}
              </div>
            )}
            <div>
              <button
                onClick={handleLogout}
                disabled={!auth.token}
                className="p-2 font-semibold bg-gray-300 hover:text-red-500 hover:bg-gray-400 rounded"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="">
            <button
              onClick={handleDeleteAccount}
              disabled={!auth.token}
              className="p-2 font-semibold bg-gray-400 text-red-500 hover:text-red-300 hover:bg-gray-500 rounded"
            >
              Delet account!
            </button>
          </div>
        </div>
      </header>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-1/3 border-gray-200 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded mt-24 mx-auto border flex-col m-10"
      >
        <label
          className="my-0 font-semibold mx-auto text-gray-500 "
          htmlFor="email"
        >
          Email and Password
        </label>
        <input
          className="border-gray-200 border border-x-0 p-1 placeholder:text-center"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="email"
        />
        {formik.errors?.email?.length !== 0 ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <input
          className="border-gray-200 border border-x-0 placeholder:text-center p-1"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="password"
        />
        {formik.errors?.password?.length !== 0 ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button
          className={cn(
            "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:bg-gradient-to-r hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200  hover:text-gray-500 text-white font-semibold",
            {
              "border-2 border-red-600": !!auth.error,
            }
          )}
          type="submit"
          disabled={auth.loading}
        >
          {auth.loading ? "Loading" : "Login"}
        </button>
        {auth.error && <div>{auth.error?.message}</div>}
      </form>
    </>
  );
};

export default Login;
