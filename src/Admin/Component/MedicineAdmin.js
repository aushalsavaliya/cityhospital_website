import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function MedicineAdmin(props) {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [dopen, setdopen] = React.useState(false);
  const [did, setdid] = React.useState(false);



  const localData = () => {
    let localData = JSON.parse(localStorage.getItem('Medicines'));
    setData(localData);
  }

  useEffect(() => {
    localData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (data) => {
    setdopen(true);
    setdid(data.id)
  }

  const handelDeleteData = () => {
    let localData = JSON.parse(localStorage.getItem("Medicines"))
    let Ddata = localData.filter((l) => l.id !== did)

    localStorage.setItem("Medicin", JSON.stringify(Ddata))
    setData(Ddata)
    setdopen(false)

    console.log(Ddata);
  }

  const handleClose = () => {
    setOpen(false);
  };


  const handladd = (values) => {

    let localData = JSON.parse(localStorage.getItem('Medicines'))
    let id = Math.floor(Math.random() * 100);
    let data = { id: id, ...values }
    console.log(localData, data);
    if (localData === null) {
      localStorage.setItem("Medicines", JSON.stringify([data]))
    } else {
      localData.push(data);
      localStorage.setItem("Medicines", JSON.stringify(localData))
    }
    setOpen(false);
    formik.resetForm();
  }

  let schema = yup.object().shape({
    name: yup.string().required("please enter name"),
    Pirce: yup.number().required("please enter pirce"),
    qnt: yup.string().required("please enter qntity"),
    expiry: yup.string().required("please enter expiry"),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: '',
      Pirce: '',
      qnt: '',
      expiry: '',
    },
    onSubmit: values => {
      handladd(values);
    },
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'Pirce', headerName: 'Pirce', width: 130 },
    {
      field: 'expiry',
      headerName: 'expiry',
      type: 'number',
      width: 90,
    },
    {
      field: 'qnt',
      headerName: 'qntity',
      type: 'number',
      width: 90,
    },
    {
      field: '',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDelete(params.row)}>
          <DeleteIcon />
        </IconButton>
      )
    },
  ];


  const { handleBlur, handleChange, handleSubmit, errors, touched } = formik;


  return (
    <div>
      <h1>Medicine Admin</h1>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
      </Button>
      <div>
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
          <DialogTitle>Add Medicine</DialogTitle>
          <Formik values={Formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Medicines"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.name && touched.name ? errors.name : ''}</p>
                <TextField
                  margin="dense"
                  id="Pirce"
                  name="Pirce"
                  label="Pirce"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.Pirce && touched.Pirce ? errors.Pirce : ''}</p>
                <TextField
                  margin="dense"
                  id="qnt"
                  name="qnt"
                  label="Qntity"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.qnt && touched.qnt ? errors.qnt : ''}</p>
                <TextField
                  margin="dense"
                  id="expiry"
                  name="expiry"
                  label="Expiry"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.expiry && touched.expiry ? errors.expiry : ''}</p>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </DialogContent>
            </Form>
          </Formik>
        </Dialog>
        <Dialog open={dopen} onClose={handleClose}>
          <DialogTitle>Delete Medicin</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => handelDeleteData()}>YES</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MedicineAdmin;