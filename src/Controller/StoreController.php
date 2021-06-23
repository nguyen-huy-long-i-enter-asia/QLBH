<?php
declare(strict_types=1);

namespace App\Controller;
use Cake\ORM\Locator\LocatorAwareTrait;
use Cake\Model\Table\ColorsProductsSizes;
use Cake\Model\Table\CategoriesProducts;
use Cake\Model\Table\Products;
use Cake\Filesystem\File;
use Cake\Datasource\ConnectionManager;
use Cake\ORM\Query;

/**
 * Store Controller
 *
 *
 * @property \App\Model\Table\ProductsTable $Products
 * @method \App\Model\Entity\Product[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class StoreController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        $this->loadComponent('MyAuth');
    }
    public function index()
    {
        $this->loadModel('Products');
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("CategoriesProducts");
        $filterFunc = function ($product) {
            return $product !== null;
        };
        $mapFunc = function ( $product) {
            //Add inventory property to product
            $colors_products_sizes= $this->ColorsProductsSizes->find()->contain(['Colors','Sizes'])->where(['product_id' => $product->id, 'count > ' => 0] )->toArray();
            if(!empty($colors_products_sizes) ){
                $sizeObject = array(
                    "size" =>$colors_products_sizes[0]['size']['name'] ,
                    "colors" => []
                );
                $sizesArray = [];
                $colorObject = ['color' => '', 'count' => 0];
                $colorsArray = array();
                $current_size = $colors_products_sizes[0]['size']['name'];
                foreach($colors_products_sizes as $cps) {

                    if($current_size != $cps['size']['name']){
                        $sizeObject['colors'] = $colorsArray;
                        array_push($sizesArray,$sizeObject);
                        $colorsArray = array();
                        $current_size = $cps['size']['name'];
                        $sizeObject['colors'] = [];
                        $sizeObject['size']= $cps['size']['name'];

                    }
                    $colorObject['color'] = $cps['color']['name'];
                    $colorObject['count'] = $cps['count'];
                    array_push($colorsArray, $colorObject);

                }
                $sizeObject['colors'] = $colorsArray;
                array_push($sizesArray,$sizeObject);
                $colorsArray = array();
                // debug($sizesArray);
                $product['inventory']=  $sizesArray;
                // debug($product);

                //Add Categories property to $product;
            $categories_products = $this->CategoriesProducts->find()->where(["product_id" => $product["id"]])->contain("Categories")->toArray();
            $categoriesArray = [];

            foreach( $categories_products as $cp){
                $categoryOfProduct= array(
                    'id' => $cp['category']['id'],
                    'name' => $cp['category']['name']
                );
                array_push($categoriesArray, $categoryOfProduct);
            };

            $product['categories']= $categoriesArray;

            $product['manufacturer']= array(
                'id'  => $product["manufacturer"]['id'],
                'name' => $product["manufacturer"]["name"]
            );
            unset($product["manufacturer_id"]);
            unset($product["state_id"]);
            return $product;
            }else {
                unset($product);
            }



        };

        $products = $this->Products->find('all')->contain(['Manufacturers', 'ProductStates'])->where(['state_id' => 1])->toArray();
        foreach($products as $product){
            $product['image'] = 'http://localhost:8765/img/'.$product['image'];
        }

        // $this->set(compact('products'));
        // $this->viewBuilder()->setOption('_serialize', 'products');
        $result = array_values(array_filter(array_map($mapFunc, $products), $filterFunc));

        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
        // $this->set(compact('products'));
    }
    //find product by name
    public function findByName($keyword = null) {

        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $query = "Select distinct products.id, name, image
        From products, colors_products_sizes
        WHERE products.id = colors_products_sizes.product_id
        AND count > 0 AND name LIKE ?";
        $result = $connection->execute($query,["%".$keyword."%"])->fetchAll('assoc');
        return $this->response->withStringBody(json_encode( $result))->withType('json');
    }
    public function findById($id = null) {
        $this->loadModel('Products');
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("CategoriesProducts");

        $product = $this->Products->find('all')->contain(['Manufacturers'])->where(['Products.id' => $id])->first();
        $colors_products_sizes= $this->ColorsProductsSizes->find()->contain(['Colors','Sizes'])->where(['product_id' => $product->id, 'count >' => 0] )->toArray();
        $sizeObject = array(
            "size" =>$colors_products_sizes[0]['size']['name'] ,
            "colors" => []
        );
        $sizesArray = [];
        $colorObject = ['color' => '', 'count' => 0];
        $colorsArray = array();
        $current_size = $colors_products_sizes[0]['size']['name'];
        foreach($colors_products_sizes as $cps) {

            if($current_size != $cps['size']['name']){
                $sizeObject['colors'] = $colorsArray;
                array_push($sizesArray,$sizeObject);
                $colorsArray = array();
                $current_size = $cps['size']['name'];
                $sizeObject['colors'] = [];
                $sizeObject['size']= $cps['size']['name'];

            }
            $colorObject['color'] = $cps['color']['name'];
            $colorObject['count'] = $cps['count'];
            array_push($colorsArray, $colorObject);

        }
        $sizeObject['colors'] = $colorsArray;
        array_push($sizesArray,$sizeObject);
        $colorsArray = array();
        // debug($sizesArray);
        $product['inventory']=  $sizesArray;
        // debug($product);

        //Add Categories property to $product;
        $categories_products = $this->CategoriesProducts->find()->where(["product_id" => $product["id"]])->contain("Categories")->toArray();
        $categoriesArray = [];

        foreach( $categories_products as $cp){
            $categoryOfProduct= array(
                'id' => $cp['category']['id'],
                'name' => $cp['category']['name']
            );
            array_push($categoriesArray, $categoryOfProduct);
        };

        $product['categories']= $categoriesArray;

        $product['manufacturer']= array(
            'id'  => $product["manufacturer"]['id'],
            'name' => $product["manufacturer"]["name"]
        );
        unset($product["manufacturer_id"]);
        unset($product["state_id"]);
        $product['colors'] = $this->getProductColors($id) ;
        $product['sizes'] = $this->getProductSizes($id);
        return $this->response->withStringBody(json_encode($product))->withType('json');

    }
    private function getProductColors($id = null) {
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $query = "Select distinct colors.id, colors.name
        From colors, colors_products_sizes
        WHERE colors.id = colors_products_sizes.color_id
        AND colors_products_sizes.product_id = ?";

        $result = $connection->execute($query,[$id])->fetchAll('assoc');
        return $result;
    }
    private function getProductSizes($id = null) {
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $query = "Select distinct sizes.id, sizes.name
        From sizes, colors_products_sizes
        WHERE sizes.id = colors_products_sizes.size_id
        AND colors_products_sizes.product_id = ?";

        $result = $connection->execute($query,[$id])->fetchAll('assoc');
        return $result;
    }
 }




