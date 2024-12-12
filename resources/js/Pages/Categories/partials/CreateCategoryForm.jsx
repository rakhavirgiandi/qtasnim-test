import React, { useEffect, useState } from 'react';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

const CreateCategoryForm = ({ className = "" }) => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            key: '',
            title: '',
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit}>
              <div className="mb-3">
                <Label htmlFor="key">Key</Label>
                <Input type="text" id="key" name="key" onChange={(e) => setData('key', e.target.value)} value={data.key} className="mt-2"  />
                <InputError className="mt-2" message={errors.key} />
              </div>
              <div className="mb-3">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" name="title" onChange={(e) => setData('title', e.target.value)} value={data.title} className="mt-2"  />
                <InputError className="mt-2" message={errors.title} />
              </div>
              <div className="flex flex-wrap justify-end mt-3">
                  <Button type="submit" disabled={processing}>Submit</Button>
              </div>
            </form>
        </section>
    );
}

export default CreateCategoryForm;
