<?php
declare(strict_types=1);

namespace App\Controller;
use Cake\ORM\Locator\LocatorAwareTrait;
use Cake\Model\Table\ColorsProductsSizes;
use Cake\Model\Table\CategoriesProducts;
use Cake\Filesystem\File;
/**
 * Products Controller
 *
 * @property \App\Model\Table\ProductsTable $Products
 * @method \App\Model\Entity\Product[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ProductsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        // $path = WWW_ROOT . 'img/Sk8-Hi.png';
        // $type = pathinfo($path, PATHINFO_EXTENSION);
        // $data = file_get_contents($path);
        // $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        // echo $base64;
        $a = [];

        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("CategoriesProducts");
        $mapFunc = function ( $product) {
            //Add inventory property to product
            $colors_products_sizes= $this->ColorsProductsSizes->find()->contain(['Colors','Sizes'])->where(['product_id' => $product->id] )->toArray();
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
            }else {
                $product['inventory'] = [];
            }


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
        };

        $products = $this->Products->find('all')->contain(['Manufacturers', 'ProductStates'])->toArray();
        foreach($products as $product){
            $product['image'] = 'http://localhost:8765/img/'.$product['image'];
        }

        // $this->set(compact('products'));
        // $this->viewBuilder()->setOption('_serialize', 'products');
        $this->response = $this->response->withStringBody(json_encode(array_map($mapFunc, $products)));
        $this->response = $this->response->withType('json');
        return $this->response;
        // $this->set(compact('products'));
    }

    /**
     * View method
     *
     * @param string|null $id Product id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $product = $this->Products->get($id, [
            'contain' => ['Manufacturers', 'Categories', 'ColorsProductsSize', 'OrdersDetails', 'ReceiptDetails'],
        ]);

        $this->set(compact('product'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $this->loadModel("CategoriesProducts");
        $image = $this->request->getData('image');
        $imageName = $image->getClientFilename();

        $image->moveTo(WWW_ROOT . 'img/' . $imageName);

        $product = $this->Products->newEmptyEntity();
        $product->name = $this->request->getData('name');
        $product->manufacturer_id = (int)$this->request->getData('manufacturer');
        $product->discount = (int)$this->request->getData('discount');
        $product->original_price = (int)$this->request->getData('original_price');
        $product->sell_price = (int)$this->request->getData('sell_price');
        $product->state = (int)$this->request->getData('state');
        $product->note = $this->request->getData('note');
        $categories = json_decode($this->request->getData('categories'),true);
        $product->image = $imageName;
        $this->Products->save($product);
        $id = $product->id;
        foreach($categories as $category){
            $category_product = $this->CategoriesProducts->newEmptyEntity();
            $category_product->product_id = $id;
            $category_product->category_id = (int)$category;
            $this->CategoriesProducts->save($category_product);
        }


        if($this->Products->save($product)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => $name]));

        }
        return $response;

    }

    /**
     * Edit method
     *
     * @param string|null $id Product id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->loadModel("CategoriesProducts");
        $id = $this->request->getData('id');
        $product = $this->Products->get((int)$id);
        $old_categories_products = $this->CategoriesProducts->find()->where(["product_id" => $id]);
        $this->CategoriesProducts->deleteMany($old_categories_products);
        $image = $this->request->getData('image');
        if(!empty($image)) {
            $imageName = $image->getClientFilename();

            $image->moveTo(WWW_ROOT . 'img/' . $imageName);
            $product->image = $imageName;
        }

        $product->name = $this->request->getData('name');
        $product->manufacturer_id = (int)$this->request->getData('manufacturer');
        $product->discount = (int)$this->request->getData('discount');
        $product->original_price = (int)$this->request->getData('original_price');
        $product->sell_price = (int)$this->request->getData('sell_price');
        $product->state = (int)$this->request->getData('state');
        $product->note = $this->request->getData('note');
        $categories = json_decode($this->request->getData('categories'),true);

        $this->Products->save($product);

        foreach($categories as $category){
            $category_product = $this->CategoriesProducts->newEmptyEntity();
            $category_product->product_id = $id;
            $category_product->category_id = (int)$category;
            $this->CategoriesProducts->save($category_product);
        }


        if($this->Products->save($product)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => $name]));

        }
        return $response;

    }

    /**
     * Delete method
     *
     * @param string|null $id Product id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete()
    {

        $id = $this->request->getData('id');
        $product = $this->Products->get($id);
        if ($this->Products->delete($product)) {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        } else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));
        }
        return $response;

    }
    public function info($id = null) {

    }
}
