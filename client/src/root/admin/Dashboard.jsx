import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
    const [listOrders, setListOrders] = useState([]);
    let totalF = 0;
    listOrders.map((order) => {
        console.log(new Date(order.invoiceDate).getUTCMonth() + 1);
        if (new Date(order.invoiceDate).getUTCMonth() + 1 === 6) {
            totalF = totalF + order.total;
        }
    });
    console.log(listOrders);
    console.log(totalF);
    const data = [
        {
            month: 1,
            revenue: 0,
        },
        {
            month: 2,
            revenue: 0,
        },
        {
            month: 3,
            revenue: 0,
        },
        {
            month: 4,
            revenue: 0,
        },
        {
            month: 5,
            revenue: 0,
        },
        {
            month: 6,
            revenue: totalF,
        },
        {
            month: 7,
            revenue: 0,
        },
        {
            month: 8,
            revenue: 0,
        },
        {
            month: 9,
            revenue: 0,
        },
        {
            month: 10,
            revenue: 0,
        },
        {
            month: 11,
            revenue: 0,
        },
        {
            month: 12,
            revenue: 0,
        },
    ];

    const getListOrder = async () => {
        await axios
            .get(`http://localhost:3002/api/order`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListOrders(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    // for (let i = 0; i < listOrders.length; i++) {
    //     getCart(listOrders[i].cartId);
    // }
    // listOrders.map((order) => {
    //     // getCart(order.cartId);
    // });

    // setTotal(totalF);

    useEffect(() => {
        getListOrder();
    }, []);
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">Single Line Chart</h6>
                        <Line
                            options={{
                                responsive: true,
                                plugins: {
                                    // legend: {
                                    //   position: 'top' as const,
                                    // },
                                    title: {
                                        display: true,
                                        text: "Chart.js Line Chart",
                                    },
                                },
                            }}
                            data={{
                                labels: data.map((m) => m.month),
                                datasets: [
                                    {
                                        label: "Revenue",
                                        data: data.map((m) => m.revenue),
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
