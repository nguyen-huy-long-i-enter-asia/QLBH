<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * ColorsProductsSize Controller
 *
 * @property \App\Model\Table\ColorsProductsSizeTable $ColorsProductsSize
 * @method \App\Model\Entity\ColorsProductsSize[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ColorsProductsSizesController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        // $this->paginate = [
        //     'contain' => ['Colors', 'Products', 'Sizes'],
        // ];
        // $colorsProductsSize = $this->paginate($this->ColorsProductsSize);

        // $this->set(compact('colorsProductsSize'));
        $products = $this->ColorsProductsSize->find()->contain(['Colors','Sizes'])->where(['product_id' => 1] )->first();
            // $this->set(compact('products'));
            // $this->viewBuilder()->setOption('_serialize', 'products');
            $this->response = $this->response->withStringBody(json_encode($products));
            $this->response = $this->response->withType('json');
            return $this->response;
    }

    /**
     * View method
     *
     * @param string|null $id Colors Products Size id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $colorsProductsSize = $this->ColorsProductsSize->get($id, [
            'contain' => ['Colors', 'Products', 'Sizes'],
        ]);

        $this->set(compact('colorsProductsSize'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $colorsProductsSize = $this->ColorsProductsSize->newEmptyEntity();
        if ($this->request->is('post')) {
            $colorsProductsSize = $this->ColorsProductsSize->patchEntity($colorsProductsSize, $this->request->getData());
            if ($this->ColorsProductsSize->save($colorsProductsSize)) {
                $this->Flash->success(__('The colors products size has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The colors products size could not be saved. Please, try again.'));
        }
        $colors = $this->ColorsProductsSize->Colors->find('list', ['limit' => 200]);
        $products = $this->ColorsProductsSize->Products->find('list', ['limit' => 200]);
        $sizes = $this->ColorsProductsSize->Sizes->find('list', ['limit' => 200]);
        $this->set(compact('colorsProductsSize', 'colors', 'products', 'sizes'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Colors Products Size id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $colorsProductsSize = $this->ColorsProductsSize->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $colorsProductsSize = $this->ColorsProductsSize->patchEntity($colorsProductsSize, $this->request->getData());
            if ($this->ColorsProductsSize->save($colorsProductsSize)) {
                $this->Flash->success(__('The colors products size has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The colors products size could not be saved. Please, try again.'));
        }
        $colors = $this->ColorsProductsSize->Colors->find('list', ['limit' => 200]);
        $products = $this->ColorsProductsSize->Products->find('list', ['limit' => 200]);
        $sizes = $this->ColorsProductsSize->Sizes->find('list', ['limit' => 200]);
        $this->set(compact('colorsProductsSize', 'colors', 'products', 'sizes'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Colors Products Size id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $colorsProductsSize = $this->ColorsProductsSize->get($id);
        if ($this->ColorsProductsSize->delete($colorsProductsSize)) {
            $this->Flash->success(__('The colors products size has been deleted.'));
        } else {
            $this->Flash->error(__('The colors products size could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

    //get inventory of product with specified size and color
    public function getInventory()
    {
        $product_id = $this->request->getData('product_id');
        $size_id = $this->request->getData('size_id');
        $color_id = $this->request->getData('color_id');

        $result = $this->ColorsProductsSizes->find('all')->select(['count'])->where(['product_id' => (int)$product_id, 'size_id' => (int)$size_id, 'color_id' => (int)$color_id])->first();
        return $this->response->withStringBody(json_encode( $result))->withType('json');

    }
}
