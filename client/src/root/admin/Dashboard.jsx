import axios from "axios";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
    const [listOrders, setListOrders] = useState([]);
    const data = [
        {
            month: 1,
            revenue: 0,
            order: 0,
        },
        {
            month: 2,
            revenue: 0,
            order: 0,
        },
        {
            month: 3,
            revenue: 0,
            order: 0,
        },
        {
            month: 4,
            revenue: 0,
            order: 0,
        },
        {
            month: 5,
            revenue: 0,
            order: 0,
        },
        {
            month: 6,
            revenue: 0,
            order: 0,
        },
        {
            month: 7,
            revenue: 0,
            order: 0,
        },
        {
            month: 8,
            revenue: 0,
            order: 0,
        },
        {
            month: 9,
            revenue: 0,
            order: 0,
        },
        {
            month: 10,
            revenue: 0,
            order: 0,
        },
        {
            month: 11,
            revenue: 0,
            order: 0,
        },
        {
            month: 12,
            revenue: 0,
            order: 0,
        },
    ];
    const dataStatus = [
        { label: "Thành công", count: 0 },
        { label: "Đã hủy", count: 0 },
        { label: "Đang xử lý", count: 0 },
    ];
    listOrders.map((order) => {
        if (order.status === "pending") {
            dataStatus[2].count += 1;
        } else if (order.status === "success") {
            dataStatus[0].count += 1;
        } else if (order.status === "cancel") {
            dataStatus[1].count += 1;
        }
        if (new Date(order.invoiceDate).getUTCMonth() + 1 === 1) {
            data[0].revenue += order.total;
            data[0].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 2) {
            data[1].revenue += order.total;
            data[1].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 3) {
            data[2].revenue += order.total;
            data[2].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 4) {
            data[3].revenue += order.total;
            data[3].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 5) {
            data[4].revenue += order.total;
            data[4].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 6) {
            data[5].revenue += order.total;
            data[5].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 7) {
            data[6].revenue += order.total;
            data[6].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 8) {
            data[7].revenue += order.total;
            data[7].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 9) {
            data[8].revenue += order.total;
            data[8].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 10) {
            data[9].revenue += order.total;
            data[9].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 11) {
            data[10].revenue += order.total;
            data[10].order += 1;
        } else if (new Date(order.invoiceDate).getUTCMonth() + 1 === 12) {
            data[11].revenue += order.total;
            data[11].order += 1;
        }
    });

    console.log(data);

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

    useEffect(() => {
        getListOrder();
    }, []);
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">Đồ thi doanh thu hàng tháng</h6>
                        <Line
                            options={{
                                responsive: true,
                                plugins: {
                                    // legend: {
                                    //   position: 'top' as const,
                                    // },
                                    title: {
                                        display: true,
                                        text: "Doanh thu hàng tháng",
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
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">
                            Đồ thi số lượng đơn hàng mỗi tháng
                        </h6>
                        <Line
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Đơn hàng mỗi tháng",
                                    },
                                },
                            }}
                            data={{
                                labels: data.map((m) => m.month),
                                datasets: [
                                    {
                                        label: "Đơn hàng",
                                        data: data.map((m) => m.order),
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">
                            Biểu đồ đơn hàng ở từng tình trạng
                        </h6>
                        <Bar
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Số đơn hàng ở từng tình trạng",
                                    },
                                },
                            }}
                            data={{
                                labels: dataStatus.map((m) => m.label),
                                datasets: [
                                    {
                                        label: "Số lượng",
                                        data: dataStatus.map((m) => m.count),
                                        backgroundColor:
                                            "rgba(53, 162, 235, 0.5)",
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
