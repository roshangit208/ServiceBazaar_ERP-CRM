import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CompanySignUp = () => {
  const [formData, setFormData] = useState({ role: "owner", enabled: true });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    return await axios.post(baseUrl + "auth/admin-register", formData);

  }

  const PromiseNotify = (e) => {
    toast.promise(
      handleSubmit(e),
      {
        loading: 'Registering...',
        success: () => {
          toast('Verify The Email to Login', {
            icon: '👀',
          });
          return <b> Company Registred!</b>
        },
        error: <b>Some Thing Went Wrong.</b>,
      }
    );

    e.target.reset();
  }


  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {/* <div classNameName='w-[42%] h-[99%] bg-white rounded-3xl flex flex-col items-center justify-between p-5'>
        <div classNameName='w-[90%] h-[20%] flex  flex-col justify-center items-center gap-3'>
          <img src="./assets/sblogoblack.png" alt="companylogo" classNameName='h-[60px]' />
          <span classNameName='text-[0.956rem]  text-nowrap'> Simple Business Management Software </span>
        </div>
        <form classNameName='flex flex-col w-[75%] h-[70%] gap-8  items-center' onSubmit={PromiseNotify} >
          <div classNameName='w-[100%] h-[65%] flex flex-col gap-3'>
            <TextField id="outlined-basic" name='name' label="Name*" variant="outlined" size='small' onChange={handleChange} />
            <TextField id="outlined-basic" name='email' label="Email*" variant="outlined" size='small' onChange={handleChange} />
            <TextField id="outlined-basic" name='phone' label="Phone" variant="outlined" size='small' onChange={handleChange} />
            <TextField id="outlined-basic" name='companyName' label="CompanyName" variant="outlined" size='small' onChange={handleChange} />
          </div>
          <Button type='submit' variant="contained" style={{ backgroundColor: "black", color: "white" }}>Company Sign Up</Button>
        </form>
      </div> */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a  className="flex items-center mb-0 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-[230px] h-[60px] mr-2 object-cover" src="../assets/sblogo.png" alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 space-y-1 md:space-y-3 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-1 md:space-y-2" onSubmit={PromiseNotify}>
                <div>
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} />
                </div>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} />
                </div>
                <div>
                  <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                  <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} />
                </div>
                <div>
                  <label for="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company name</label>
                  <input type="text" name="companyName" id="companyName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} />
                </div>
                
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" style={{ backgroundColor: "rgb(37 99 235)" }} >Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default CompanySignUp;
