import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"


const LoginPopup = ({ setShowLogin }) => {

  const {url ,setToken} = useContext(StoreContext)

    const [currntState, setCurrntState] = useState("login")
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event)=>{
      event.preventDefault()
      let NewUrl = url;
      if (currntState==="login") {
        NewUrl += "/api/user/login"
      } else {
        NewUrl += "/api/user/register"
      }

      const response = await axios.post(NewUrl,data)

      if (response.data.Success) {
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
      } else {
        alert(response.data.message)
      }
    }

    

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currntState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currntState==="login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='password' required/>
        </div>
        <button type='submit'>{currntState==='Sign up'?"create new account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing to browse or use our services, you acknowledge that you have read and agree to our Privacy Policy</p>
        </div>
        {currntState==="login"?
        <p>create a new account? <span onClick={()=>setCurrntState("Sign up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrntState("login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup