function Footer() {
  return (
    <footer className="footer-section ">
      <div className="container ">
        <div className="row ">
          <div className="col-lg-4 ">
            <div className="footer-item ">
              <div className="footer-logo ">
                <a href="# ">
                  <img src="img/Home/logo5.png " alt=" " />
                </a>
              </div>
              <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="footer-item ">
              <h5>Newsletter</h5>
              <div className="newslatter-form ">
                <input type="text " placeholder="Your Email Here " />
                <button type="submit ">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="footer-item ">
              <h5>Contact Info</h5>
              <ul>
                <li>
                  <img src="img/placeholder.png " alt=" " />
                  1525 Boring Lane,
                  <br />
                  Los Angeles, CA
                </li>
                <li>
                  <img src="img/phone.png " alt=" " />
                  +1 (603)535-4592
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright ">
        <div className="container ">
          <div className="row ">
            <div className="col-lg-12 ">
              <ul>
                <li className="active ">
                  <a href="index.html ">Home</a>
                </li>
                <li>
                  <a href="# ">About</a>
                </li>
                <li>
                  <a href="# ">Rooms</a>
                </li>
                <li>
                  <a href="# ">Facilities</a>
                </li>
                <li>
                  <a href="# ">News</a>
                </li>
                <li>
                  <a href="# ">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row pt-5 ">
            <div className="col-lg-12 ">
              <div className="small text-white text-center ">
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script> All rights reserved{' '}
                <i className="fa fa-heart-o " aria-hidden={true}></i> by{' '}
                <a href="https://yashsoftsolution.com/ " target="_blank ">
                  Yashsoft Solution
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
