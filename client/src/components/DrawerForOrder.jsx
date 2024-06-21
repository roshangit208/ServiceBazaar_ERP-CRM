import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getToken } from '../auth/getToken';
import { useSelector } from 'react-redux';


const DrawerForOrder = ({ handleDataFromChild }) => {
    const { userInfo } = useSelector((state) => (state.user));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const initialState = userInfo?.role === "client" ? { clientId: userInfo._id } : {};
    const [formData, setFormData] = useState(initialState);
    const [clients, setClients] = useState(null);
    const [services, setServices] = useState(null);
    const [quantity , setQuantity] = useState(1);
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

    const fetchClients = async () => {
        try {
            const { data } = await axios.get(baseUrl + "get-clients", config);
            if (data) {
                setClients(data);
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
        fetchClients();
        fetchServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(()=>{
        setFormData((prevData) => ({
            ...prevData,
            ["quantity"]: quantity
        }))

    },[quantity])

    const handleSubmit = async (e) => {

        e.preventDefault();
        return await axios.post(baseUrl + "add-order", formData, config);
    }

    const PromiseNotify = (e) => {
        toast.promise(
            handleSubmit(e),
            {
                loading: ' Adding Order...',
                success: () => {

                    handleDataFromChild(formData);
                    return <b> Order Added!</b>
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
            <div className="text-end">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    onClick={toggleDrawer}
                    aria-controls="drawer-example"
                >
                    Add New
                </button>

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
                            {userInfo?.role !== "service" && <div className="mb-5">
                                <label for="client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Client </label>
                                <select id="client" name='clientId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
                                    <option selected>Select</option>
                                    {clients?.map((client) => (<option value={client._id}>{client.name}</option>))}
                                </select>
                            </div>}
                            <div className="mb-5">
                                <label for="employee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Service </label>
                                <select id="service" name='serviceId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
                                    <option selected>Select</option>
                                    {services?.map((service) => (<option value={service._id}>{service.name}</option>))}
                                </select>
                            </div>
                            <div className="mb-5 flex items-center">
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Quantity </label>
                                <button type="button" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => setQuantity((prevData)=>(prevData-1))}>-</button>
                                <input id="quantity" name="quantity" type="number" value={quantity} readOnly className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-12 text-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => setQuantity((prevData)=>(prevData+1))}>+</button>
                            </div>

                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add Service</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DrawerForOrder;