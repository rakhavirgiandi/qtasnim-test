import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';

export default function Index() {
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
                            This is Product page
                        </CardContent>
                    </Card>
                </div>
        </AuthenticatedLayout>
    );
}
