import React, { useEffect, useState } from 'react';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Link, useForm, usePage } from '@inertiajs/react';
import { priceFormat } from '../../../helpers/priceFormat';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/ui/select"
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from 'moment';

const CreateProductForm = ({ className = "", products = [] }) => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            product_id: '',
            order_date: '',
            order_amount: '',
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('orders.store'));
    };

    const onOrderDateChange = (val) => {
        const dateFormated = moment(val).format('YYYY-MM-DD');
        setData('order_date', dateFormated);
    }

    return (
        <section className={className}>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <Label htmlFor="product">Product</Label>
                    <Select value={data.product_id} onValueChange={(val) => setData('product_id', parseInt(val))}>
                      <SelectTrigger className="w-full mt-2" id="product">
                        <SelectValue placeholder="Select Product"  />
                      </SelectTrigger>
                      <SelectContent>
                        {
                            products.map((val, i) => {
                                return (
                                    <SelectItem value={val.id} key={i}>{val.name}</SelectItem>
                                )
                            })
                        }
                      </SelectContent>
                    </Select>
                    <InputError className="mt-2" message={errors.product_id} />
                </div>
                <div className="mb-3">
                    <Label htmlFor="currency">Order Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={
                            `justify-start text-left font-normal w-full mt-2 ${!data.order_date && 'text-muted-foreground'}`
                          }
                        >
                          <CalendarIcon />
                          {data.order_date ? format(data.order_date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={data.order_date}
                          onSelect={onOrderDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <InputError className="mt-2" message={errors.order_date} />
                </div>
                <div className="mb-3">
                    <Label htmlFor="order_amount">Order Amount</Label>
                    <Input type="number" id="order_amount" name="order_amount" onChange={(e) => setData('order_amount', e.target.value)} value={data.order_amount} className="mt-2" />
                    <InputError className="mt-2" message={errors.order_amount} />
                </div>
                <div className="flex flex-wrap justify-end mt-3">
                  <Button type="submit" disabled={processing}>Submit</Button>
              </div>
            </form>
        </section>
    );
}

export default CreateProductForm;
