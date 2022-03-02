import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../slices/auth";
import { authSelector } from "../../selectors";
import cn from "classnames";

const Register = () => {
  const dispatch = useDispatch();
  const authRegister = useSelector(authSelector);
  console.log(!!authRegister.error, "!!authRegister.error");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: 0,
    },
    onSubmit: (values) => {
      dispatch(
        registerAction({
          name: values.name,
          email: values.email,
          password: values.password,
          age: values.age,
        })
      );
    },
    validate: (values) => {
      const errors: {
        name?: string;
        email?: string;
        password?: string;
        age?: string;
      } = {};
      if (!values.name) {
        errors.name = "Name is empty";
      }
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
      if (!values.age) {
        errors.age = "Age is empty";
      }
      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col m-10">
      <label className="my-0 mx-auto" htmlFor="name">
        Register
      </label>
      <input
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="name"
      />
      {formik.errors?.name?.length !== 0 ? (
        <div>{formik.errors.name}</div>
      ) : null}
      <input
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        className="text-green-600"
        placeholder="email"
      />
      {formik.errors?.email?.length !== 0 ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <input
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="password"
      />
      {formik.errors?.password?.length !== 0 ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <input
        id="age"
        name="age"
        value={formik.values.age}
        onChange={formik.handleChange}
        className="text-green-600"
        placeholder="age"
      />
      {formik.errors?.age?.length !== 0 ? <div>{formik.errors.age}</div> : null}
      <button
        className={cn(
          "bg-orange-200 hover:bg-orange-300 hover:text-white text-red-600 font-semibold",
          {
            "border-2 border-red-600": !!authRegister.error,
          }
        )}
        type="submit"
      >
        Register
      </button>
      {!authRegister.error && (<div>{authRegister.error}</div>)}
      {!authRegister.loading && authRegister.token?.length !== 0 && <div>{authRegister.token}</div>}
    </form>
  );
};
export default Register;
