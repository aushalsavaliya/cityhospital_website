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
    const [DiD, setDiD] = useState(false);
    const [DoPen, setdOpen] = React.useState(false);
    const [data, setData] = useState([]);

    const getData = () => {
        let localData = JSON.parse(localStorage.getItem('patient'));
        if (localData !== null) {
            setData(localData);
        }
    }

    const handleDelete = (data) => {
        setdOpen(true)
        setDiD(data.id)
    }

    const handleedit = (data) => {
        setOpen(true)
        console.log(data);
        formik.setValues(data);
        setUpdate(true);
    }


    const handledeletedata = () => {
        let localData = JSON.parse(localStorage.getItem('patient'));
        let Ddata = localData.filter((l) => l.id !== DiD);

        localStorage.setItem("patient", JSON.stringify(Ddata))
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
        let localData = JSON.parse(localStorage.getItem("patient"))
        let uData = localData.map((l) => {
            if (l.id === values.id) {
                return values;
            } else {
                return l;
            }
        })

        setData(uData);
        localStorage.setItem("patient", JSON.stringify(uData));
        handleClose();

    }

    const handleadd = (values) => {

        let localData = JSON.parse(localStorage.getItem("patient"))
        let id = Math.floor(Math.random() * 100);
        let data = { id: id, ...values }
        console.log(localData, data);
        if (localData === null) {
            localStorage.setItem("patient", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("patient", JSON.stringify(localData))
        }

        setOpen(false);
        formik.resetForm();
        getData();
    }

    let schema = yup.object().shape({
        patient_name: yup.string().required('Please enter your name'),
        number: yup.number().required('Please enter your number'),
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            patient_name: '',
            number: '',
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
        
        {
            field: 'patient_name',
            headerName: 'patient_name',
            type: 'text',
            width: 90,
        },
        {
            field: 'number',
            headerName: 'number',
            type: 'text',
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
            <h1>Add patient</h1>
            <br />
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add patient
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
                                    id="patient_name"
                                    name="patient_name"
                                    label="patient"
                                    fullWidth
                                    variant="standard"
                                    value={values.patient_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.patient_name && touched.patient_name ? errors.patient_name : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="number"
                                    name="number"
                                    label="number"
                                    fullWidth
                                    variant="standard"
                                    value={values.number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.number && touched.number ? errors.number : ''}</p>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type='submit'>{Update ? "Updata" : "Add"}</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
                <Dialog open={DoPen} onClose={handleClose}>
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