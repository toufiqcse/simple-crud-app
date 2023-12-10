// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';


const Members = () => {
    const loadedUser = useLoaderData()
    const [members, setMembers] = useState(loadedUser)

    const handleDeleteMember = (_id) => {
        console.log("delete", _id);
        fetch(`http://localhost:5000/members/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Delete Successfully")
                    const reamingMember = members.filter((member => member._id !== _id));
                    setMembers(reamingMember)
                }
            })
    }

    return (
        <div className='w-full '>
            <table className='table-auto border-separate border border-slate-500 overflow-y-scroll mb-6'>
                {/* <h3>Total Member {members.length}</h3> */}
                <thead className='bg-orange-700 text-white'>
                    <tr className=''>
                        <th className='text-xl py-4 px-2  border-gray-500'>Name</th>
                        <th className='text-xl py-4 px-2  border-gray-500'>Email</th>
                        <th className='text-xl py-4 px-2  border-gray-500'>Role</th>
                        <th className='text-xl py-4 px-2  border-gray-500'>Ratings</th>
                        <th className='text-xl py-4 px-2  border-gray-500'>Facebook</th>
                        <th className='text-xl py-4 px-2  border-gray-500'>Image</th>
                        <th className='text-xl py-4 px-2  border-gray-500'>Edit</th>
                        <th className='text-xl py-4 px-3  border-gray-500'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members.map((member) => (

                            <tr key={member?._id} className=" hover:cursor-pointer hover:transition-all duration-500  hovered-row  font-medium hover:bg-purple-800  select-none bg-purple-700 text-slate-200 ">
                                <td className="  px-1">
                                    {member?.name}
                                </td>
                                <td className='  border-gray-500'>{member?.email}</td>
                                <td className='  border-gray-500'>{member?.roles}</td>
                                <td className='  border-gray-500'>
                                    {member?.ratings}
                                </td>
                                <td className="px-4  border-gray-500 ">
                                    {member?.FBlink}
                                </td>
                                <td className='px-4 border-gray-500'>
                                    <img className='w-[50px] mx-auto  '
                                        src={member?.selectedImage?.url}
                                        alt={member?.selectedImage?.name}
                                    />
                                </td>
                                <td className=' px-1 border-gray-500'>
                                    <Link to={`${member?._id}`}>
                                        <button className='bg-green-600 text-white border-none outline-none'>
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td className=' border-gray-500 px-1'>
                                    <button onClick={() => handleDeleteMember(member?._id)} className="bg-red-600 text-white border-none outline-none">
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>

            </table>
            <Link className='bg-red-700 px-4 py-2 hover:text-blue-300 rounded-sm text-white mt-4' to={'/'}>Back to Home</Link>
        </div>
    );
};

export default Members;