import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGallery, removeGallery } from 'slice/gallerySlice';
import AdminTable from 'common/AdminTable';

const List = () => {
    const dispatch = useDispatch();
    const galleryData = useSelector((state) => state.gallery);

    const tableHeaders = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
     {
  Header: 'Image',
  accessor: 'image',
  Cell: ({ row }) => (
    row.original.image ? (
<img
         src={`${process.env.REACT_APP_BACKEND}gallery/${row.original.image}`}
  alt={row.original.name}
  width={100}
/>
    ) : (
      <span>No Image</span>
    )
  )
},

        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <button
                    className="btn removebtn"
                    onClick={() => dispatch(removeGallery(row.original.id))}
                >
                    Remove
                </button>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="mainheadig mx-4">
                    <h4 className="text-white font-weight-bold">Gallery List</h4>
                </div>
                {galleryData?.data?.length > 0 && (
                    <AdminTable tableHeaders={tableHeaders} tableData={galleryData.data} />
                )}
            </div>
        </>
    );
}

export default List;
