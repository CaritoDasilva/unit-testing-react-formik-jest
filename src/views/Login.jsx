import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const [registerMessage, setRegisterMessage] = useState('')
    const signupSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .equals([Yup.ref('confirmPassword'), null], '*Ambas contraseñas deben coincidir')
            .required('Campo requerido'),
        confirmPassword: Yup.string()
            .equals([Yup.ref('password'), null], '*Ambas contraseñas deben coincidir')
    })
    return (
        <div className="card">

            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={signupSchema}
                onSubmit={values => {
                    setRegisterMessage('Usuario se ha registrado correctamente');
                }}
            >
                {({ errors, touched }) => (
                    <Form id="login-form">
                        {console.log(errors)}
                        <label htmlFor="fullName">Nombre completo</label>
                        <Field name="fullName" />
                        {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>
                        ) : null}
                        <label htmlFor="email">Email</label>
                        <Field name="email" />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <label htmlFor="password">Contraseña</label>
                        <Field type="password" name="password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <Field type="password" name="confirmPassword" />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div>{errors.confirmPassword}</div>
                        ) : null}
                        <button type="submit" className="submit-btn">Registrarse</button>
                    </Form>
                )}
            </Formik>
            <p>{registerMessage}</p>
        </div>
    )
}

export default Login;