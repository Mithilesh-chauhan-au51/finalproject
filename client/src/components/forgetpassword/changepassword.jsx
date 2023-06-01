import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = (props) => {
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [showPassword1, setShowPassword] = useState(false);
   const [showPassword2, setShowPassword2] = useState(false);
  const handleToggle1 = () => {
    setShowPassword(!showPassword1);
  }
   const handleToggle2 = () => {
    setShowPassword2(!showPassword2);
  }

  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    return () => clearTimeout(timeout);

  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      if (newPassword === confirmPassword) {
        const response = await axios.post('https://capstoneproject-server--harry-potter1.repl.co/changepassword', {
          email: props.mail,
          password: newPassword
        });
        setSuccessMessage(response.data.message);
        navigate("/login");
      } else {
        setSuccessMessage("New password and confirm password do not match");
      }
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-3">Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                id="password"
                ref={newPasswordRef}
                placeholder="Enter new password"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleToggle1}
                >
                  <FontAwesomeIcon
                    icon={showPassword1 ? faEyeSlash : faEye}
                    className="icon"
                  />
                </button>
              </div>
            </div>
          </div>
          
          <div className="form-group mt-3">
            <div className="input-group">
              <input
                type={showPassword2 ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                ref={confirmPasswordRef}
                placeholder="Confirm password"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleToggle2}
                >
                  <FontAwesomeIcon
                    icon={showPassword2 ? faEyeSlash : faEye}
                    className="icon"
                  />
                </button>
              </div>
            </div>
          </div>
          {successMessage && <div className="alert alert-danger">{successMessage}</div>}
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
