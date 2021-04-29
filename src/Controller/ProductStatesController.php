<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * ProductStates Controller
 *
 * @property \App\Model\Table\ProductStatesTable $ProductStates
 * @method \App\Model\Entity\ProductState[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ProductStatesController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $result = $this->ProductStates->find()->toArray();
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    /**
     * View method
     *
     * @param string|null $id Product State id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $productState = $this->ProductStates->get($id, [
            'contain' => [],
        ]);

        $this->set(compact('productState'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $productState = $this->ProductStates->newEmptyEntity();
        if ($this->request->is('post')) {
            $productState = $this->ProductStates->patchEntity($productState, $this->request->getData());
            if ($this->ProductStates->save($productState)) {
                $this->Flash->success(__('The product state has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The product state could not be saved. Please, try again.'));
        }
        $this->set(compact('productState'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Product State id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $productState = $this->ProductStates->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $productState = $this->ProductStates->patchEntity($productState, $this->request->getData());
            if ($this->ProductStates->save($productState)) {
                $this->Flash->success(__('The product state has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The product state could not be saved. Please, try again.'));
        }
        $this->set(compact('productState'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Product State id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $productState = $this->ProductStates->get($id);
        if ($this->ProductStates->delete($productState)) {
            $this->Flash->success(__('The product state has been deleted.'));
        } else {
            $this->Flash->error(__('The product state could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
