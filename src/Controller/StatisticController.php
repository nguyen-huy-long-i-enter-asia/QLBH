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

/**
 * Statistic Controller
 *
 *
 *
 *
 */
class StatisticController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        $this->loadComponent('MyAuth');
    }
    public function reportDatePicker()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');
        $result = [];
        $datePicker= $this->request->getData('datePicker');
        switch ($datePicker) {
            case "This day":
                $query = "Select SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
                FROM orders, products, order_details
                WHERE order_details.product_id = products.id
                AND orders.id = order_details.order_id
                AND orders.state_id = 2
                AND DAYOFYEAR(order_details.created) = DAYOFYEAR(NOW())";

                $result = $connection->execute($query)->fetchAll('assoc');
                $result[0]['Label'] = "Today";
                break;
            case "This week":
                $query ="Select DAYNAME(order_details.created) as Label ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
                FROM orders, oroducts, order_details
                WHERE order_details.product_id = products.id
                AND orders.id = order_details.order_id
                AND orders.state_id = 2
                AND order_details.created >= DATE_ADD(NOW(), INTERVAL(-WEEKDAY(NOW())) DAY)
                AND order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Label";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This month":
                $query = "Select DAY(order_details.created) as Label ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
                FROM orders, products, order_details
                WHERE order_details.product_id = products.id
                AND orders.id = order_details.order_id
                AND orders.state_id = 2
                AND order_details.created >= SUBDATE(CURDATE(), (DAY(CURDATE())-1))
                AND order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Label";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This year":
                $query ="Select MONTH(order_details.created) as Label ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
                FROM orders, products, order_details
                WHERE order_details.product_id = products.id
                AND orders.id = order_details.order_id
                AND orders.state_id = 2
                AND order_details.created >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()),1)
                AND order_details.created <= LAST_DAY(DATE_ADD(NOW(), INTERVAL 12-MONTH(NOW()) MONTH))
                GROUP BY Label";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
        }
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    public function reportDateRange()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $dateRange = json_decode($this->request->getData('dateRange'));
        // debug($dateRange);
        $startDate =  strtotime($dateRange->startDate);
        $endDate =  strtotime($dateRange->endDate);
        $days = ($endDate - $startDate) / 86400;
        if($days <= 31) {
            $query = "Select DAY(order_details.created) as Label ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
            FROM orders, products, order_details
            WHERE order_details.product_id = products.id
            AND orders.id = order_details.order_id
            AND orders.state_id = 2
            AND order_details.created >= ?
            AND order_details.created <= ?
            GROUP BY Label";
        }

        else {
            $query = "Select MONTH(order_details.created) as Label ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
            FROM orders, products, order_details
            WHERE order_details.product_id = products.id
            AND orders.id = order_details.order_id
            AND orders.state_id = 2
            AND order_details.created >= ?
            AND order_details.created <= ?
            GROUP BY Label";
        }
        $result = $connection->execute($query, [$dateRange->startDate, $dateRange->endDate])->fetchAll('assoc');
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    public function reportProductIncomeDatePicker()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $datePicker= $this->request->getData('datePicker');
        $query = "SELECT products.name as Name ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
        FROM orders, products, order_details
        WHERE order_details.product_id = products.id
        AND orders.id = order_details.order_id
        AND orders.state_id = 2 ";
        switch ($datePicker) {
            case "This day":
                $query .= "AND DAYOFYEAR(order_details.created) = DAYOFYEAR(NOW())
                GROUP BY products.id
                ORDER BY Income DESC
                LIMIT 10";

                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This week":
                $query .="AND order_details.created >= DATE_ADD(NOW(), INTERVAL(-WEEKDAY(NOW())) DAY)
                AND order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY products.id
                ORDER BY Income DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This month":
                $query .= "AND order_details.created >= SUBDATE(CURDATE(), (DAY(CURDATE())-1))
                AND order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY products.id
                ORDER BY Income DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This year":
                $query .="AND order_details.created >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()),1)
                AND order_details.created <= LAST_DAY(DATE_ADD(NOW(), INTERVAL 12-MONTH(NOW()) MONTH))
                GROUP BY products.id
                ORDER BY Income DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
        }
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    public function reportProductIncomeDateRange()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $dateRange = json_decode($this->request->getData('dateRange'));
        // debug($dateRange);
        $query = "SELECT products.name as Name ,SUM(( (products.sell_price * (100- products.discount)/100) - products.original_price) * count) as Income
        FROM orders, products, order_details
        WHERE order_details.product_id = products.id
        AND orders.id = order_details.order_id
        AND orders.state_id = 2
        AND order_details.created >= ?
        AND order_details.created <= ?
        GROUP BY products.id
        ORDER BY Income DESC
        LIMIT 10";

        $result = $connection->execute($query, [$dateRange->startDate, $dateRange->endDate])->fetchAll('assoc');
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }
    public function reportProductSellCountDatePicker()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $datePicker= $this->request->getData('datePicker');
        $query = "SELECT products.name as Name ,SUM(count) as SellCount
        FROM orders, products, order_details
        WHERE order_details.product_id = products.id
        AND orders.id = order_details.order_id
        AND orders.state_id = 2 ";
        switch ($datePicker) {
            case "This day":
                $query .= "AND DAYOFYEAR(order_details.created) = DAYOFYEAR(NOW())
                GROUP BY products.id
                ORDER BY SellCount DESC
                LIMIT 10";

                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This week":
                $query .="AND order_details.created >= DATE_ADD(NOW(), INTERVAL(-WEEKDAY(NOW())) DAY)
                AND order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY products.id
                ORDER BY SellCount DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This month":
                $query .= "AND order_details.created >= SUBDATE(CURDATE(), (DAY(CURDATE())-1))
                AND order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY products.id
                ORDER BY SellCount DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This year":
                $query .="AND order_details.created >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()),1)
                AND order_details.created <= LAST_DAY(DATE_ADD(NOW(), INTERVAL 12-MONTH(NOW()) MONTH))
                GROUP BY products.id
                ORDER BY SellCount DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
        }
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }
    public function reportProductSellCountDateRange()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $dateRange = json_decode($this->request->getData('dateRange'));
        // debug($dateRange);
        $query = "SELECT products.name as Name ,SUM(count) as SellCount
        FROM orders, products, order_details
        WHERE order_details.product_id = products.id
        AND orders.id = order_details.order_id
        AND orders.state_id = 2
        AND order_details.created >= ?
        AND order_details.created <= ?
        GROUP BY products.id
        ORDER BY SellCount DESC
        LIMIT 10";

        $result = $connection->execute($query, [$dateRange->startDate, $dateRange->endDate])->fetchAll('assoc');
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }
 }




