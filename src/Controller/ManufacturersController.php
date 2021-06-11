<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Manufacturers Controller
 *
 * @property \App\Model\Table\ManufacturersTable $Manufacturers
 * @method \App\Model\Entity\Manufacturer[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ManufacturersController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        // $result = $this->Manufacturers->find('all')->toArray();
        // $this->response = $this->response->withStringBody(json_encode($result));
        // $this->response = $this->response->withType('json');
        // return $this->response;
        $query =  $this->Manufacturers->find()->leftJoinWith('Receipts');
        $query->select(['id','name','phone','address','email','note','total' => $query->func()->sum('Receipts.total')])->group(['Manufacturers.id'])->toArray();
        return $this->response->withStringBody(json_encode( $query))->withType('json');
    }

    /**
     * View method
     *
     * @param string|null $id Manufacture id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $manufacture = $this->Manufacturers->get($id, [
            'contain' => ['Products', 'Receipts'],
        ]);

        $this->set(compact('manufacturer'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $manufacture = $this->Manufacturers->newEmptyEntity();
        if ($this->request->is('post')) {
            $manufacture = $this->Manufacturers->patchEntity($manufacturer, $this->request->getData());
            if ($this->Manufacturers->save($manufacturer)) {
                $this->Flash->success(__('The manufacture has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The manufacture could not be saved. Please, try again.'));
        }
        $this->set(compact('manufacturer'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Manufacture id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $manufacture = $this->Manufacturers->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $manufacture = $this->Manufacturers->patchEntity($manufacturer, $this->request->getData());
            if ($this->Manufacturers->save($manufacturer)) {
                $this->Flash->success(__('The manufacture has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The manufacture could not be saved. Please, try again.'));
        }
        $this->set(compact('manufacturer'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Manufacture id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $manufacture = $this->Manufacturers->get($id);
        if ($this->Manufacturers->delete($manufacturer)) {
            $this->Flash->success(__('The manufacture has been deleted.'));
        } else {
            $this->Flash->error(__('The manufacture could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
