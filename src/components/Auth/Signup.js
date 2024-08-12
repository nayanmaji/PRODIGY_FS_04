import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/register', { name, email, password });
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <section className="bg-light py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h2 className="fs-4 fw-normal text-center text-secondary mb-4">Sign Up to your account</h2>
                <form onSubmit={handleSignup}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="name" className="form-label">Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="email" className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                      <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="password" className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">Sign Up</button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">Have an account? <a href="/" className="link-primary text-decoration-none">Sign In</a></p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Signup;
