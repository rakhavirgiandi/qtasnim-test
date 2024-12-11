import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/Components/ui/alert"
export default function GuestLayout(props) {
    
    const currentRoute = route().current();

    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-6 sm:justify-center sm:pt-0 px-5 md:px-0 dark:bg-gray-900 ">
            <div className="w-full overflow-hidden sm:max-w-md">
                {props?.credentialError ? 
                    <Alert variant="destructive" className="mb-3">
                        {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {props?.credentialError}
                        </AlertDescription>
                    </Alert>
                : ""}
                <Card>
                    {currentRoute === 'login' ? 
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                    : ''}
                <CardContent>
                    {props.children}
                </CardContent>
                </Card>
            </div>
        </div>
    );
}
