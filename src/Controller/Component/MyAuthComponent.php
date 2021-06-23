<?php
declare(strict_types=1);

namespace App\Controller\Component;
use Cake\Controller\Component;


class MyAuthComponent extends Component
{

    public function staffAuth ()
    {
    $controller = $this->getController();
    return $controller->getRequest()->getCookie('email') !==null && $controller->getRequest()->getCookie('email') === $controller->getRequest()->getSession()->read('email') && ($controller->getRequest()->getCookie('position') === "2" || $controller->getRequest()->getCookie('position') === "1");
    }
    public function managerAuth ()
    {
    $controller = $this->getController();
    return $controller->getRequest()->getCookie('email') !==null && $controller->getRequest()->getCookie('email') === $controller->getRequest()->getSession()->read('email') && $controller->getRequest()->getCookie('position') === "1";
    }
    public function customerAuth ()
    {
    $controller = $this->getController();

    return $controller->getRequest()->getCookie('email') !==null && $controller->getRequest()->getCookie('email') === $controller->getRequest()->getSession()->read('email') && $controller->getRequest()->getCookie('position') === "3" ;
    }
    public function logedAuth ()
    {
        $controller = $this->getController();
        return $controller->getRequest()->getCookie('email') !==null && $controller->getRequest()->getCookie('email') === $controller->getRequest()->getSession()->read('email');
    }
}
