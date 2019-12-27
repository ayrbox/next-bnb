import { useState } from 'react';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';

import Modal from "./Modal";

export default props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const setUser = useStoreActions(actions => actions.user.setUser);
  const setHideModals = useStoreActions(actions => actions.modals.setHideModals);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/register', {
        email, 
        password,
        passwordConfirmation,
      });
      if(res.data.state === 'error') {
        alert(res.data.message);
        return;
      }
      setUser(email);
      setHideModals();
    } catch(error) {
      alert(error.response.data.message);
      return;
    }
  }
  
  return (
    <Modal close={props.close}>
      <h2>Sign up</h2>
      <div>
        <form onSubmit={handleSubmit}>
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