import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from "@/Components/ui/input"
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
export default function Login({ status, canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    
    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const onChangeInput = (e) => {
        if (e.target) {
            const id = e.target.id
            setData(id, e.target.value);
            errors[id] = false
            errors.credentials = false
        }
    }    

    return (
        <GuestLayout credentialError={errors?.credentials}>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" onChange={(e) => onChangeInput(e)} className="mt-2" value={data.email} autoComplete="username" />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="email">Password</Label>
                    <Input type="password" id="password" name="password" onChange={(e) => onChangeInput(e)} className="mt-2" value={data.password} autoComplete="current-password" />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block flex justify-between	">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800 text-end"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="mt-4 flex items-center">
                    <Button type="submit" variant="default" className="w-full">Log In</Button>
                </div>
            </form>
        </GuestLayout>
    );
}
