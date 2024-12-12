import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { usePage } from '@inertiajs/react'
import Table from './partials/Table';

export default function Index({ data, categories }) {

    const { flash, alerts } = usePage().props
    const params = route().params;

    const meta = {
        path: categories?.meta.path,
        currentPage: categories?.meta.current_page,
        firstPage: 1,
        lastPage: categories?.meta.last_page,
        limit: params.limit ? parseInt(params.limit) : 10,
        from: categories.meta.from,
        to: categories.meta.to,
        total: categories.meta.total,
        pageQuery: "page",
    };
    
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
                {
                    alerts.map((val, i) => {
                        let variant = 'default';
                        
                        if (val === 'error') {
                            variant = 'destructive';
                        } else if (val === 'success') {
                            variant = 'success';
                        }

                        if (flash[val]) {
                            return (
                                <Alert variant={variant} className="mb-3" key={i}>
                                <AlertTitle>{val}</AlertTitle>
                                <AlertDescription>
                                {flash[val]}
                                </AlertDescription>
                            </Alert>
                            );
                        }
                    })
                }
                    <Table data={categories.data} meta={meta} />
                </div>
        </AuthenticatedLayout>
    );
}
