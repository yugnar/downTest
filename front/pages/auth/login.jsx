import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import api from "../../axios";

const LogIn = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    pwd: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("http://localhost:3000/login", {
        username: form.email,
        password: form.pwd,
      })
      .then((res) => router.push("/"));
  };

  return (
    <div id="login">
      <h3 className="text-center text-white pt-5">Login form</h3>
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={handleSubmit}>
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="username" className="text-info">
                    Email:
                  </label>
                  <br />
                  <input
                    type="email"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={(e) => setForm({ ...form, pwd: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="submit"
                  />
                </div>
                <div id="register-link" className="text-right">
                  <Link href="/auth/register">
                    <a>Register here</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
