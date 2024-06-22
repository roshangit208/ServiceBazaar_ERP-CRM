import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import DrawerForService from '../components/DrawerForService';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getToken } from '../auth/getToken';
import { useSelector } from 'react-redux';
const ServicePage = () => {
    const { userInfo } =  useSelector((state)=>(state.user));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [employees, setEmployees] = useState(null);
    const [services , setServices] = useState(null);
    const [newService, setNewService] = useState(null);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const fetchEmployees = async () => {
        try {
            const { data } = await axios.get(baseUrl + "get-employees", config);
            if (data) {
                setEmployees(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchServices = async () => {
        try {
            const { data } = await axios.get(baseUrl + "get-services", config);
            if (data) {
                setServices(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchEmployees();
        fetchServices();
    }, []);

    useEffect(() => {
        fetchServices();
    }, [newService])

    const handleDataFromChild = (data) => {
        setNewService(data);
    }
    const handleUpdate = (data) => {
        setFormData(data);
        toggleDrawer();
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        return await axios.post(baseUrl + "update-service/", formData, config);
    }

    const PromiseNotify = (e) => {
        toast.promise(
            handleUpdateSubmit(e),
            {
                loading: 'Updating...',
                success: () => {
                    handleDataFromChild(formData);
                    toggleDrawer();
                    return <b> Service Updated!</b>
                },
                error: <b>Some Thing Went Wrong.</b>,
            }
        );

        e.target.reset();
    }


    return (
        <>
            <Layout>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <a  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <a  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Service</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className='w-[100%] mt-3 flex justify-end p-2'>
                    <DrawerForService handleDataFromChild={handleDataFromChild} />
                    <div
                        id="drawer-example"
                        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
                        tabIndex="-1"
                        aria-labelledby="drawer-label"
                    >
                        <button
                            type="button"
                            onClick={toggleDrawer}
                            aria-controls="drawer-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>

                        <div className="grid grid-cols-1 gap-4 text-start mt-20">
                            <form className="max-w-sm mx-auto" onSubmit={PromiseNotify}>
                                <div className="mb-5">
                                    <label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Name</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                            </svg>
                                        </span>
                                        <input type="text" id="website-admin" name='name' className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Graphic Designing" value={formData.name}  onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label for="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Price </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>
                                        <input type="number" id="email-address-icon" name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.price}  onChange={handleChange} />
                                    </div>
                                </div>
                                {userInfo?.role !== "employee" && <div className="mb-5">
                                    <label for="employee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Served By </label>
                                    <select id="employee" name='employeeId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.employeeId} onChange={handleChange}>
                                        <option selected>Select</option>
                                        {employees?.map((employee) => (<option value={employee._id}>{employee.name}</option>))}
                                    </select>
                                </div>}

                                <div className="mb-5">
                                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Description</label>
                                    <div className="relative">
                                        <textarea id="description" name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Update Service </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Service Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Description
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {services?.map((service) => (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {service.name}
                                </th>
                                <td class="px-6 py-4">
                                    {service.price}
                                </td>
                                <td class="px-6 py-4">
                                    {service.description}
                                </td>

                                <td class="px-6 py-4">
                                    <a  class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { handleUpdate(service); }} >Edit</a>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    );
}

export default ServicePage;
