import React from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

function Appointment(props) {

    let appoinschema, initapp;

    const history = useHistory();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    appoinschema = {
        name: yup.string().required("please Enter your name")
            .min(2, "Mininum 2 characters")
            .max(30, "Maximum 30 characters")
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'please enter valid name'
            ),


        email: yup.string().required("please Enter email").email("please Enter Valid email"),

        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, " required 10 character ").max(10, " maximum 10 character required"),
        date: yup.string().required("Please Enter Date.").matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, "Enter Date in Format."),
        department: yup.string().required("select your Department"),
        message: yup.string().min(10, "minimum required 10 diget").max(50, "maximum required 50 giget")
            .required("please Enter your message"),
        gender: yup.string().required("please select"),
        checkbox: yup.array().min(1).of(yup.string().required()).required()
    }
    initapp = {
        name: '',
        email: '',
        phone: '',
        date: '', 
        department: '',
        message: '',
        gender: '',
        checkbox: '',
    }

    const handeladd = ()=> {
        let localdata = JSON.parse(localStorage.getItem("apt"));
        console.log(localdata);

        if(localdata === null){
            localStorage.setItem("apt", JSON.stringify([values]));
        }else{
            localdata.push(values);
            localStorage.setItem("apt", JSON.stringify(localdata));
        }
        formik.resetForm();
        history.push("/listAppointment")

    } 

    let schema = yup.object().shape(appoinschema);

    const formik = useFormik({
        initialValues: initapp,
        validationSchema: schema,
        onSubmit: values => {
            handeladd(values);
        },
    });

    const { handleChange, errors, handleSubmit, touched, handleBlur, values } = formik;

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
                                        value={values.name}
                                        data-msg="Please enter at least 4 chars"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p>{errors.name && touched.name ? errors.name : ''}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        placeholder="Your Email"
                                        data-rule="email"
                                        data-msg="Please enter a valid email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p>{errors.email && touched.name ? errors.email : ''}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        id="phone"
                                        value={values.phone}
                                        placeholder="Your Phone"
                                        data-rule="minlen:4"
                                        data-msg="Please enter at least 4 chars"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p>{errors.phone && touched.phone ? errors.phone : ''}</p>
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
                                        value={values.date}
                                        placeholder="Appointment Date"
                                        data-rule="minlen:4"
                                        data-msg="Please enter at least 4 chars"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p>{errors.date && touched.date ? errors.date : ''}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3">
                                    <select
                                        name="department"
                                        id="department"
                                        className="form-select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.department}
                                    >
                                        <option value>Select Department</option>
                                        <option value="Department 1">Department 1</option>
                                        <option value="Department 2">Department 2</option>
                                        <option value="Department 3">Department 3</option>
                                    </select>
                                    <p>{errors.department && touched.department ? errors.department : ''}</p>
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
                                    onBlur={handleBlur}
                                    value={values.message}
                                />
                                <p>{errors.message && touched.message ? errors.message : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <label> 
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="gender"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="gender"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    Female
                                </label>
                                <p>{errors.gender && touched.gender ? errors.gender : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        value={"cricket"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    cricket
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        value={"Music"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    Music
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        value={"Traveling"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    Traveling
                                </label>
                                <p>{errors.checkbox && touched.checkbox ? errors.checkbox : ''}</p>
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