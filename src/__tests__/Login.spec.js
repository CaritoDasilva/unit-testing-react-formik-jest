import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from '../views/Login';
import { findByText, fireEvent, waitFor } from '@testing-library/dom';
import { act, render } from '@testing-library/react';


describe('<Login/>', () => {

    it('Componente se renderiza correctamente', () => {
        const login = shallow(<Login />);
        expect(login.length).toEqual(1);
    });

    it('Formulario se envía correctamente', async () => {
        const { container, debug } = render(<Login />);
        const email = container.querySelector('input[name="email"]');
        const password = container.querySelector('input[name="password"]')
        const fullName = container.querySelector('input[name="fullName"]')
        const confirmPassword = container.querySelector('input[name="confirmPassword"]')
        const form = container.querySelector('form#login-form');

        await waitFor(() => {
            fireEvent.change(password, {
                target: {
                value: 'fakepassword123',
                },
            });
            fireEvent.change(email, {
                target: {
                value: 'mock@email.com',
                },
            });
            fireEvent.change(fullName, {
                target: {
                value: 'Jane Doe',
                },
            });
            fireEvent.change(confirmPassword, {
                target: {
                value: 'fakepassword123',
                },
            });
        });
        await act( () => {
            fireEvent.submit(form, { preventDefault: jest.fn() })
        });

        expect(email.value).toBe('mock@email.com');
        expect(password.value).toBe('fakepassword123');
        expect(fullName.value).toBe('Jane Doe');
        expect(confirmPassword.value).toBe('fakepassword123');
        debug()
        expect(await findByText(container, 'Usuario se ha registrado correctamente')).toBeVisible()

        // expect(screen.getByText('holis')).toBeTruthy()
    })

})