<?php
declare(strict_types=1);

namespace App\Controller;
use Cake\I18n\Time;
use Cake\Model\Table\ReceiptDetails;
use Cake\Model\Table\ColorsProductsSizes;
use Cake\Model\Table\Users;
use Cake\Model\Table\Products;
use Cake\Model\Table\Manufacturers;
use Cake\Model\Table\Colors;
use Cake\Model\Table\Sizes;
/**
 * Receipts Controller
 *
 * @property \App\Model\Table\ReceiptsTable $Receipts
 * @method \App\Model\Entity\Receipt[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */

class ReceiptsController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    private function receiptDetailMapFunc($receiptDetail){
        $product = $this->Products->get($receiptDetail->product_id);
        $receiptDetail["product"] = ['id'=> $product->id, 'name' =>$product->name, 'original_price' => $product->original_price];
        unset($receiptDetail['product_id']);
        $size= $this->Sizes->get($receiptDetail->size_id);
        $receiptDetail["size"] = $size;
        unset($receiptDetail['size_id']);
        $color = $this->Colors->get($receiptDetail->color_id);
        $receiptDetail['color'] = $color;
        unset($receiptDetail['color_id']);
        unset($receiptDetail['created']);
        unset($receiptDetail['modified']);
        unset($receiptDetail['receipt_id']);

