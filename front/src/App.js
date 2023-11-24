import "./App.css";
import { useState } from "react";
import axios from "axios";


function App() {

  const[data, setData] = useState({
    fname: "",
    lname: "",
    email: ""
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [reguser, setReguser] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/login", user);
        // console.log(res.data.status);

        if(res.data.status === "success"){
          setData(res.data.user);
        }
        else{
          alert("Invalid Credentials");
        }
      }
      catch (error) {
        console.log(error);
      }
    var form = document.getElementById("myform");
    form.reset();
  };

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setReguser({ ...reguser, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (reguser.password === reguser.cpassword) {
      try {
        const res = await axios.post("http://localhost:5000/register", reguser);
        console.log(res);
      }
      catch (error) {
        console.log(error);
      }

      var form = document.getElementById("regform");
      form.reset();
    
    }
    else{
      alert("Password and Confirm Password should be same");
    }

  };



  return (
    <div className="App">
      <h1>React User Authenication on Backend</h1>

      <form onSubmit={login} method="POST" id="myform" >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} required/>
        <button type="submit">Login</button>
      </form>

      <div>
        <h5>Register Here</h5>
        <form onSubmit={register} method="post" id="regform">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="remail" onChange={handleRegChange} required/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="rpassword" onChange={handleRegChange} required/>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="cpassword" id="cpassword" onChange={handleRegChange} required/>
          <button type="submit">Register</button>
        </form>
      </div>

      <div>
        <h5>User Details</h5>
        Name : {data.fname} {data.lname}
        <br />
        Email : {data.email}

      </div>

    </div>
  );
}

export default App;
