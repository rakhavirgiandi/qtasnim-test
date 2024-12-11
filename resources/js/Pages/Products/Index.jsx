import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import Table from './partials/Table';

export default function Index({ data,products }) {

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

    console.log(products.meta);
    

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
                    <Table data={products.data} meta={meta} />
                </div>
        </AuthenticatedLayout>
    );
}
