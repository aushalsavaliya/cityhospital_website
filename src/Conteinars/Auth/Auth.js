import React, { useRef, useState } from 'react';
import * as yup from 'yup';

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

    let authschema;

    if (userType === 'Singup' && reset === false) {
        authschema = {
            name: yup.string().required("please Enter your name"),
            email: yup.string().required("please Enter Valid email").email("please Enter email"),
            password: yup.string().required("Enter your Password").min(8),
        }
    } else if (userType === 'Login' && reset === false) {
        authschema = {
            email: yup.string().required("please Enter Valid email").email("please Enter email"),
            password: yup.string().required("Enter your Password").min(8),
        }
    } else if(reset === true) {
        authschema = {
            email: yup.string().required("please Enter Valid email").email("please Enter email"),
        }
    }


    let schema = yup.object().shape(authschema);


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
                <div action method="post" role="form" className="php-email-form">

                    <div className="col-md-4 form-group">
                        {
                            reset === true ?
                                null
                                :
                                userType === 'Login' ?
                                    null
                                    :
                                    <div className="row">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <div className="validate" />
                                    </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input ref={emailref} type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div className="validate" />
                        </div>
                    </div>
                    {
                        reset === true ?
                            null
                            :
                            <div className="row">
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input ref={passref} type="tel" className="form-control" name="password" id="password" placeholder="Your password" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                    <div className="validate" />
                                </div>
                            </div>
                    }
                    {
                        reset === true ?
                            <div className="text-center"><button type="submit">Submit</button></div>
                            :
                            userType === 'Login' ?
                                <div className="text-center"><button type="submit" onClick={() => handeling()}>Login</button></div>
                                :
                                <div className="text-center"><button type="submit">Signup</button></div>
                    }
                    {
                        userType === 'Login' ?
                            <div>Create a new Account <button onClick={() => { setreset(false); setuserType('Singup') }}>Signup</button></div>
                            :
                            <div>Already have Account <button onClick={() => { setreset(false); setuserType('Login') }}>Login</button></div>
                    }

                    <span>Forget password <button onClick={() => setreset(true)}>Click Here</button></span>
                </div>
            </div>
        </section>


    );
}

export default Auth;