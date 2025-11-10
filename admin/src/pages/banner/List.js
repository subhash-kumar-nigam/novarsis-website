import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBanner, removeBanner } from 'slice/bannerSlice';
import AdminTable from 'common/AdminTable';

const BannerList = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.banner);

  const tableHeaders = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ row }) => <img src={`${process.env.REACT_APP_BACKEND}banner/${row.original.image}`} alt={row.original.name} width={100} />
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button className="btn removebtn" onClick={() => dispatch(removeBanner(row.original.id))}>
          Remove
        </button>
      )
    }
  ];

  console.log(cartData);
  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="mainheadig mx-4">
          <h4 className="text-white font-weight-bold">Slider List</h4>
        </div>
        {cartData?.data?.length > 0 ? <AdminTable tableHeaders={tableHeaders} tableData={cartData.data} /> : <p>No slider available</p>}
      </div>
    </>
  );
};

export default BannerList;
