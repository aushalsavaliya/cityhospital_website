import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Formik, Form, useFormik } from 'formik';


function DoctorAdmin(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Doctoradd = (values) => {
        setOpen(false);
        formik.resetForm();
        console.log(values);
    }

    let schema = yup.object().shape({
        Doctor_name: yup.string().required("please enter Doctor name"),
        Doctor_Number: yup.number().required("please enter number"),
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            Doctor_name: '',
            Doctor_Number: '',
        },
        onSubmit: values => {
            Doctoradd(values);
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched } = formik;


    return (
        <div>
            <h1>
                Doctor Admin
            </h1>
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Doctor
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <Formik values={Formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="Doctor_name"
                                label="Doctor_name"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.Doctor_name && touched.Doctor_name ? errors.Doctor_name : ''}</p>
                            <TextField
                                margin="dense"
                                id="Doctor_Number"
                                label="Doctor_Number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.Doctor_Number && touched.Doctor_Number ? errors.Doctor_Number : ''}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default DoctorAdmin;