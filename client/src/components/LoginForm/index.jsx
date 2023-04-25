
import './style.css'

export const LoginForm = () => {
  return (
    <div className="loginForm">
      <label className="">Enter your in-game username:</label>
      <input type="text" name="username" id="username" className="form-control" placeholder="" />
      <button type="submit">Log in</button>
    </div>
  )
}