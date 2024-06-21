import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import axios from 'axios';
import { getToken } from '../auth/getToken';

const chartSetting = {
  yAxis: [
    {
      label: 'order and client',
    },
  ],
  width: 600,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
// const dataset = [
//   {
//     client: 2,
//     order: 57,
//     month: 'Jan',
//   },
//   {
//     client: 50,
//     order: 52,
//     month: 'Fev',
//   },
//   {
//     client: 47,
//     order: 53,
//     month: 'Mar',
//   },
//   {
//     client: 54,
//     order: 56,
//     month: 'Apr',
//   },
//   {
//     client: 57,
//     order: 69,
//     month: 'May',
//   },
//   {
//     order: 60,
//     client: 63,
//     month: 'June',
//   },
//   {
//     client: 59,
//     order: 60,
//     month: 'July',
//   },
//   {
//     client: 65,
//     order: 60,
//     month: 'Aug',
//   },
//   {
//     client: 51,
//     order: 51,
//     month: 'Sept',
//   },
//   {
//     client: 60,
//     client: 97,
//     month: 'Oct',
//   },
//   {
//     client: 60,
//     order: 65,
//     month: 'Nov',
//   },
//   {
//     client: 60,
//     order: 55,
//     month: 'Dec',
//   },
// ];

const valueFormatter = (value) => `${value}`;

export default function BarsDataset() {
  const [dataset , setDataset] = React.useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  }
    React.useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(baseUrl + "dashboard-data/", config);
        if(data)
          {
            setDataset(data);
          }
      }
      fetchData();
    } catch (err) {

    }
  },[]);

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'client', label: 'client', valueFormatter },
        { dataKey: 'order', label: 'order', valueFormatter },
        // { dataKey: 'newYork', label: 'New York', valueFormatter },
        // { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}