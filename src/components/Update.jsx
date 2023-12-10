// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData()
    const { name, email, ratings, roles, FBlink, _id, selectedImage } = loadedUser;
    const navigate = useNavigate()
    const [selectedImages, setSelectedImage] = useState(selectedImage);
    const [FBlinks, setFbLink] = useState(FBlink);
    const [isValidFbLink, setIsValidFbLink] = useState(true);
    const handleFbLink = (event) => {
        const inputFbLink = event.target.value;
        setFbLink(inputFbLink);

        // Validate Facebook link using a regular expression
        const fbLinkRegex = /(?:https?:\/\/)?(?:www\.)?facebook\.com/i;
        setIsValidFbLink(fbLinkRegex.test(inputFbLink));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const file = files[0];
        // handle image format
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a PNG or JPG image.');
            e.target.value = '';
            return;
        }
        // handle image size
        const maxSizeInBytes = 900 * 1024; // 500KB
        if (file.size > maxSizeInBytes) {
            alert('Please select an image smaller than 900 KB.');
            e.target.value = '';
            return;
        }
        setSelectedImage(
            {
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type,
            }
        );
    };





    const handleUpdateMember = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const roles = form.role.value;
        const ratings = form.rating.value;
        const FBlink = form.fbLink.value;
        if (isValidFbLink) {
            // Process the form data
            console.log('Valid Facebook link:', FBlink);
        } else {
            // Display an error message or take appropriate action
            console.error('Invalid Facebook link. Please enter a valid link.');
        }
        const members = { name, email, roles, ratings, FBlink, selectedImages }
        console.log(members);
        // send to the server
        fetch(`http://localhost:5000/members/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(members)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert("Update successfully")
                    navigate('/members')
                } else if (data.modifiedCount === 0) {
                    alert("Please Update the Field ")
                }
            })
    }
    console.log(FBlinks);

    return (
        <div>

            <div className=''>
                <h2 className='text-4xl font-semibold'>Update Info</h2>
                <form onSubmit={handleUpdateMember} className='my-8 flex flex-col justify-center items-start md:w-1/2 mx-auto'>
                    <label className='text-xl pr-2 mb-1' htmlFor="name">Name: </label>
                    <input className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl' type="text" name="name" placeholder='name' id="" defaultValue={name} />

                    <label htmlFor="email" className='text-xl pr-2 mb-1'>Email: </label>
                    <input className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl' type="email" name="email" placeholder='email' id="" defaultValue={email} />
                    <label className='text-xl pr-2 mb-1' htmlFor="role">Role: </label>
                    <select name="role" id="" defaultValue={roles} className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl'>
                        <option value="" >Select Role</option>
                        <option value="digital marketer">Digital Marketer</option>
                        <option value="web developer">Web Developer</option>
                        <option value="web analyst">Web analyst Expert</option>
                        <option value="seo expert">SEO Expert</option>
                    </select>

                    <label className='text-xl pr-2 mb-1' htmlFor="rating">Rating:</label>
                    <input className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl' type="number" name="rating" placeholder='rating' id="" defaultValue={ratings} />

                    <label className='text-xl pr-2 mb-1' htmlFor="fbLink">Fb Link</label>
                    <input
                        className={`w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl ${isValidFbLink ? '' : 'border-red-500' // Add a red border for invalid input
                            }`}
                        type="text"
                        name="fbLink"
                        placeholder="Enter Facebook profile/page/username link"
                        // value={FBlinks}
                        onChange={handleFbLink}
                        defaultValue={FBlink}

                    />
                    {!isValidFbLink && (
                        <p className="text-red-500">Please enter a valid Facebook link.</p>
                    )}

                    <label htmlFor="imageInput" className="block text-xl mb-2">
                        Add Image:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="imageInput"
                        onChange={handleImageChange}
                        multiple={false}
                        name="image"
                    />
                    <label
                        htmlFor="imageInput"
                        className="w-full px-4 py-2 border-none outline-none rounded-md text-xl border-green-400 border-2 bg-purple-400 flex items-center justify-center cursor-pointer"
                    >
                        Choose Image
                    </label>

                    <label
                        htmlFor="image"
                        className='mb-3'
                    >
                        {selectedImage ? (
                            <div className='flex justify-between items-center'>
                                <span className='text-red-600 text-xl'>
                                    {selectedImage.name.length > 15
                                        ? selectedImage.name.slice(0, 15) + `... ${selectedImage.type}`
                                        : selectedImage.name}
                                </span>
                            </div>
                        ) : (
                            <></>
                        )}
                    </label>
                    <div className='flex justify-between items-center'>
                        <img className='w-[100px] h-[100px] rounded-full' src={selectedImages?.url} alt="" />
                        <input className='ml-8 bg-green-500 px-5 text-xl font-semibold py-2 rounded-sm text-white cursor-pointer' type="submit" value="update" />
                    </div>
                </form>
            </div>










        </div>
    );
};

export default Update;