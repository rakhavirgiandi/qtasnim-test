import React, { useEffect, useState } from 'react';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Link, useForm, usePage } from '@inertiajs/react';
import { priceFormat } from '../../../helpers/priceFormat';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/ui/select"
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';

const CreateProductForm = ({ className = "", categories = [] }) => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            price: 0,
            price_currency: 'idr',
            stock: 0,
            description: '',
            category_id: '',
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'));
    };

    const [priceWithCurrrency, setPiceWithCurrrency] = useState("");

    const onCategoryChangeHandle = (val) => {
        if (val) {
            setData('category_id', parseInt(val));
        }
    }
    
    const priceOnChangHandle = (val) => {
      setData('price', priceFormat(val).value);
      setPiceWithCurrrency(priceFormat(val).withCurrency);
      
    }

    return (
        <section className={className}>
            <form onSubmit={submit}>
              <div className="mb-3">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" onChange={(e) => setData('name', e.target.value)} value={data.name} className="mt-2" autoComplete="name" />
                <InputError className="mt-2" message={errors.name} />
              </div>
              <div className="mb-3 row">
                  <div className="col w-1/3 xl:w-1/5 lg:w-1/3 md:w-1/2 sm:w-1/2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={data.price_currency}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Currency"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idr">IDR</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError className="mt-2" message={errors.currency} />
                  </div>
                  <div className="col w-2/3 xl:w-4/5 lg:w-2/3 md:w-1/2 sm:w-1/2">
                    <Label htmlFor="price">Price</Label>
                    <Input type="text" id="price" name="price" inputMode="numeric" onChange={(e) => priceOnChangHandle(e.target.value)} value={priceWithCurrrency ? priceWithCurrrency : priceFormat(0).withCurrency} className="mt-2" autoComplete="price" />
                    <InputError className="mt-2" message={errors.price} />
                  </div>
              </div>
              <div className="mb-3">
                    <Label htmlFor="currency">Category</Label>
                    <Select value={data.category_id} onValueChange={onCategoryChangeHandle}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Placeholder" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                            categories.map((val, i) => {
                                return (
                                    <SelectItem value={val.id} key={i}>{val.title}</SelectItem>
                                )
                            })
                        }
                      </SelectContent>
                    </Select>
                    <InputError className="mt-2" message={errors.category_id} />
                  </div>
              <div className="mb-3">
                <Label htmlFor="stock">Stock</Label>
                <Input type="number" id="stock" name="stock" onChange={(e) => setData('stock', e.target.value)} value={data.stock} className="mt-2" />
                <InputError className="mt-2" message={errors.stock} />
              </div>
              <div className="mb-3">
                <Label htmlFor="description">Description</Label>
                <Textarea type="number" id="description" name="description" onChange={(e) => setData('description', e.target.value)} placeholder="Type your description here." value={data.description} className="mt-2" />
                <InputError className="mt-2" message={errors.description} />
              </div>
              <div className="flex flex-wrap justify-end mt-3">
                  <Button type="submit" disabled={processing}>Submit</Button>
              </div>
            </form>
        </section>
    );
}

export default CreateProductForm;
