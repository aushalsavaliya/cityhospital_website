import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Auth(props) {
    const [userType, setuserType] = useState('Login');
    const [reset, setreset] = useState(false);

    const emailref = useRef();
    const passref = useRef();

    function handeling() {
        passref.current.focus();
        passref.current.style.border = '2px solid black'
        console.log(emailref.current.value);
    }

    let authschema, init;

    if (userType === 'Singup' && reset === false) {
        authschema = {
            name: yup.string().required("please Enter your name"),
            email: yup.string().required("please Enter email").email("please Enter Valid email"),
            password: yup.string().required("Enter your Password").min(8),
        }
        init = {
            name: '',
            email: '',
            password: '',
        }
    } else if (userType === 'Login' && reset === false) {
        authschema = {
            email: yup.string().required("please Enter email").email("please Enter Valid email"),
            password: yup.string().required("Enter your Password").min(8),
        }
        init = {
            email: '',
            password: '',
        }
    } else if (reset === true) {
        authschema = {
            email: yup.string().required("please Enter email").email("please Enter Valid email"),
        }
        init = {
            email: '',
        }
    }
    let schema = yup.object().shape(authschema);

    const formik = useFormik({
        initialValues: init,
        validationSchema: schema,
        onSubmit: values => {
            console.log(values);
        },
    });

    const { handleChange, errors, handleSubmit } = formik;


    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    {
                        reset === true ?
                            <h2>Reset password</h2>
                            :
                            userType === 'Login' ?
                                <h2>Login</h2>
                                :
                                <h2>Signup</h2>
                    }
                </div>
                <Formik>
                    <Form action method="post" className="php-email-form">

                        <div className="col-md-4 form-group">
                            {
                                reset === true ?
                                    null
                                    :
                                    userType === 'Login' ?
                                        null
                                        :
                                        <div className="row">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="name" placeholder="Your Name"
                                                data-rule="minlen:4"
                                                data-msg="Please enter at least 4 chars"
                                                onChange={handleChange}
                                                
                                            />
                                            <p>{errors.name}</p>
                                            <div className="validate" />
                                        </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input ref={emailref}
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
                        </div>
                        {
                            reset === true ?
                                null
                                :
                                <div className="row">
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input ref={passref}
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            id="password"
                                            placeholder="Your password"
                                            data-rule="minlen:4"
                                            data-msg="Please enter at least 4 chars"
                                            onChange={handleChange}
                                            
                                        />
                                        <p>{errors.password}</p>
                                        <div className="validate" />
                                    </div>
                                </div>
                        }
                        {
                            reset === true ?
                                <div className="text-center"><button type="submit">Submit</button></div>
                                :
                                userType === 'Login' ?
                                    <div className="text-center"><button type="submit" >Login</button></div>
                                    :
                                    <div className="text-center"><button type="submit">Signup</button></div>
                        }


                    </Form>
                </Formik>
                {
                    userType === 'Login' ?
                        <div>Create a new Account <button onClick={() => { setreset(false); setuserType('Singup') }}>Signup</button></div>
                        :
                        <div>Already have Account <button onClick={() => { setreset(false); setuserType('Login') }}>Login</button></div>
                }
                <span>Forget password <button onClick={() => setreset(true)}>Click Here</button></span>
            </div>
        </section>


    );
}

export default Auth;