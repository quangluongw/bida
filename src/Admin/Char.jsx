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

  const dates = chart.dates;
  const ordersByStatus = chart.orders_by_status;
  const dailyTotal = chart.daily_total;

  // Generate series for each status
  const statusSeries = Object.entries(ordersByStatus).map(
    ([status, values]) => ({
      name: `${getOrderStatus(status)}`,
      type: "line",
      data: dates.map((date) => Number(values[date] || 0)),
      customStatus: Number(status), // add this to help with styling
    })
  );

  // Add the total series as a column
  const totalSeries = {
    name: "Tổng số đơn",
    type: "column",
    data: dates.map((date) => Number(dailyTotal[date] || 0)),
  };

  const series = [...statusSeries, totalSeries];

  // Build dashArray based on customStatus (status = 6 -> dashed)
  const strokeDashArray = series.map(
    (s) => (s.customStatus === 6 ? 5 : 0) // 5 = dashed line, 0 = solid line
  );

  const options = {
    chart: {
      type: "line",
      stacked: false,
    },
    stroke: {
      width: series.map((s) => (s.type === "column" ? 3 : 2)),
      curve: "smooth",
      dashArray: series.map(
        (s) => (s.customStatus === 6 ? 5 : 0) // Nét đứt nếu là trạng thái 6, ngược lại nét liền
      ),
    },

    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    colors: [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EC4899",
      "#8B5CF6",
      "#EF4444",
      "#14B8A6",
    ],
    xaxis: {
      categories: dates,
    },
    yaxis: [
      {
        title: {
          text: "Order Number",
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "bottom",
    },
  };

  return <Chart options={options} series={series} height={400} type="line" />;
}
export function TotalOrder({ chart }) {
  const dates = chart.dates;
  const revenueData = chart.revenue_data || {};

  const revenueSeries = {
    name: "Doanh thu (VNĐ)",
    type: "column",
    data: dates.map((date) => Number(revenueData[date] || 0)),
  };

  const series = [revenueSeries];

  const options = {
    chart: {
      type: "bar",
      stacked: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        dataLabels: {
          position: "center",
          style: {
            colors: ["white"], // Cũng có thể dùng 'white' thay cho mã hex
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(val),
      offsetY: -10, // khoảng cách với đầu cột
      style: {
        fontSize: "12px",
        colors: ["#000"], // màu chữ
      },
    },
    colors: ["#03A9F4"],
    xaxis: {
      categories: dates,
    },
    yaxis: [
      {
        title: {
          text: "Doanh thu (VNĐ)",
        },
        labels: {
          formatter: (val) =>
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(val),
        },
      },
    ],
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
  };

  return <Chart options={options} series={series} height={400} type="bar" />;
}
