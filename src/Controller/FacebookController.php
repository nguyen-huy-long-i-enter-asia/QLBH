<?php
declare(strict_types=1);
namespace App\Controller;
use Cake\ORM\Locator\LocatorAwareTrait;
use Cake\Model\Table\ColorsProductsSizes;
use Cake\Model\Table\CategoriesProducts;
use Cake\Model\Table\Products;
use Cake\Filesystem\File;
use Cake\Datasource\ConnectionManager;
use Cake\ORM\Query;
require_once ROOT.DS.'vendor/autoload.php';

/**
 * Facebook Controller
 *
 *
 * @property \App\Model\Table\ProductsTable $Products
 * @method \App\Model\Entity\Product[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class FacebookController extends AppController
{

    //find product by name
    public function login() {
        $fb = new Facebook\Facebook([
            'app_id' => '531932561113193',
            'app_secret' => 'd76e1c4716ed3da7690d686d42902454',
            'default_graph_version' => 'v2.10',
            ]);


        $helper = $fb->getRedirectLoginHelper();
        $permissions = ['email', 'user_likes']; // optional
        $loginUrl = $helper->getLoginUrl('http://localhost:8765/facebook/afterLogin', $permissions);

        echo '<a href="' . $loginUrl . '">Log in with Facebook!</a>';

    }
    public function afterLogin() {

    }

 }




