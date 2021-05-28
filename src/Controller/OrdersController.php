<?php
declare(strict_types=1);

namespace App\Controller;
use Cake\Model\Table\Users;
use Cake\Model\Table\OrderDetails;
use Cake\Model\Table\TransactionStates;
use Cake\Model\Table\Colors;
use Cake\Model\Table\Sizes;
use Cake\Model\Table\Products;
/**
 * Orders Controller
 *
 * @property \App\Model\Table\OrdersTable $Orders
 * @method \App\Model\Entity\Order[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class OrdersController extends AppController
{
    private function orderDetailMapFunc($orderDetail){
        $product = $this->Products->get($orderDetail->product_id);
        $orderDetail["product"] = ['id'=> $product->id, 'name' =>$product->name, 'sell_price' => $product->sell_price, 'discount' => $product->discount];
        unset($orderDetail['product_id']);
        $size= $this->Sizes->get($orderDetail->size_id);
        $orderDetail["size"] = $size;
        unset($orderDetail['size_id']);
        $color = $this->Colors->get($orderDetail->color_id);
        $orderDetail['color'] = $color;
        unset($orderDetail['color_id']);
        unset($orderDetail['created']);
        unset($orderDetail['modified']);
        unset($orderDetail['receipt_id']);

        return $orderDetail;

    }
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $this->loadModel('Users');
        $this->loadModel('OrderDetails');
        $this->loadModel("Colors");
        $this->loadModel("Sizes");
        $this->loadModel('Products');
        $this->loadModel('TransactionStates');
        $orderMapFunc = function ( $order) {
            //Get full info of color,size
            $orderDetailMapFunc = function( $orderDetail) {
                $color = $this->Colors->find('all')->where(['id' => $orderDetail->color_id])->first();
                $size = $this->Sizes->find('all')->where(['id'  => $orderDetail->size_id] )->first();
                $product = $this->Products->find('all')->where(['id' => $orderDetail->product_id])->first();
                $orderDetail['color'] = $color;
                $orderDetail['size'] = $size;
                $orderDetail['product'] = $product;
                unset($orderDetail['color_id']);
                unset($orderDetail['size_id']);
                unset($orderDetail['product_id']);
                return $orderDetail;
            };
            $customer = $this->Users->find('all')->select(['id', 'name'])->where(['id' => $order->customer_id])->first();
            if($order->staff_id !== null) {
                $staff = $this->Users->find('all')->select(['id', 'name'])->where(['id' => $order->staff_id])->first();
            } else {
                $staff = null;
            }
            $state = $this->TransactionStates->find('all')->where(['id' => $order->state_id])->first();

            $order->staff= $staff;
            $order->customer = $customer;
            $order->state= $state;
            unset($order->customer_id);
            unset($order->staff_id);
            unset($order->state_id);
            unset($order->point);
            $order->created = $order->created->format('Y-m-d');
            $order->order_details=  array_map($orderDetailMapFunc, $order->order_details);
            return $order;

        };

        $orders = $this->Orders->find('all')->contain(['TransactionStates', 'OrderDetails'])->toArray();



        // $this->set(compact('products'));
        // $this->viewBuilder()->setOption('_serialize', 'products');
        $this->response = $this->response->withStringBody(json_encode(array_map($orderMapFunc, $orders)));
        $this->response = $this->response->withType('json');
        return $this->response;
        // $this->set(compact('products'));
    }
    /**
     * View method
     *
     * @param string|null $id Order id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $order = $this->Orders->get($id, [
            'contain' => ['Users', 'OrdersDetails'],
        ]);

        $this->set(compact('order'));
    }

    public function find($id = null){
        $this->loadModel('OrderDetails');
        $this->loadModel("Products");
        $this->loadModel('Colors');
        $this->loadModel('Sizes');
        $this->loadModel('Users');

        $order = $this->Orders->find('all')->contain(['OrderDetails', 'TransactionStates'])->where(['Orders.id' => $id])->first();
        if($order->staff_id !== null) {
        $staff = $this->Users->get($order->staff_id);
        $order['staff'] = ['id' => $staff->id, 'name' => $staff->name];
        }else {
            $order['staff'] = null;
        }
        $customer = $this->Users->get($order->customer_id);
        $receipt['customer'] = ['id' => $customer->id, 'name' => $customer->name];
        $order->created = $order->created->format('Y-m-d');
        unset($order['staff_id']);
        unset($order['customer_id']);
        unset($order['state_id']);
        $orderDetails = array_map(array($this, 'orderDetailMapFunc'), $order['order_details']);
        $order['order_details'] = $orderDetails;
        $this->response = $this->response->withStringBody(json_encode($order))->withType('json');

        return $this->response;

    }
    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $this->request->allowMethod(['post']);
        $this->loadModel('Users');
        $this->loadModel('OrderDetails');
        //Create new Order
        $newOrder = $this->Orders->newEmptyEntity();
        $customerEmail = $this->request->getData('customer_email');
        $customer = $this->Users->find('all')->where(['email'=> $customerEmail])->first();
        $newOrder->customer_id = $customer->id;
        $newOrder->state_id = 1;
        $newOrder->pay = $this->request->getData('pay');
        $newOrder->note = $this->request->getData('note');

        $this->Orders->save($newOrder);
        $order_id = $newOrder->id;

        //Create Order_details
        $order_details = json_decode($this->request->getData('order_details'));
        foreach( $order_details as $od) {
            $order_detail = $this->OrderDetails->newEmptyEntity();
            $order_detail->order_id = $order_id;
            $order_detail->product_id = $od->id;
            $order_detail->color_id = $od->color->id;
            $order_detail->size_id = $od->size->id;
            $order_detail->count = $od->count;
            $this->OrderDetails->save($order_detail);
        }
        $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));

        return $response;

    }

    /**
     * Edit method
     *
     * @param string|null $id Order id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $order = $this->Orders->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $order = $this->Orders->patchEntity($order, $this->request->getData());
            if ($this->Orders->save($order)) {
                $this->Flash->success(__('The order has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The order could not be saved. Please, try again.'));
        }
        $users = $this->Orders->Users->find('list', ['limit' => 200]);
        $this->set(compact('order', 'users'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Order id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $order = $this->Orders->get($id);
        if ($this->Orders->delete($order)) {
            $this->Flash->success(__('The order has been deleted.'));
        } else {
            $this->Flash->error(__('The order could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
