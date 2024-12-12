import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import Table from './partials/Table';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { usePage } from '@inertiajs/react'
import { DatePickerWithRange } from '../../Components/DatePickerWithRange';
import { useState } from 'react';
import { router } from '@inertiajs/react'
import moment from 'moment';

export default function Index({ orders, min_and_max_order_by_category:minAndMaxOrderByCategory }) {

    const { flash, alerts } = usePage().props
    const params = route().params;
    const [date, setDate] = useState();
    const currentRoute = route().current();

    const meta = {
        path: orders?.meta.path,
        currentPage: orders?.meta.current_page,
        firstPage: 1,
        lastPage: orders?.meta.last_page,
        limit: params.limit ? parseInt(params.limit) : 10,
        from: orders.meta.from,
        to: orders.meta.to,
        total: orders.meta.total,
        pageQuery: "page",
    };

    const onDateRangeChangeHandle = (value) => {
        setDate(value);
        if (value.from && value.to) {
            const startDateFormated = moment(value.from).format('DD-MM-YYYY');
            const endDateFormated = moment(value.to).format('DD-MM-YYYY');
            const queryParams = { ...params, start: startDateFormated, end: endDateFormated };
            const url = route(currentRoute);
            router.get(url, queryParams, {replace: true, preserveState: true});
        }
    }
    
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
                <DatePickerWithRange className="w-full mb-3" onValueChange={onDateRangeChangeHandle} />
                <div className="row mb-3">
                    <div className="col w-full md:w-1/2">
                        <Card className="w-full">
                            <CardContent>
                                <h2 className="font-bold">{minAndMaxOrderByCategory.min?.category_title ? minAndMaxOrderByCategory.min?.category_title : "No Category" }</h2>
                                <p className="text-border text-slate-500 text-sm">
                                    {minAndMaxOrderByCategory.min?.total_orders ?
                                        `is the least sold category ${ date?.from && date?.to ? "from "+moment(date.from).format('DD/MM/YYYY') +" to "+moment(date.to).format('DD/MM/YYYY') : " of all time"} - ${minAndMaxOrderByCategory.min?.total_orders} item sold out`
                                    : 
                                    "No items sold out of any category"
                                    }
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col w-full md:w-1/2">
                        <Card className="w-full">
                            <CardContent>
                                <h2 className="font-bold">{minAndMaxOrderByCategory.max?.category_title ? minAndMaxOrderByCategory.max?.category_title : "No Category" }</h2>
                                <p className="text-border text-slate-500 text-sm">
                                {minAndMaxOrderByCategory.max?.total_orders ?
                                        `is the most sold category ${ date?.from && date?.to ? "from "+moment(date.from).format('DD/MM/YYYY') +" to "+moment(date.to).format('DD/MM/YYYY') : " of all time"} - ${minAndMaxOrderByCategory.max?.total_orders} item sold out`
                                    : 
                                    "No items sold out of any category"
                                }
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <hr className="my-3"/>
                <Table data={orders.data} meta={meta} />
                </div>
        </AuthenticatedLayout>
    );
}
