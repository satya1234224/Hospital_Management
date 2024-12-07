import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function Users() {
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hospital-management-stam.onrender.com/appointments', {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });
      setAppointments(response.data.all_appointments);
    } catch (error) {
      console.log('Error fetching appointments:', error);
    }
  };

  const handleDateChange = async (params, newDate) => {
    try {
      const tokens = localStorage.getItem('jwt');
      const response = await axios.post(
        'http://localhost:8080/date',
        {
          _id: params._id,
          date: newDate,
        },
        {
          headers: {
            authorization: tokens,
          },
        }
      );
      if (response.status === 200) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === params._id ? { ...appointment, date: newDate } : appointment
        );
        setAppointments(updatedAppointments);
      } else {
        console.log('Failed to update date');
      }
    } catch (error) {
      console.error('Error updating date:', error);
    }
  };

  const handleInvoiceChange = (row, value) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === row._id ? { ...appointment, invoice: value } : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleSave = async (appointment) => {
    try {
      const response = await axios.patch(
        'https://hospital-management-stam.onrender.com/appointments',
        {
          _id: appointment._id,
          status: 'checked',
          invoice: appointment.invoice,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('jwt'),
          },
        }
      );
      fetchData();
    } catch (error) {
      console.log('Error saving appointment:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'user',
      headerName: 'User Name',
      width: 200,
      renderCell: (params) => {
        const userName = params.row.user?.username || 'N/A';
        return userName;
      },
    },
    {
      field: 'doctor',
      headerName: 'Doctor Name',
      width: 200,
      renderCell: (params) => {
        const doctorName = params.row.doctor?.name || 'N/A';
        return doctorName;
      },
    },
    { field: 'disease', headerName: 'Disease', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: (params) => {
        const formattedDate = params.row.date
          ? moment(params.row.date).format('YYYY-MM-DD')
          : 'N/A';
        return formattedDate;
      },
    },
  ];

  return (
    <>
      <div style={{ marginLeft: 20, height: 400, width: '100%' }}>
        <DataGrid
          rows={appointments}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
