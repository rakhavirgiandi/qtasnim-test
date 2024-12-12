import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import CreateCategoryForm from './partials/CreateCategoryForm';

export default function Create() {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-md:px-3">
                <div className="flex gap-3 content-center">
                    <Button size="icon" variant="outline" className="h-7 w-7" asChild>
                      <Link href={route('categories.index')}>
                        <ArrowLeft/>
                      </Link>
                    </Button>
                    <h2 className="text-lg font-medium text-gray-900">Add Category</h2>
                </div>
                <CreateCategoryForm className="mt-3" />
            </div>
        </AuthenticatedLayout>
    );
}
