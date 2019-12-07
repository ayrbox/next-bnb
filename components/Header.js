import Link from 'next/link';

const Header = () => (
  <div className='nav-container'>
    <Link href='/'>
      <a>
        <img src='/static/img/logo.jpg' alt='' className="logo-image" />
      </a>
    </Link>

    <nav>
      <ul>
        <li>
          <Link href='/register'>
            <a>Sign up</a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            <a>Log in</a>
          </Link>
        </li>
      </ul>
    </nav>

    <style jsx>{`
      ul {
        margin: 0;
        padding: 0;
      }

      li {
        display: block;
        float: left;
      }

      a {
        text-decoration: none;
        display: block;
        margin-right: 15px;
        color: #333;
      }

      nav a {
        padding: 1em 0.5em;
      }

      .nav-container {
        border-bottom: 1px solid #eee;
        height: 50px;
      }

      img {
        float: left;
      }

      ul {
        float: right;
      }

      .logo-image {
          height: 50px;
      }
    `}</style>
  </div>
);

export default Header;
