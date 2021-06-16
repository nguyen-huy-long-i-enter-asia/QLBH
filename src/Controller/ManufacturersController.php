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
        $query->select(['id','name','phone','address','email','note','total' => $query->func()->coalesce([$query->func()->sum('Receipts.total'),0])])->group(['Manufacturers.id'])->toArray();
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
        $manufacturer = $this->Manufacturers->newEmptyEntity();
        $manufacturer->name= $this->request->getData('name');
        $manufacturer->email = $this->request->getData('email');
        $manufacturer->phone = $this->request->getData('phone');
        $manufacturer->address = $this->request->getData('address');
        $manufacturer->note = $this->request->getData('note');
        if($this->Manufacturers->save($manufacturer)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;
    }

    /**
     * Edit method
     *
     * @param string|null $id Manufacture id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit()
    {
        $manufacturer = $this->Manufacturers->get($this->request->getData('id'));
        $manufacturer->name= $this->request->getData('name');
        $manufacturer->email = $this->request->getData('email');
        $manufacturer->phone = $this->request->getData('phone');
        $manufacturer->address = $this->request->getData('address');
        $manufacturer->note = $this->request->getData('note');
        if($this->Manufacturers->save($manufacturer)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;
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
        $manufacturer = $this->Manufacturers->get($id);
        if($this->Manufacturers->delete($manufacturer)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        } else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));
        }
        return $response;
    }
}
