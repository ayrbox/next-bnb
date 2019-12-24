import { useState } from 'react';
import axios from 'axios';

import Modal from "./Modal";

export default props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const submit = async () => {
    const response = await axios.post('/api/auth/register', {
      email, 
      password,
      passwordConfirmation,
    });
    console.log('Response', response);
  }
  
  return (
    <Modal close={props.close}>
      <h2>Sign up</h2>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Enter password again"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <button>Sign up</button>
        </form>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={() => props.showLogin()}>
            Log in
          </a>
        </p>
      </div>
    </Modal>
  );
}