        return $receiptDetail;

    }
    public function index()
    {
        $this->loadModel('ReceiptDetails');
        $this->loadModel("Products");
        $this->loadModel("Manufacturers");
        $this->loadModel('Colors');
        $this->loadModel('Sizes');
        $this->loadModel('Users');

        $receiptMapFunc = function($receipt) {
            $staff = $this->Users->get($receipt->staff_id);
            $manufacturer = $this->Manufacturers->get($receipt->manufacturer_id);
            $receipt['staff'] = ['id' => $staff->id, 'name' => $staff->name];
            $receipt['manufacturer'] = ['id' => $manufacturer->id, 'name' => $manufacturer->name];
            $receipt->created = $receipt->created->format('Y-m-d');
            unset($receipt['staff_id']);
            unset($receipt['manufacturer_id']);
            $receiptDetails = array_map(array($this, 'receiptDetailMapFunc'), $receipt['receipt_details']);
            $receipt['receipt_details'] = $receiptDetails;
            return $receipt;
        };

        $receipts = $this->Receipts->find('all')->contain('ReceiptDetails')->toArray();

        $this->response = $this->response->withStringBody(json_encode(array_map($receiptMapFunc,$receipts)));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    /**
     * View method
     *
     * @param string|null $id Receipt id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $receipt = $this->Receipts->get($id, [
            'contain' => ['Manufacturers', 'Users', 'ReceiptDetails'],
        ]);

        $this->set(compact('receipt'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $receipt = $this->Receipts->newEmptyEntity();
        if ($this->request->is('post')) {
            $receipt = $this->Receipts->patchEntity($receipt, $this->request->getData());
            if ($this->Receipts->save($receipt)) {
                $this->Flash->success(__('The receipt has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The receipt could not be saved. Please, try again.'));
        }
        $manufacturers = $this->Receipts->Manufacturers->find('list', ['limit' => 200]);
        $users = $this->Receipts->Users->find('list', ['limit' => 200]);
        $this->set(compact('receipt', 'manufacturers', 'users'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Receipt id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit()
    {
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("ReceiptDetails");
        $this->loadModel('Users');
        $this->request->allowMethod(['post']);
        $receipt_id = $this->request->getData('receipt_id');
        $receipt_details = json_decode($this->request->getData('receipt_details'));
        $receipt = $this->Receipts->get($receipt_id);
        $receipt->manufacturer_id = (int)$this->request->getData('manufacturer_id');
        $user = $this->Users->find()->where(['email' => $this->request->getData('staff_email')])->first();

        $receipt->staff_id = $user->id;
        $receipt->total = (int)$this->request->getData('total');
        $receipt->note = $this->request->getData('note');
        $receipt->modified = Time::now();
        $this->Receipts->save($receipt);
        //Delete old receipt_details
        $old_receipt_details = $this->ReceiptDetails->find('all')->contain(['Colors', 'Sizes', 'Products'])->where(['receipt_id' => $receipt_id]);
        foreach($old_receipt_details as $ord){
            $color_product_size = $this->ColorsProductsSizes->find()->where(['product_id' => (int)$ord->product->id, 'size_id'=>(int)$ord->size->id, 'color_id' => (int)$ord->color->id ])->first();
            if($color_product_size) {

                $color_product_size->count = $color_product_size->count - (int)$rd->count;
                $this->ColorsProductsSizes->save($color_product_size);
            }

        }
        $this->ReceiptDetails->deleteMany($old_receipt_details);

        foreach($receipt_details as $rd){
            $receipt_detail = $this->ReceiptDetails->newEmptyEntity();
            $receipt_detail->receipt_id = $receipt_id;
            $receipt_detail->product_id = (int)$rd->id;
            $receipt_detail->size_id = (int)$rd->size_id;
            $receipt_detail->color_id = (int)$rd->color_id;
            $receipt_detail->count = (int)$rd->count;
            $this->ReceiptDetails->save($receipt_detail);

            $color_product_size = $this->ColorsProductsSizes->find()->where(['product_id' => (int)$rd->id, 'size_id'=>(int)$rd->size_id, 'color_id' => (int)$rd->color_id ])->first();
            if($color_product_size) {

                $color_product_size->count = $color_product_size->count + (int)$rd->count;
                $this->ColorsProductsSizes->save($color_product_size);
            }
            else {
                $color_product_size = $this->ColorsProductsSizes->newEmptyEntity();
                $color_product_size->product_id = (int)$rd->id;
                $color_product_size->size_id = (int)$rd->size_id;
                $color_product_size->color_id = (int)$rd->color_id;
                $color_product_size->count = (int)$rd->count;
                $this->ColorsProductsSizes->save($color_product_size);
            }


        }
        $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));

        return $response;
    }
    public function find($id = null){
        $this->loadModel('ReceiptDetails');
        $this->loadModel("Products");
        $this->loadModel("Manufacturers");
        $this->loadModel('Colors');
        $this->loadModel('Sizes');
        $this->loadModel('Users');

        $receipt = $this->Receipts->find('all')->contain(['ReceiptDetails', 'Users'])->where(['Receipts.id' => $id])->first();
        $staff = $this->Users->get($receipt->staff_id);
        $manufacturer = $this->Manufacturers->get($receipt->manufacturer_id);
        $receipt['staff'] = ['id' => $staff->id, 'name' => $staff->name];
        $receipt['manufacturer'] = ['id' => $manufacturer->id, 'name' => $manufacturer->name];
        $receipt->created = $receipt->created->format('Y-m-d');
        unset($receipt['staff_id']);
        unset($receipt['manufacturer_id']);
        $receiptDetails = array_map(array($this, 'receiptDetailMapFunc'), $receipt['receipt_details']);
        $receipt['receipt_details'] = $receiptDetails;
        $this->response = $this->response->withStringBody(json_encode($receipt))->withType('json');

        return $this->response;

    }

    /**
     * Delete method
     *
     * @param string|null $id Receipt id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("ReceiptDetails");
        $this->loadModel('Users');
        $this->request->allowMethod(['get']);

        $receipt = $this->Receipts->get($id);

        //Delete old receipt_details
        $old_receipt_details = $this->ReceiptDetails->find('all')->where(['receipt_id' => $id]);
        foreach($old_receipt_details as $ord){
            $color_product_size = $this->ColorsProductsSizes->find()->where(['product_id' => (int)$ord->product_id, 'size_id'=>(int)$ord->size_id, 'color_id' => (int)$ord->color_id ])->first();
            if($color_product_size) {

                $color_product_size->count = $color_product_size->count - (int)$ord->count;
                $this->ColorsProductsSizes->save($color_product_size);
            }

        }
        $this->Receipts->delete($receipt);



        $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));

        return $response;
    }
    public function import() {
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("ReceiptDetails");
        $this->loadModel('Users');
        $this->request->allowMethod(['post']);
        $receipt_details = json_decode($this->request->getData('receipt_details'), true);
        $receipt = $this->Receipts->newEmptyEntity();
        $receipt->manufacturer_id = (int)$this->request->getData('manufacturer_id');
        $user = $this->Users->find()->where(['email' => $this->request->getData('staff_email')])->first();

        $receipt->staff_id = $user->id;
        $receipt->total = (int)$this->request->getData('total');
        $receipt->note = $this->request->getData('note');
        $receipt->created = Time::now();
        $receipt->modified = Time::now();
        $this->Receipts->save($receipt);
        $receipt_id= $receipt->id;

        // $new_receipt_details = [];
        // debug($receipt_details);
        foreach($receipt_details as $rd){
            $receipt_detail = $this->ReceiptDetails->newEmptyEntity();
            $receipt_detail->receipt_id = $receipt_id;
            $receipt_detail->product_id = (int)$rd['id'];
            $receipt_detail->size_id = (int)$rd["size_id"];
            $receipt_detail->color_id = (int)$rd["color_id"];
            $receipt_detail->count = (int)$rd["count"];
            // debug($receipt_detail);
            $this->ReceiptDetails->save($receipt_detail);

            //Change count of products in colors_products_sizes table
            $color_product_size = $this->ColorsProductsSizes->find()->where(['product_id' => (int)$rd["id"], 'size_id'=>(int)$rd["size_id"], 'color_id' => (int)$rd["color_id"] ])->first();
            if($color_product_size) {
                $color_product_size->count = $color_product_size->count + (int)$rd["count"];

                $this->ColorsProductsSizes->save($color_product_size);
            }else {
                $color_product_size = $this->ColorsProductsSizes->newEmptyEntity();
                $color_product_size->product_id = (int)$rd["id"];
                $color_product_size->size_id = (int)$rd["size_id"];
                $color_product_size->color_id = (int)$rd["color_id"];
                $color_product_size->count = (int)$rd["count"];
                debug($color_product_size);
                $this->ColorsProductsSizes->save($color_product_size);
            }
        }
        // $this->ReceiptDetails->saveMany($new_receipt_details);
        $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));

        return $response;
    }
}
