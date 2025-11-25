import logo from '../asserts/img/logo.png';
function Header() {
  // const [displayAvailability, setDisplayAvailability] = useState(false);
  // const { headersclassNamees, linklists } = props
  // const data = useSelector((state) => state.product);
  const toggleBooking = () => {
    setDisplayAvailability(true);
  };

  return (
    <header className={'header-section bg-light'}>
      <div className=" ">
        <div className="inner-header ">
          <div className="logo ">
            <a href="/">
              <img src={logo} alt=" " height="80px" />
            </a>
          </div>
          <div className="nav-right ">
            <button className="primary-btn" onClick={toggleBooking}>
              Check Availibility
            </button>
          </div>
          <nav className="main-menu mobile-menu ">
            <ul>
              <li className=" active ">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#founder">About</a>
              </li>
              <li>
                <a href="# ">Rooms</a>
              </li>
              <li>
                <a href="# ">Pages</a>
                <ul className="drop-menu ">
                  <li>
                    <a href="# ">About Us</a>
                  </li>
                  <li>
                    <a href="# ">Rooms</a>
                  </li>
                  <li>
                    <a href="# ">Services</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#fac">News</a>
              </li>
              <li>
                <a href="# ">Contact</a>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap "></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
