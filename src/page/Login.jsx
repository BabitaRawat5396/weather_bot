import React from "react";
import ImageCard from "../component/ImageCard";
import LoginForm from "../component/LoginForm";

const Login = () => {
  return (
    <main className="container">
      <section className="form-container">
        <ImageCard />
        <LoginForm />
      </section>
    </main>
  );
};

export default Login;
