import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import DrawerForOrder from '../components/DrawerForOrder';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getToken } from '../auth/getToken';
import { useSelector } from 'react-redux';
const OrderPage = () => {
    const { userInfo } = useSelector((state) => (state.user));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [clients, setClients] = useState(null);
    const [services, setServices] = useState(null);
    const [orders, setOrders] = useState(null);
    const [newOrder, setNewOrder] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [selected, setSelected] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
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

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(baseUrl + "get-orders", config);
            if (data) {
                setOrders(data);
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

    useEffect(() => {
        fetchOrders();
        fetchServices();
        fetchClients();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [newOrder])

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            ["quantity"]: quantity
        }))
    }, [quantity]);

    const handleDataFromChild = (data) => {
        setNewOrder(data);
    }
    const handleUpdate = (data) => {
        setFormData(data);
        toggleDrawer();
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        return await axios.post(baseUrl + "update-order/", formData, config);
    }


    const handleChangeStatus = async (data) => {

        return await axios.post(baseUrl + "order-status", data, config);
    }

    const handleChangeStatusPayment = async (data) => {

        return await axios.post(baseUrl + "payment-status", data, config);
    }

    const StatusNotify = (data) => {
        toast.promise(
            handleChangeStatus(data),
            {
                loading: 'Updating...',
                success: () => {
                    handleDataFromChild(data);
                    setSelected(null);
                    return <b> Order Status Updated!</b>
                },
                error: <b>Some Thing Went Wrong.</b>,
            }
        );

    }

    const StatusNotifyPayment = (data) => {
        toast.promise(
            handleChangeStatusPayment(data),
            {
                loading: 'Updating...',
                success: () => {
                    handleDataFromChild(data);
                    setSelectedPayment(null);
                    return <b> Payment Status Updated!</b>
                },
                error: <b>Some Thing Went Wrong.</b>,
            }
        );

    }


    const PromiseNotify = (e) => {
        toast.promise(
            handleUpdateSubmit(e),
            {
                loading: 'Updating...',
                success: () => {
                    handleDataFromChild(formData);
                    toggleDrawer();
                    return <b> Order Updated!</b>
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
                            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                                <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Order</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className='w-[100%] mt-3 flex justify-end p-2'>
                    <DrawerForOrder handleDataFromChild={handleDataFromChild} />
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
                                {userInfo?.role !== "client" && <div className="mb-5">
                                    <label for="client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Client </label>
                                    <select id="client" name='clientId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.clientId} onChange={handleChange}>
                                        <option selected>Select</option>
                                        {clients?.map((client) => (<option key={client._id} value={client._id}>{client.name}</option>))}
                                    </select>
                                </div>}
                                <div className="mb-5">
                                    <label for="employee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Service </label>
                                    <select id="employee" name='serviceId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.serviceId} onChange={handleChange}>
                                        <option selected>Select</option>
                                        {services?.map((service) => (<option key={service._id} value={service._id}>{service.name}</option>))}
                                    </select>
                                </div>
                                <div className="mb-5 flex items-center">
                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Quantity </label>
                                    <button type="button" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => setQuantity(formData.quantity - 1)}>-</button>
                                    <input id="quantity" name="quantity" type="number" value={formData.quantity} readOnly className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-12 text-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => setQuantity(formData.quantity + 1)}>+</button>
                                </div>

                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Update Order</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className=" overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {/* <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Client Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Service Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Payment
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {/* <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td> */}
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.clientName}
                                </th>
                                <td className="px-6 py-4">
                                    {order.serviceName}
                                </td>
                                <td className="px-6 py-4">
                                    {order.quantity}
                                </td>

                                <td className="px-6 py-4">
                                    {order.price}
                                </td>

                                <td className="px-6 py-4 cursor-pointer" onClick={() => { setSelected(order._id) }}>
                                    {(order.status === "Pending" && selected !== order._id  ) && <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>pending</span>}
                                    {(order.status === "In-process"  && selected !== order._id )&& <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-yellow-300 rounded-full me-1.5 flex-shrink-0"></span>in-process</span>}
                                    {(order.status === "Fulfilled"  && selected !== order._id )&& <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>fulfilled</span>}
                                    {(selected === order._id && userInfo.role !== 'client') && <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600" onClick={() => { StatusNotify({ _id: order._id, status: "Pending" }) }} ><span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>pending</span></li>
                                        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600" onClick={() => { StatusNotify({ _id: order._id, status: "In-process" }) }}  ><span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-yellow-300 rounded-full me-1.5 flex-shrink-0"></span>in-process</span></li>
                                        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600" onClick={() => { StatusNotify({ _id: order._id, status: "Fulfilled" }) }}><span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>fulfilled</span></li>
                                    </ul>
                                    }
                                </td>

                                <td className="px-6 py-4 cursor-pointer" onClick={() => { setSelectedPayment(order._id) }} >
                                    {(order.paymentStatus === "Unpaid"  && selectedPayment !== order._id) && <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>un-paid</span>}
                                    {(order.paymentStatus === "Paid"  && selectedPayment !== order._id) && <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>paid</span>}
                                    {(selectedPayment === order._id && userInfo.role !== 'client') && <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600" onClick={() => { StatusNotifyPayment({ _id: order._id, paymentStatus: 'Unpaid' }) }} ><span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>un-paid</span></li>
                                        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600" onClick={() => { StatusNotifyPayment({ _id: order._id, paymentStatus: 'Paid' }) }}  ><span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>paid</span></li>
                                    </ul>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { handleUpdate(order); }} >Edit</a>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    );
}

export default OrderPage;
