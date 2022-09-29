import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik'
import { RestoreFromTrash } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MedicineAdmin(props) {

  const [open, setOpen] = React.useState(false);
  const [Update, setUpdate] = useState(false);
  const [did, setdid] = useState(false);
  const [dopen, setdOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const getData = () => {
    let localData = JSON.parse(localStorage.getItem('Medicin'));
    if (localData !== null) {
      setData(localData);
    }
  }

  const handleDelete = (data) => {
    setdOpen(true)
    setdid(data.id)
  }

  const handleedit = (data) => {
    setOpen(true)
    console.log(data);
    formik.setValues(data);
    setUpdate(true);
  }


  const handledeletedata = () => {
    let localData = JSON.parse(localStorage.getItem('Medicin'));
    let Ddata = localData.filter((l) => l.id !== did);

    localStorage.setItem("Medicin", JSON.stringify(Ddata))
    setData(Ddata);
    setdOpen(false);

    console.log(Ddata);
  }


  useEffect(() => {
    getData();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
    setUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    formik.resetForm();
    setdOpen(false); 
  };

  const handleUpdatedata = (values) => {
    let localData = JSON.parse(localStorage.getItem("Medicin"))
    let uData = localData.map((l) => {
      if (l.id === values.id) {
        return values;
      } else {
        return l;
      }
    })

    setData(uData);
    localStorage.setItem("Medicin", JSON.stringify(uData));
    handleClose();

  }

  const handleadd = (values) => {

    let localData = JSON.parse(localStorage.getItem("Medicin"))
    let id = Math.floor(Math.random() * 100);
    let data = { id: id, ...values }
    console.log(localData, data);
    if (localData === null) {
      localStorage.setItem("Medicin", JSON.stringify([data]))
    } else {
      localData.push(data);
      localStorage.setItem("Medicin", JSON.stringify(localData))
    }

    setOpen(false);
    formik.resetForm();
    getData();
  }

  let schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    price: yup.number().required('Please enter your price'),
    qty: yup.string().required('Please enter your qty'),
    expiry: yup.string().required('Please enter your expiry'),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: '',
      qty: '',
      price: '',
      expiry: '',

    },
    onSubmit: values => {
      if (Update) {
        handleUpdatedata(values);
      } else {
        handleadd(values);
      }
    },
  });


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'qty',
      headerName: 'Qnatity',
      type: 'number',
      width: 90,
    },
    {
      field: 'expiry',
      headerName: 'Expiry',
      type: 'number',
      width: 90,
    },
    {
      field: '',
      headerName: 'Action',
      width: 110,
      renderCell: (parms) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleDelete(parms.row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Edit" onClick={() => handleedit(parms.row)}>
            <EditIcon />
          </IconButton>
        </>
      )
    },
  ];



  const { handleChange, handleSubmit, errors, touched, values, handleBlur } = formik;



  return (
    <div>
      <h1>Add Medicine</h1>
      <br />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
        </Button>
        <br />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Medicine</DialogTitle>
          <Formik value={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Medicine"
                  fullWidth
                  variant="standard"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.name && touched.name ? errors.name : ''}</p>
                <TextField
                  margin="dense"
                  id="price"
                  name="price"
                  label="Medicine Price"
                  fullWidth
                  variant="standard"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.price && touched.price ? errors.price : ''}</p>
                <TextField
                  margin="dense"
                  id="qty"
                  name="qty"
                  label="Medicine Quantity"
                  fullWidth
                  variant="standard"
                  value={values.qty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.qty && touched.qty ? errors.qty : ''}</p>
                <TextField
                  margin="dense"
                  id="expiry"
                  name="expiry"
                  label="Medicine Expiry"
                  fullWidth
                  variant="standard"
                  value={values.expiry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.expiry && touched.expiry ? errors.expiry : ''}</p>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>{Update ? "Updata" : "Add"}</Button>
                </DialogActions>
              </DialogContent>
            </Form>
          </Formik>
        </Dialog>
        <Dialog open={dopen} onClose={handleClose}>
          <DialogTitle>Delete Medicine</DialogTitle>
          <DialogContent>
            Are You Sure Delete Data
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => handledeletedata()}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MedicineAdmin;