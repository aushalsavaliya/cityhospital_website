import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';


function MedicineAdmin(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handladd = (values) =>{
    setOpen(false);
   formik.resetForm();
   console.log(values);
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


  const { handleBlur, handleChange, handleSubmit, errors, touched } = formik;


  return (
    <div>
      <h1>Medicine Admin</h1>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Medicine</DialogTitle>
        <Formik values={Formik}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Madicine"
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
    </div>

  );
}

export default MedicineAdmin;