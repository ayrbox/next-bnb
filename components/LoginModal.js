import { useState } from 'react';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';

import Modal from "./Modal";

export default props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStoreActions(actions => actions.user.setUser);
  const setHideModals = useStoreActions(actions => actions.modals.setHideModals);


  const handleLogin = async (e) => {
    try {
      const res = await axios.post('/api/auth/login', {
        email, 
        password,
      });

      if(res.data.status === 'error') {
        alert(res.data.message);
        return;
      }
      setUser(email);
      setHideModals();
    } catch (error) {
      alert(error.response.data.message);
      return;
    }
  };
  
  return (
    <Modal close={props.close}>
      <h2>Log in</h2>
      <div>
        <form
          onSubmit={handleLogin}
        >
          <input
            id="email"
            type="email"
            placeholder="Email address" 
            onChange={e => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button>Log in</button>
        </form>
        <p>
          Don't have an account yet?{" "}
          <a href="#" onClick={() => props.showSignup()}>
            Sign up
          </a>
        </p>
      </div>
    </Modal>
  );
}