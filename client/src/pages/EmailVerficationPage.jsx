import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';

const EmailVerficationPage = () => {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const param = useParams();
    const [verified, setVerified] = useState(false);
    const [formData, setFormData] = useState({});
    const handleVerify = async () => {
        try {
            const token = param.token;
            const { data } = await axios.post(baseUrl + `auth/verifymail/${token}`);
            if (data) {
                setVerified(true);
                setFormData((prevData) => ({
                    ...prevData,
                    ["id"]: data.id
                }))
            }

        } catch (err) {

        }

    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        return await axios.post(baseUrl + `auth/setpassword`, formData);
    }

    const PromiseNotify = async (e) => {
        toast.promise(
            handleSubmit(e),
            {
                loading: 'Setting...',
                success: () => {
                    navigate('/login');
                    return <b> Password Set Successfully!</b>
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
            {!verified ?
                <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                    <button
                        className="mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded my-6 py-4 px-8 shadow-lg"
                        onClick={handleVerify}
                    >
                        Verify
                    </button>
                </div>

                :
                //  <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
                //     <div className='w-[88vw] h-[97vh] flex bg-[#0F0F0F] rounded-3xl items-center p-[0.15rem]' >
                //         <div className='w-[42%] h-[99%] bg-white rounded-3xl flex flex-col items-center gap-16 p-5'>
                //             <div className='w-[90%] h-[20%] flex  flex-col justify-center items-center gap-3'>
                //                 <img src="../assets/sblogoblack.png" alt="companylogo" className='h-[60px]' />
                //                 <span className='text-[0.956rem]  text-nowrap'> Simple Business Management Software </span>
                //             </div>
                //             <form className='flex flex-col w-[75%] h-[35%] gap-1 items-center' onSubmit={PromiseNotify} >
                //                 <div className='w-[100%] h-[65%] flex flex-col gap-3'>
                //                     <TextField id="outlined-basic" name='password' label="Set Password" variant="outlined" size='small' type='password' onChange={handleChange} />
                //                     <TextField id="outlined-basic" name='cnfpassword' label="Confirm Password" variant="outlined" size='small' type='password' onChange={handleChange} />
                //                 </div>
                //                 <Button type='submit' variant="contained" style={{ backgroundColor: "black", color: "white" }}>Set Password</Button>
                //             </form>
                //         </div>
                //     </div>
                // </div>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-[230px] h-[60px] mr-2 object-cover" src="../assets/sblogo.png" alt="logo"/>
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Set password of your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={PromiseNotify}>
                                    <div>
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set Password</label>
                                        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label for="cnfpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Confirm Password</label>
                                        <input type="password" name="cnfpassword" id="cnfpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"style={{backgroundColor:"rgb(37 99 235)"}}>Set Password</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <a  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            }
        </>
    );
}

export default EmailVerficationPage;
