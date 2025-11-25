import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../slice/orderSlice';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const data = [
  {
    id: 1,
    name: 'Paneer Masala',
    isVeg: 0,
    url: 'https://media.istockphoto.com/id/1226369698/photo/vegetarian-palak-paneer.jpg?s=612x612&w=0&k=20&c=nzQ0TSSIfklxcpFqUuY5vgfXy4cTIz1MiD8c5nzzqpU='
  },
  {
    id: 2,
    name: 'Murga Masala',
    isVeg: 0,
    url: 'https://img.freepik.com/free-photo/front-view-orange-candy-sliced-whole-yummy-dark-surface_140725-14454.jpg?t=st=1714840072~exp=1714843672~hmac=cf7df3d2fb3e070ec690b187d4834f78289874966531da1ed2cb8352cb842b24&w=1380'
  }
];
const Order = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((store) => store.order);

  const [secretKey] = useState('yashrajsingh');
  const [encryptedValue, setEncryptedValue] = useState('');
  const [decryptedId, setDecryptedId] = useState('');
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  const id = searchParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    // Decrypt the encrypted id
    alert(id, encryptedValue + f);
    const decrypted = CryptoJS.AES.decrypt(id, secretKey).toString(CryptoJS.enc.Utf8);
    setDecryptedId(decrypted);
  }, [id]);

  const handleEncrypt = () => {
    // alert('d')
    const encrypted = CryptoJS.AES.encrypt('10', secretKey).toString();
    setEncryptedValue(encrypted);
  };

  const handleDecrypt = () => {
    alert(id);
    const decrypted = CryptoJS.AES.decrypt(id, secretKey).toString(CryptoJS.enc.Utf8);
    setEncryptedValue(decrypted);
  };

  const handleClick = () => {
    // Navigate to another screen
    navigate('/orderlist');
  };

  console.log(orderData);
  return (
    <>
      <div className="content mt-5 ">
        <div className="" style={{ height: '100vh' }}>
          <div className="row">
            <div className=" mt-5 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              <div className="page-section mt-5">
                <h1 className="page-title" onClick={handleDecrypt}>
                  Food Menu
                </h1>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb40">
              <div className="menu-block">
                <h3 className="menu-title my-3" onClick={handleEncrypt}>
                  Starter
                </h3>
                oooo {decryptedId}
                <div className="menu-content">
                  {data.length
                    ? data.map((item, index) => {
                        return (
                          <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                              <div className="dish-img">
                                <a href="#">
                                  <img src={item?.url} alt="" className="img-circle" />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12">
                              <div className="dish-content">
                                <h5 className="dish-title">
                                  <a href="#">{item?.name}</a>
                                </h5>
                                <span className="dish-meta">Onion / Tomato</span>
                                <div className="dish-price">
                                  <p>Rs 10</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-2">
                              <button className="btn btn-success" onClick={() => dispatch(addOrder(item))}>
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })
                    : 'No Dish Found'}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb40">
              <div className="menu-block">
                <h3 className="menu-title my-3">Soup</h3>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Minestrone</a>
                        </h5>
                        <span className="dish-meta"> beans / onions celery / carrots</span>
                        <div className="dish-price">
                          <p>$15</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-success">+</button>
                    </div>
                  </div>
                </div>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Tomato soup</a>
                        </h5>
                        <span className="dish-meta">Cheesiy / Creamy / Sweet</span>
                        <div className="dish-price">
                          <p>$14</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Cream of broccoli</a>{' '}
                        </h5>
                        <span className="dish-meta"> broccoli / milk / cream </span>
                        <div className="dish-price">
                          <p>$9</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb40">
              <div className="menu-block">
                <h3 className="menu-title my-3">Main Course</h3>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Biryani</a>
                        </h5>
                        <span className="dish-meta"> Onion / Tomato</span>
                        <div className="dish-price">
                          <p>$14</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Paneer Butter Masala</a>
                        </h5>
                        <span className="dish-meta">Aloo Masala / Aloo Palak</span>
                        <div className="dish-price">
                          <p>$11</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Chole Bhature</a>{' '}
                        </h5>
                        <span className="dish-meta"> Rice Soft Idli / Ragi idli / Oats Idli </span>
                        <div className="dish-price">
                          <p>$8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb40">
              <div className="menu-block">
                <h3 className="menu-title my-3">Drinks</h3>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Biryani</a>
                        </h5>
                        <span className="dish-meta"> Onion / Tomato</span>
                        <div className="dish-price">
                          <p>$14</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Paneer Butter Masala</a>
                        </h5>
                        <span className="dish-meta">Aloo Masala / Aloo Palak</span>
                        <div className="dish-price">
                          <p>$11</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-content">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="dish-img">
                        <a href="#">
                          <img src="http://via.placeholder.com/70x70" alt="" className="img-circle" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                      <div className="dish-content">
                        <h5 className="dish-title">
                          <a href="#">Chole Bhature</a>{' '}
                        </h5>
                        <span className="dish-meta"> Rice Soft Idli / Ragi idli / Oats Idli </span>
                        <div className="dish-price">
                          <p>$8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderData.length && (
        <div className="carditemdata bg-danger text-center p-2">
          <a href="#" className="text-white" onClick={handleClick}>
            CHECKOUT - {orderData.length} Items
          </a>
        </div>
      )}
    </>
  );
};

export default Order;
