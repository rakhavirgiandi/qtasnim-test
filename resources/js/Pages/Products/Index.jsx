import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import Table from './partials/Table';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { usePage } from '@inertiajs/react'

export default function Index({ data, products }) {

    const { flash, alerts } = usePage().props

    const meta = {
        path: products?.meta.path,
        currentPage: products?.meta.current_page,
        firstPage: 1,
        lastPage: products?.meta.last_page,
        limit: products?.meta.per_page,
        from: products.meta.from,
        to: products.meta.to,
        total: products.meta.total,
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
                                <Alert variant={variant} className="mb-3">
                                <AlertTitle>{val}</AlertTitle>
                                <AlertDescription>
                                {flash[val]}
                                </AlertDescription>
                            </Alert>
                            );
                        }
                    })
                }
                    <Table data={products.data} meta={meta} />
                </div>
        </AuthenticatedLayout>
    );
}
