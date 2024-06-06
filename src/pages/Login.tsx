import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { LoginFail } from '../types/authResponse';

type InputsType = {
    username: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<InputsType>();
    const { login } = useUser();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<InputsType> = async ({ username, password }) => {
        const result = await login(username, password);
        if ('accessToken' in result) {
            navigate('/account');
        } else {
            const error = result as LoginFail;
            setServerError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-6">Log in to Ziina</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label>Username</label>
                        <input
                            type="text"
                            className={`focus:border-ziinaViolet bg-transparent border-2 border-solid focus:ring-0 outline-none rounded-3xl px-4 py-2 w-full ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('username', { required: 'Username should not be empty' })}

                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label>Password</label>
                        <input
                            type="password"
                            className={`focus:border-ziinaViolet bg-transparent border-2 border-solid focus:ring-0 outline-none rounded-3xl px-4 py-2 w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be longer than or equal to 8 characters'
                                }
                            })}

                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    {serverError && <p className="text-red-500 text-xs m-2 text-center">{serverError}</p>}
                    <button
                        type="submit"
                        className="w-full bg-ziinaViolet text-black rounded-3xl p-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
