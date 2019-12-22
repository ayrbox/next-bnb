import Modal from "./Modal";
export default props => (
  <Modal close={props.close}>
    <h2>Sign up</h2>
    <div>
      <form>
        <input id="email" type="email" placeholder="Email Address" />
        <input id="password" type="password" placeholder="Password" />
        <input
          id="passwordConfirmation"
          type="password"
          placeholder="Enter password again"
        />
        <button>Sign up</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="javascript:;" onClick={() => props.showLogin()}>
          Log in
        </a>
      </p>
    </div>
  </Modal>
);
