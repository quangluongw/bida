import Chart from "react-apexcharts";

export function NumberOrder({ chart }) {
  const getOrderStatus = (status) => {
    const statusMapping = {
      1: "Pending",
      2: "Processing",
      3: "Shipping",
      4: "Delivered",
      5: "Completed",
      6: "Cancelled",
    };
    return statusMapping[status] || "Status Unknown";
  };

  // Lấy dữ liệu từ chart.orderNumber (format mới từ API)
  const orderNumberData = chart?.orderNumber || [];

  // Tạo mảng dates và counts từ dữ liệu mới
  const dates = orderNumberData.map((item) => item.date);
  const counts = orderNumberData.map((item) => item.count);

  // Series cho biểu đồ - chỉ hiển thị tổng số đơn hàng theo ngày
  const series = [
    {
      name: "Số đơn hàng",
      type: "line",
      data: counts,
    },
    {
      name: "Tổng số đơn",
      type: "column",
      data: counts,
    },
  ];

  const options = {
    chart: {
      type: "line",
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    stroke: {
      width: [2, 0],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    colors: ["#3B82F6", "#14B8A6"],
    xaxis: {
      categories: dates,
      title: {
        text: "Ngày",
      },
    },
    yaxis: {
      title: {
        text: "Số lượng đơn hàng",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val} đơn`,
      },
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
  };

  return <Chart options={options} series={series} height={400} type="line" />;
}

export function TotalOrder({ chart }) {
  // Lấy dữ liệu từ chart.revenue (format mới từ API)
  const revenueChartData = chart?.revenue || [];

  // Tạo mảng dates và revenue từ dữ liệu mới
  const dates = revenueChartData.map((item) => item.date);
  const revenues = revenueChartData.map((item) => Number(item.revenue || 0));

  const series = [
    {
      name: "Doanh thu (VNĐ)",
      type: "column",
      data: revenues,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 0,
        }).format(val),
      offsetY: -20,
      style: {
        fontSize: "11px",
        colors: ["#304758"],
        fontWeight: "bold",
      },
    },
    colors: ["#03A9F4"],
    xaxis: {
      categories: dates,
      title: {
        text: "Ngày",
      },
    },
    yaxis: {
      title: {
        text: "Doanh thu (VNĐ)",
      },
      labels: {
        formatter: (val) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
          }).format(val),
      },
    },
    tooltip: {
      y: {
        formatter: (val) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(val),
      },
    },
    legend: {
      position: "bottom",
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return <Chart options={options} series={series} height={400} type="bar" />;
}
