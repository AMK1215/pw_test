import { useMutation } from '@tanstack/react-query'
import logo from '../assets/images/logo.png'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required!",
    }),
    password: z.string().min(1, {
        message: "Password is required!",
    }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
    const [_, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    const { setUser } = useAuth();
    const { mutate: logIn, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            setUser(data.user)
            toast.success("Login Success!")
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
            setError("Invalid username or password. Please try again.");
        },
    });

    const onSubmit = (data: FormData) => {
        if (!data.username || !data.password) {
            setError("Username and password are required.");
            return;
        }
        setError('');
        logIn({ user_name: data.username, password: data.password });
    };

    return (
        <div className='homeCover min-h-screen py-10'>
            <div className="grid grid-cols-2">
                <div className='flex items-center justify-center'>
                    <img src={logo} className='w-[350px] h-[350px] rounded-full' />
                </div>
                <div>
                    <div className="min-h-screen  flex items-center">
                        <div className="  backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-6">
                                    <div className="relative mt-2">
                                        <input
                                            type="text"
                                            className="w-full p-4 text-lg font-semibold outline-none rounded-lg !bg-white/10  text-white italic  border-2 border-transparent  transition duration-300  "
                                            placeholder="Player Name"
                                            {...register('username')}

                                        />

                                    </div>
                                    {errors.username && (
                                        <p className="text-red-500 text-sm">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <div className="relative mt-2">
                                        <input
                                            type="password"
                                            className="w-full p-4 text-lg font-semibold outline-none rounded-lg !bg-white/10  text-white italic  border-2 border-transparent  transition duration-300  "
                                            placeholder="Password"
                                            {...register('password')}
                                        />

                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full cursor-pointer py-4 px-6 bg-white/20 backdrop-blur-xl uppercase text-xl   rounded-lg focus:outline-none  transition duration-300 transform hover:scale-105 font-bold text-[#FFE94D]"
                                >
                                    {isPending ? "Logging in..." : "Login"}
                                </button>
                            </form>

                        </div>
                    </div>






                </div>
            </div>
        </div>
    )
}

export default LoginPage
