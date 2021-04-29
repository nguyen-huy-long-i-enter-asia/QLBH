<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * ReceiptDetails Controller
 *
 * @property \App\Model\Table\ReceiptDetailsTable $ReceiptDetails
 * @method \App\Model\Entity\ReceiptDetail[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ReceiptDetailsController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Receipts', 'Products'],
        ];
        $receiptDetails = $this->paginate($this->ReceiptDetails);

        $this->set(compact('receiptDetails'));
    }

    /**
     * View method
     *
     * @param string|null $id Receipt Detail id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $receiptDetail = $this->ReceiptDetails->get($id, [
            'contain' => ['Receipts', 'Products'],
        ]);

        $this->set(compact('receiptDetail'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $receiptDetail = $this->ReceiptDetails->newEmptyEntity();
        if ($this->request->is('post')) {
            $receiptDetail = $this->ReceiptDetails->patchEntity($receiptDetail, $this->request->getData());
            if ($this->ReceiptDetails->save($receiptDetail)) {
                $this->Flash->success(__('The receipt detail has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The receipt detail could not be saved. Please, try again.'));
        }
        $receipts = $this->ReceiptDetails->Receipts->find('list', ['limit' => 200]);
        $products = $this->ReceiptDetails->Products->find('list', ['limit' => 200]);
        $this->set(compact('receiptDetail', 'receipts', 'products'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Receipt Detail id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $receiptDetail = $this->ReceiptDetails->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $receiptDetail = $this->ReceiptDetails->patchEntity($receiptDetail, $this->request->getData());
            if ($this->ReceiptDetails->save($receiptDetail)) {
                $this->Flash->success(__('The receipt detail has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The receipt detail could not be saved. Please, try again.'));
        }
        $receipts = $this->ReceiptDetails->Receipts->find('list', ['limit' => 200]);
        $products = $this->ReceiptDetails->Products->find('list', ['limit' => 200]);
        $this->set(compact('receiptDetail', 'receipts', 'products'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Receipt Detail id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $receiptDetail = $this->ReceiptDetails->get($id);
        if ($this->ReceiptDetails->delete($receiptDetail)) {
            $this->Flash->success(__('The receipt detail has been deleted.'));
        } else {
            $this->Flash->error(__('The receipt detail could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
