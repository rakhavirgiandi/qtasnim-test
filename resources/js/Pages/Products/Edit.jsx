import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateProductForm from './partials/CreateProductForm';
import { Button } from '@/Components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import UpdateProductForm from './partials/UpdateProductForm';

export default function Create({product, categories}) {
    console.log(product);
    
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-md:px-3">
                <div className="flex gap-3 content-center">
                    <Button size="icon" variant="outline" className="h-7 w-7" asChild>
                      <Link href={route('products.index')}>
                        <ArrowLeft/>
                      </Link>
                    </Button>
                    <h2 className="text-lg font-medium text-gray-900">Edit Product</h2>
                </div>
                <UpdateProductForm className="mt-3" product={product} categories={categories} />
            </div>
        </AuthenticatedLayout>
    );
}
