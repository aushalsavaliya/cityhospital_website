import React from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Appointment(props) {

    let appoinschema, initapp;

    appoinschema = {
        name: yup.string().required("please Enter your name"),
        email: yup.string().required("please Enter email").email("please Enter Valid email"),
        phone: yup.string().required("please Enter your Phone Number"),
        appointment_data: yup.string().required("please Enter your Appointment Data"),
        select_department: yup.string().required("select your Department"),
        message: yup.string().required("please Enter your message"),
    }
    initapp ={
        name: '',
        email: '',
        phone: '',
        appointment_data: '',
        select_department: '',
        message: '',
    }

    let schema = yup.object().shape(appoinschema);

    const formik = useFormik({
        initialValues: initapp,
        validationSchema: schema,
        onSubmit: values => {
            console.log(values);
        },
    });

    const { handleChange, errors, handleSubmit } = formik;

    return (
        <div>
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        <h2>Make an Appointment</h2>
                        <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                            blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                            Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                    </div>
                    <Formik value={formik}>
                        <Form onSubmit={handleSubmit} action method="post" className="php-email-form">
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="Your Name"
                                        data-rule="minlen:4"
                                        data-msg="Please enter at least 4 chars"
                                        onChange={handleChange}
                                    />
                                    <p>{errors.name}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        data-rule="email"
                                        data-msg="Please enter a valid email"
                                        onChange={handleChange}
                                    />
                                    <p>{errors.email}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        id="phone"
                                        placeholder="Your Phone"
                                        data-rule="minlen:4"
                                        data-msg="Please enter at least 4 chars"
                                        onChange={handleChange}
                                    />
                                    <p>{errors.phone}</p>
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 form-group mt-3">
                                    <input
                                        type="datetime"
                                        name="date"
                                        className="form-control datepicker"
                                        id="date"
                                        placeholder="Appointment Date"
                                        data-rule="minlen:4"
                                        data-msg="Please enter at least 4 chars"
                                        onChange={handleChange}
                                    />
                                    <p>{errors.appointment_data}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3">
                                    <select
                                        name="department"
                                        id="department"
                                        className="form-select"
                                        onChange={handleChange}
                                        >
                                        <option value>Select Department</option>
                                        <option value="Department 1">Department 1</option>
                                        <option value="Department 2">Department 2</option>
                                        <option value="Department 3">Department 3</option>
                                    </select>
                                    <p>{errors.select_department}</p>
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows={5}
                                    placeholder="Message (Optional)"
                                    defaultValue={""}
                                    onChange={handleChange}
                                />
                                <p>{errors.message}</p>
                                <div className="validate" />
                            </div>
                            <div className="mb-3">
                                <div className="loading">Loading</div>
                                <div className="error-message" />
                                <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                            </div>
                            <div className="text-center"><button type="submit">Make an Appointment</button></div>
                        </Form>
                    </Formik>
                </div>
            </section>

        </div>
    );
}

export default Appointment;