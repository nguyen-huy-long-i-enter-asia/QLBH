<?php
declare(strict_types=1);

namespace App\Controller;
use Cake\Model\Table\Orders;
/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends AppController
{

    //Login
    public function login()
    {
        $session = $this->request->getSession();
        $email = $this->request->getData('email');
        $user = $this->Users->find()->where(["email"=>$email])->first();
        if(empty($user)) {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['email' => "", 'msg' => "Account not found"]));
        }else {

            $session->write('email', $email);
            $response = $this->response->withType('application/json')->withStringBody(json_encode(['email'=> $email,'position' => $user['position'],'session' => $session->read('email')]));
        }
        return $response;
    }
    public function logout()
{
    $email = $this->request->getData('email');
    $session = $this->request->getSession();
    $session->delete('email');
    $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
    return $response;
}
    public function auth(){
        $email = $this->request->getData('email');
        $session =$this->request->getSession();
        $isAuth = $email === $session->read('email')?true : false;
        $response = $this->response->withType('application/json')->withStringBody(json_encode(['isAuth' => $isAuth]));
        return $response;
    }
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $users = $this->paginate($this->Users);

        $this->set(compact('users'));
    }

    public function staffs()
    {
        $staffs = $this->Users->find('all')->where(['OR'=> [['position'=> 1], ['position' => 2]]])->toArray();
        $response = $this->response->withType('application/json')->withStringBody(json_encode($staffs));
        return $response;
    }
    public function getCustomersByStaff(){
        $query =  $this->Users->find()->leftJoinWith('Orders');
        $query->select(['id','name','phone','address','email','image','total_pay' => $query->func()->coalesce([$query->func()->sum('Orders.pay'), 0])])->where(['position' => 3])->group(['Users.id'])->toArray();
        return $this->response->withStringBody(json_encode( $query))->withType('json');
    }
    public function getStaffsByManager(){
        $result = $this->Users->find('all')->select(['id','name','password','phone','address','email','image'])->where(['position' => 2])->toArray();
        return $this->response->withStringBody(json_encode( $result))->withType('json');
    }
    /**
     * View method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    // public function find($id = null)
    // {
    //     $user = $this->Users->find('all')
    // }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {

        $user = $this->Users->newEmptyEntity();
        $image = $this->request->getData('image');
        if(!empty($image)) {
            $imageName = $image->getClientFilename();
            $image->moveTo(WWW_ROOT . 'img/Avatar' . $imageName);
            $user->image = $imageName;
        }


        $user->name = $this->request->getData('name');
        $user->email = $this->request->getData('email');
        $password = $this->request->getData('password');
        if($password){
            $user->password = $password;

        } else {
            $user->password = null;
        }

        $user->phone = $this->request->getData('phone');
        $user->address = $this->request->getData('address');
        if($this->request->getData('type') ==="customer"){
            $user->position = 3;
        } else {
            $user->position = 2;
        }



        if($this->Users->save($user)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success", "id" => $user->id]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;

    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->loadModel("CategoriesProducts");
        $id = $this->request->getData('id');
        $user = $this->Users->get((int)$id);

        $image = $this->request->getData('image');
        if(!empty($image)) {
            unlink(WWW_ROOT . 'img/Avatar/' . $user->image);
            $imageName = $image->getClientFilename();

            $image->moveTo(WWW_ROOT . 'img/Avatar/' . $imageName);
            $user->image = $imageName;
        }
        $user->name = $this->request->getData('name');
        $user->email = $this->request->getData('email');
        $user->phone = $this->request->getData('phone');
        $user->address = $this->request->getData('address');
        if($this->Users->save($user)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success",]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;

    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function deleteCustomer($id = null)
    {
       $customer = $this->Users->get((int)$id);
       if($this->Users->delete($customer)){
        return $this->response->withType('application/json')->withStringBody(json_encode(['status' =>'success']));
       } else {
        return $this->response->withType('application/json')->withStringBody(json_encode(['status' =>'fail']));
       }

    }
    //Find Customer By ID
    public function findCustomer($id = null)
    {

        $this->loadModel('Orders');
        $customer = $this->Users->find('all')->select(['id', 'name','email','phone', 'address', 'image'])->where(['position' => 3, 'id' => (int)$id])->first();
        $orders = $this->Orders->find('all')->where(['customer_id' => $id])->contain(['Staff','TransactionStates'])->toArray();
        $customer->orders = $orders;
        return $this->response->withType('application/json')->withStringBody(json_encode($customer));
    }

    public function findCustomerByKeyword()
    {

        $keyword = $this->request->getData('keyword');
        $result = $this->Users->find('all')->select(['id', 'name', 'email', 'phone', 'address', 'image'])->where(['position' => 3, 'OR' => [['name LIKE' => '%'.$keyword.'%' ] , ['email LIKE ' => '%'.$keyword.'%'], ['phone LIKE' => '%'.$keyword.'%']]])->toArray();


        return $this->response->withType('application/json')->withStringBody(json_encode($result));
    }

}
