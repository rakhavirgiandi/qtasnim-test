import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
                <div className="container px-6 mx-auto">
                    <Card>
                        <CardContent >
                    You're logged in!
                        </CardContent>
                    </Card>
                </div>
        </AuthenticatedLayout>
    );
}
