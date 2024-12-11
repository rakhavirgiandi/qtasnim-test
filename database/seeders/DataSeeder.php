<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('products')->truncate();
        DB::table('orders')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        //
        $categories = [
            [
                "key" => "konsumsi",
                "title" => "Konsumsi"
            ],
            [
                "key" => "pembersih",
                "title" => "Pembersih"
            ]
        ];

        $products = [
            [   
                "key" => "coffee",
                "name" => "Kopi",
                "price" => "5000",
                "price_currency" => "idr",
                "stock" => 100,
                "description" => "",
                "category" => "konsumsi"
            ],
            [   
                "key" => "tea",
                "name" => "Teh",
                "price" => "3000",
                "price_currency" => "idr",
                "stock" => 100,
                "description" => "",
                "category" => "konsumsi"
            ],
            [   
                "key" => "toothpaste",
                "name" => "Pasta Gigi",
                "price" => "11000",
                "price_currency" => "idr",
                "stock" => 100,
                "description" => "",
                "category" => "pembersih"
            ],
            [   
                "key" => "soap",
                "name" => "Sabun Mandi",
                "price" => "4000",
                "price_currency" => "idr",
                "stock" => 100,
                "description" => "",
                "category" => "pembersih"
            ],
            [   
                "key" => "shampoo",
                "name" => "Sampo",
                "price" => "4000",
                "price_currency" => "idr",
                "stock" => 100,
                "description" => "",
                "category" => "pembersih"
            ],
        ];

        $orders = [
            [

                "product_key" => "coffee",
                "order_date" => Carbon::parse('2021-05-01 12:34:00'),
                "order_amount" => 10
            ],
            [

                "product_key" => "tea",
                "order_date" => Carbon::parse('2021-05-05 16:12:00'),
                "order_amount" => 19
            ],
            [

                "product_key" => "coffee",
                "order_date" => Carbon::parse('2021-05-10 16:12:00'),
                "order_amount" => 15
            ],
            [

                "product_key" => "toothpaste",
                "order_date" => Carbon::parse('2021-05-11 12:51:00'),
                "order_amount" => 20
            ],
            [

                "product_key" => "soap",
                "order_date" => Carbon::parse('2021-05-11 12:18:00'),
                "order_amount" => 30
            ],
            [

                "product_key" => "shampoo",
                "order_date" => Carbon::parse('2021-05-12 21:09:00'),
                "order_amount" => 25
            ],
            [

                "product_key" => "tea",
                "order_date" => Carbon::parse('2021-05-12 19:21:00'),
                "order_amount" => 5
            ]
        ];

        try {
            DB::beginTransaction();

            foreach ($categories as $key => $value) {
                Category::updateOrCreate (
                    attributes: ['key' => $value['key']],
                    values: ['title' => $value['title']]
                );
            }

            
            foreach ($products as $key => $value) {
                $product = new Product;
                
                $product->name = $value["name"];
                $product->price = $value["price"];
                $product->price_currency = $value["price_currency"];
                $product->description = $value["description"];
                $product->stock = $value["stock"];
                
                $category = Category::where('key', '=', $value["category"])->first();
                
                if ($category) {
                    $product->category()->associate($category);
                    $product->save();
                    $amount_reduction_history = [];
                    // $has_product_id = $product->id;

                    foreach ($orders as $order_key => $order_value) {
                        if ($order_value['product_key'] == $value['key']) {
                            var_dump($order_value);
                            $find_amount_reduction_history = Arr::first($amount_reduction_history, function ($find_amount_reduction_history_value, $find_amount_reduction_history_key) use ($order_value) {
                                return $find_amount_reduction_history_value['product_key'] === $order_value['product_key'];
                            });
                            
                            $previous_stock = $product->stock;

                            if ($find_amount_reduction_history) {
                                array_map(function ($amount_reduction_history_value) use ($order_value) {
                                    if ($amount_reduction_history_value['product_key'] === $order_value['product_key']) {
                                        $amount_reduction_history_value['amount_value'] += $order_value['order_amount'];
                                    }
                                    return $amount_reduction_history_value;
                                }, $amount_reduction_history);

                                $previous_stock = $previous_stock - $find_amount_reduction_history['amount_value'];
                            } else {
                                $amount_reduction_history[count($amount_reduction_history) === 0 ? count($amount_reduction_history) : count($amount_reduction_history) + 1] = [
                                    "product_key" => $order_value['product_key'],
                                    "amount_value" => $order_value['order_amount']
                                ];
                            }
                            
                            $order = new Order;
                            $order->previous_stock = $previous_stock;
                            $order->order_amount = $order_value['order_amount'];
                            $order->order_date = $order_value['order_date'];
                            $order->product()->associate($product);
                            
                            $order->save();
                        }
                    }

                }
            }
            
            DB::commit();
            print('class DummyProductSeeder has been successfully executed!');
        } catch (\Throwable $th) {
            print('error: '. $th->getMessage());
            DB::rollback();
        }
    }
}
