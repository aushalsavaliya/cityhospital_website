import React, { useState } from 'react';

function Auth(props) {
    const [userType, setuserType] = useState('Login');

    const [reset, setreset] = useState(false);
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
                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div className="validate" />
                        </div>
                    </div>
                    {
                        reset === true ?
                        null
                        :
                        <div className="row">
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input type="tel" className="form-control" name="password" id="password" placeholder="Your password" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                <div className="validate" />
                            </div>
                        </div>
                    }
                    {
                        reset === true?
                        <div className="text-center"><button type="submit">Submit</button></div>
                        :
                        userType === 'Login' ?
                            <div className="text-center"><button type="submit">Login</button></div>
                            :
                            <div className="text-center"><button type="submit">Signup</button></div>
                    }
                    {
                        userType === 'Login' ?
                            <div>Create a new Account <button onClick={() => {setreset(false); setuserType('Singup')}}>Signup</button></div>
                            :
                            <div>Already have Account <button onClick={() => {setreset(false); setuserType('Login')}}>Login</button></div>
                    }

                    <span>Forget password <button onClick={() => setreset(true)}>Click Here</button></span>
                </div>
            </div>
        </section>


    );
}

export default Auth;