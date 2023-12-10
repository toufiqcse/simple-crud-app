// @ts-nocheck
/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';

function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [FBlink, setFbLink] = useState('');
  const [isValidFbLink, setIsValidFbLink] = useState(true);


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

  const handleFbLink = (event) => {
    const inputFbLink = event.target.value;
    setFbLink(inputFbLink);

    // Validate Facebook link using a regular expression
    const fbLinkRegex = /(?:https?:\/\/)?(?:www\.)?facebook\.com/i;
    setIsValidFbLink(fbLinkRegex.test(inputFbLink));
  };


  const handleAddMembers = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value
    const email = form.email.value
    const roles = form.role.value;
    const ratings = form.rating.value;

    // const FBlink = form.fbLink.value;
    if (isValidFbLink) {
      // Process the form data
      console.log('Valid Facebook link:', FBlink);
    } else {
      // Display an error message or take appropriate action
      console.error('Invalid Facebook link. Please enter a valid link.');
    }
    const members = { name, email, roles, ratings, FBlink, selectedImage }
    console.log(members);


    // send to the server
    fetch('http://localhost:5000/members', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(members)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('Member Added Successfully!')
        }
        form.reset()
      })
  }



  return (
    <>
      <div className=' h-screen'>
        <h2 className='text-4xl font-semibold'>Simple CRUD Application </h2>
        <form onSubmit={handleAddMembers} className='my-8 flex flex-col justify-center items-start md:w-1/2 mx-auto'>
          <label className='text-xl pr-2 mb-1' htmlFor="name">Name: </label>
          <input className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl' type="text" name="name" placeholder='name' id="" required />
          <label htmlFor="email" className='text-xl pr-2 mb-1'>Email: </label>
          <input className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl' type="email" name="email" placeholder='email' id="" required />
          <label className='text-xl pr-2 mb-1' htmlFor="role">Role: </label>
          <select name="role" id="" required className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl'>

            <option value="select role" >Select Role</option>
            <option value="digital marketer">Digital Marketer</option>
            <option value="web developer">Web Developer</option>
            <option value="web analyst">Web analyst Expert</option>
            <option value="seo expert">SEO Expert</option>
          </select>

          <label className='text-xl pr-2 mb-1' htmlFor="rating">Rating:</label>
          <input className='w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl' type="number" name="rating" placeholder='rating' id="" required />

          <label className='text-xl pr-2 mb-1' htmlFor="fbLink">Fb Link</label>
          <input
            className={`w-full mb-3 px-4 py-1 border-none outline-none rounded-md text-xl ${isValidFbLink ? '' : 'border-red-500' // Add a red border for invalid input
              }`}
            type="text"
            name="fbLink"
            placeholder="Enter Facebook profile/page/username link"
            value={FBlink}
            onChange={handleFbLink}
            required
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
            required
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
            <input className='bg-green-600 text-white font-bold cursor-pointer px-4 py-2 rounded-sm' type="submit" value="Add member" />
            <div className='bg-orange-500 px-4 py-2 rounded-sm ml-8'>
              <Link className='text-white  hover:text-white' to={'/members'}>All Members</Link>
            </div>
          </div>
        </form>
      </div>

    </>
  )
}

export default App
