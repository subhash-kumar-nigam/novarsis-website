import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import logo from '../../asserts/img/mylogo.png';
import { searchProductByName } from '../../slice/productSlice';
import { searchByMobile } from '../../slice/customerSlice'
import { useSelector, useDispatch } from 'react-redux';
import { addOrderListDB } from 'slice/orderSliceDB';
import { generateOrderID } from 'common/CommonFun';


const CreateBill = () => {
    const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState(null);
    const [proData, setProdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const billRef = useRef();
    const cartData = useSelector((state) => state.product);
    const customer = useSelector((state) => state.customer);
    const dispatch = useDispatch()
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " Time "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        address: '',
        mobile: '',
        billId: 'CWI_199',
        date: datetime
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const addCustomerBymobile = (customer) => {
        setCustomerInfo({ ...customerInfo, ...customer })
        dispatch(searchByMobile(null))
    }

    useEffect(() => {
        dispatch(searchProductByName(null))
        dispatch(searchByMobile(null))
        return () => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch((err) => {
                    console.error('Failed to clear QR Code scanner.', err);
                });
            }
        };
    }, [html5QrcodeScanner]);

    const initializeScanner = () => {
        if (html5QrcodeScanner) {
            html5QrcodeScanner.clear().then(() => {
                startScanner();
            }).catch((err) => {
                console.error('Failed to clear QR Code scanner.', err);
            });
        } else {
            startScanner();
        }
    };

    const startScanner = () => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        const onScanSuccess = (decodedText, decodedResult) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
            if (decodedText) {
                scanner.clear().then(() => {
                    axios.get(decodedText).then((response) => {
                        const data = response.data;
                        setProdata((prevProData) => [...prevProData, { ...data, quantity: 1 }]);
                        setHtml5QrcodeScanner(null);
                    }).catch((error) => {
                        console.error('Failed to fetch product data.', error);
                        alert('Failed to fetch product data.');
                    });
                    initializeScanner();  // Reinitialize the scanner for the next scan
                }).catch((err) => {
                    console.error('Failed to stop QR Code scanning.', err);
                    initializeScanner();  // Ensure reinitialization even if there's an error
                });
            }
        };

        const onScanFailure = (error) => {
            console.warn(`Code scan error = ${error}`);
        };

        scanner.render(onScanSuccess, onScanFailure);
        setHtml5QrcodeScanner(scanner);
    };

    const changeQuantity = (e, id) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            setProdata((prevProData) =>
                prevProData.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const calculateTotal = () => {
        return proData.reduce((total, item) => total + (item.sprice * item.quantity), 0);
    };

    const createOrder = () => {

        const orderDetails = {
            'orderID': generateOrderID(),
            'customerID': customerInfo?.id,
            'totalAmount': calculateTotal(),
            'shipplingAddress': customerInfo?.address,
            'paymentMethod': 'COD',
            'item_details': proData
        }

        dispatch(addOrderListDB(orderDetails))


    }

    const downloadPdf = () => {
        createOrder();
        const printContent = billRef.current;
        const printWindow = window.open('', '', 'width=900,height=900');
        printWindow.document.write('<html><head><title>Bill Yashsoft</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />');
        printWindow.document.write('</head><body>');

        printWindow.document.write('<div class="container"><div class="row"><div class="col-6"><img class="mt-3" src="http://localhost:3000/static/media/mylogo.8783c030dbdba0f91f99.png" height="100"/></div><div class="col-6 align-item-right"><p>Yashsoft Solution</p></div></div></div>');
        // printWindow.document.write('');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        return;
    };



    const addItemManualy = (data) => {
        const item = proData.find(item => item.id === data.id);
        if (item) {
            alert('item already added')
        } else {
            setProdata((prevProData) => [...prevProData, { ...data, quantity: 1 }]);
            setSearchTerm('')
            dispatch(searchProductByName(null))
        }
    }

    return (
        <div className='container-fluid'>
            <h2>Create Bill</h2>
            <div id="reader" style={{ width: '600px' }}></div>
            <div className='row my-5'>
                <div className='col-sm-5'>
                    <button className='btn btn-success w-100' onClick={initializeScanner}>Scan Item</button>
                </div>
                <span className='mx-3 p-2'>OR</span>
                <div className='col-sm-6'>
                    <input type='search' defaultValue={searchTerm} placeholder='Search product ...' className='form-control' onChange={(e) => { e.target.value.length ?  dispatch(searchProductByName(e.target.value)) : dispatch(searchProductByName(null)) }} />
                    {cartData.data.length ?
                        <div style={{ height: 200, backgroundColor: '#e2d9d9' }}>
                            {cartData.data && cartData.data.map((item, key) => {
                                return <button key={key} className='m-3 p-3 bg-white' onClick={() => addItemManualy(item)}>{item.name} || {item.unit}</button>
                            })}
                        </div>
                        : ''}
                </div>
            </div>
            <div className='row'>
                <label htmlFor='billto'>Search Customer:</label>
                <input type='search' defaultValue={searchTerm} placeholder='Search customer ...' className='form-control' onChange={(e) => { e.target.value ? dispatch(searchByMobile(e.target.value)) : dispatch(searchByMobile(null)) }} />
                {customer.data.length ?
                    <div className='w-100' style={{ backgroundColor: '#e2d9d9' }}>
                        {customer.data && customer.data.map((item, key) => {
                            return <button key={key} className='m-3 p-3 bg-white' onClick={() => addCustomerBymobile(item)}>{item.name} || {item.mobile}</button>
                        })}
                    </div>
                    : ''}
            </div>
            <div ref={billRef}>
                <div className='row my-4'>
                    <div className='col-4'>
                        <label htmlFor='billto'>Bill to:</label>
                        <input type='text' id='billto' className='form-control' name='name' defaultValue={customerInfo.name} onChange={handleInputChange} disabled />
                    </div>
                    <div className='col-4'>
                        <label htmlFor='address'>Mobile:</label>
                        <input type='text' id='mobile' className='form-control' name='mobile' defaultValue={customerInfo.mobile} onChange={handleInputChange} disabled />
                    </div>
                    <div className='col-4'>
                        <label htmlFor='address'>Address:</label>
                        <input type='text' id='address' className='form-control' name='address' defaultValue={customerInfo.address} onChange={handleInputChange} disabled />
                    </div>

                </div>
                <table className="table table-bordered table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proData.length ? proData.map((item, key) => (
                            <tr key={item.id}>
                                <th scope="row">{key + 1}</th>
                                <td>{item.name}</td>
                                <td><input type='number' onChange={(e) => changeQuantity(e, item.id)} value={item.quantity} /></td>
                                <td>{item.sprice}</td>
                                <td>{item.sprice * item.quantity}</td>
                            </tr>
                        )) : <tr><td colSpan="5">No products added</td></tr>}
                        <tr>
                            <td colSpan={4} className="text-right">Total</td>
                            <td>{calculateTotal()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='text-center my-5'>
                <button className='btn btn-success' onClick={downloadPdf}>Print Bill</button>
            </div>
        </div>
    );
};

export default CreateBill;
