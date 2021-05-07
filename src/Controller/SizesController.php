<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Sizes Controller
 *
 * @property \App\Model\Table\SizesTable $Sizes
 * @method \App\Model\Entity\Size[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class SizesController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $result = $this->Sizes->find()->toArray();
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    /**
     * View method
     *
     * @param string|null $id Size id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $size = $this->Sizes->get($id, [
            'contain' => ['ColorsProductsSize'],
        ]);

        $this->set(compact('size'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $size = $this->Sizes->newEmptyEntity();
        if ($this->request->is('post')) {
            $size = $this->Sizes->patchEntity($size, $this->request->getData());
            if ($this->Sizes->save($size)) {
                $this->Flash->success(__('The size has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The size could not be saved. Please, try again.'));
        }
        $this->set(compact('size'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Size id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $size = $this->Sizes->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $size = $this->Sizes->patchEntity($size, $this->request->getData());
            if ($this->Sizes->save($size)) {
                $this->Flash->success(__('The size has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The size could not be saved. Please, try again.'));
        }
        $this->set(compact('size'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Size id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $size = $this->Sizes->get($id);
        if ($this->Sizes->delete($size)) {
            $this->Flash->success(__('The size has been deleted.'));
        } else {
            $this->Flash->error(__('The size could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
