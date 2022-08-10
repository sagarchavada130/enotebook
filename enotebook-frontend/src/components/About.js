import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return <div>This is About</div>;
};

export default About;
