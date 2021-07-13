# Test unitarios con React, Jest y Formik

###### Es super importante que seamos capaces de escribir pruebas unitarias para nuestro código, que nos ayuden a asegurar que tiene la calidad que buscamos, controlar mejor los posible errores y que además nos aseguremos que cumple con las funcionalidades que definimos tenga nuestro componente.

###### Para este ejercicio vamos a desarrollar un formulario para un login con Formik, vamos a agregar todas las validaciones necesarias, para luego finalizar con la implementación de los test unitarios.

###### Primero vamos a crear nuestra aplicación con Create React App 
#
#
~~~
$ npx create-react-app my-app
~~~

###### Una vez instalado React vamos a continuar instalando formik y yup para las validaciones.
#
#
```sh
$ npm install formik -save
$ npm install yup -save

```

######  Vamos a crear una carpeta para nuestras views y dentro de esta una de Login para el componente que va a mostrar nuestro formulario. Vamos a hacer un registro de usuario sencillo utilizando Formik y Yup para las validaciones. A continuación mostramos el ejemplo del formulario.
#
#
```import React, { useState } from 'react';
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
```

###### Ahora vamos a configurar los tests. Jest va a buscar dentro de su carpeta src una llamada __tests__, así que vamos a crearla. También los test deben llamarse como el archivo del componente que vamos a testear con el siguiente formato Login.spec.js.
#
#