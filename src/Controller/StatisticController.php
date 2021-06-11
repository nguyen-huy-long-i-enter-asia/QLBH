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
    public function reportDatePicker()
    {
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');
        $result = [];
        $datePicker= $this->request->getData('datePicker');
        switch ($datePicker) {
            case "This day":
                $query = "Select SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
                FROM Orders, Products, Order_details
                WHERE Order_details.product_id = Products.id
                AND Orders.id = Order_details.order_id
                AND Orders.state_id = 2
                AND DAYOFYEAR(Order_details.created) = DAYOFYEAR(NOW())";

                $result = $connection->execute($query)->fetchAll('assoc');
                $result[0]['Label'] = "Today";
                break;
            case "This week":
                $query ="Select DAYNAME(order_details.created) as Label ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
                FROM Orders, Products, Order_details
                WHERE Order_details.product_id = Products.id
                AND Orders.id = Order_details.order_id
                AND Orders.state_id = 2
                AND Order_details.created >= DATE_ADD(NOW(), INTERVAL(-WEEKDAY(NOW())) DAY)
                AND Order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Label";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This month":
                $query = "Select DAY(order_details.created) as Label ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
                FROM Orders, Products, Order_details
                WHERE Order_details.product_id = Products.id
                AND Orders.id = Order_details.order_id
                AND Orders.state_id = 2
                AND Order_details.created >= SUBDATE(CURDATE(), (DAY(CURDATE())-1))
                AND Order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Label";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This year":
                $query ="Select MONTH(order_details.created) as Label ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
                FROM Orders, Products, Order_details
                WHERE Order_details.product_id = Products.id
                AND Orders.id = Order_details.order_id
                AND Orders.state_id = 2
                AND Order_details.created >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()),1)
                AND Order_details.created <= LAST_DAY(DATE_ADD(NOW(), INTERVAL 12-MONTH(NOW()) MONTH))
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
            $query = "Select DAY(order_details.created) as Label ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
            FROM Orders, Products, Order_details
            WHERE Order_details.product_id = Products.id
            AND Orders.id = Order_details.order_id
            AND Orders.state_id = 2
            AND Order_details.created >= ?
            AND Order_details.created <= ?
            GROUP BY Label";
        }

        else {
            $query = "Select MONTH(order_details.created) as Label ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
            FROM Orders, Products, Order_details
            WHERE Order_details.product_id = Products.id
            AND Orders.id = Order_details.order_id
            AND Orders.state_id = 2
            AND Order_details.created >= ?
            AND Order_details.created <= ?
            GROUP BY Label";
        }
        $result = $connection->execute($query, [$dateRange->startDate, $dateRange->endDate])->fetchAll('assoc');
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }

    public function reportProductIncomeDatePicker()
    {
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $datePicker= $this->request->getData('datePicker');
        $query = "SELECT Products.name as Name ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
        FROM Orders, Products, Order_details
        WHERE Order_details.product_id = Products.id
        AND Orders.id = Order_details.order_id
        AND Orders.state_id = 2 ";
        switch ($datePicker) {
            case "This day":
                $query .= "AND DAYOFYEAR(Order_details.created) = DAYOFYEAR(NOW())
                GROUP BY Products.id
                ORDER BY Income DESC
                LIMIT 10";

                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This week":
                $query .="AND Order_details.created >= DATE_ADD(NOW(), INTERVAL(-WEEKDAY(NOW())) DAY)
                AND Order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Products.id
                ORDER BY Income DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This month":
                $query .= "AND Order_details.created >= SUBDATE(CURDATE(), (DAY(CURDATE())-1))
                AND Order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Products.id
                ORDER BY Income DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This year":
                $query .="AND Order_details.created >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()),1)
                AND Order_details.created <= LAST_DAY(DATE_ADD(NOW(), INTERVAL 12-MONTH(NOW()) MONTH))
                GROUP BY Products.id
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
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $dateRange = json_decode($this->request->getData('dateRange'));
        // debug($dateRange);
        $query = "SELECT Products.name as Name ,SUM(( (Products.sell_price * (100- Products.discount)/100) - Products.original_price) * count) as Income
        FROM Orders, Products, Order_details
        WHERE Order_details.product_id = Products.id
        AND Orders.id = Order_details.order_id
        AND Orders.state_id = 2
        AND Order_details.created >= ?
        AND Order_details.created <= ?
        GROUP BY Products.id
        ORDER BY Income DESC
        LIMIT 10";

        $result = $connection->execute($query, [$dateRange->startDate, $dateRange->endDate])->fetchAll('assoc');
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }
    public function reportProductSellCountDatePicker()
    {
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $datePicker= $this->request->getData('datePicker');
        $query = "SELECT Products.name as Name ,SUM(count) as SellCount
        FROM Orders, Products, Order_details
        WHERE Order_details.product_id = Products.id
        AND Orders.id = Order_details.order_id
        AND Orders.state_id = 2 ";
        switch ($datePicker) {
            case "This day":
                $query .= "AND DAYOFYEAR(Order_details.created) = DAYOFYEAR(NOW())
                GROUP BY Products.id
                ORDER BY SellCount DESC
                LIMIT 10";

                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This week":
                $query .="AND Order_details.created >= DATE_ADD(NOW(), INTERVAL(-WEEKDAY(NOW())) DAY)
                AND Order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Products.id
                ORDER BY SellCount DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This month":
                $query .= "AND Order_details.created >= SUBDATE(CURDATE(), (DAY(CURDATE())-1))
                AND Order_details.created <= DATE_ADD(NOW(), INTERVAL(6 - WEEKDAY(NOW())) DAY)
                GROUP BY Products.id
                ORDER BY SellCount DESC
                LIMIT 10";
                $result = $connection->execute($query)->fetchAll('assoc');
                break;
            case "This year":
                $query .="AND Order_details.created >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()),1)
                AND Order_details.created <= LAST_DAY(DATE_ADD(NOW(), INTERVAL 12-MONTH(NOW()) MONTH))
                GROUP BY Products.id
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
        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');

        $dateRange = json_decode($this->request->getData('dateRange'));
        // debug($dateRange);
        $query = "SELECT Products.name as Name ,SUM(count) as SellCount
        FROM Orders, Products, Order_details
        WHERE Order_details.product_id = Products.id
        AND Orders.id = Order_details.order_id
        AND Orders.state_id = 2
        AND Order_details.created >= ?
        AND Order_details.created <= ?
        GROUP BY Products.id
        ORDER BY SellCount DESC
        LIMIT 10";

        $result = $connection->execute($query, [$dateRange->startDate, $dateRange->endDate])->fetchAll('assoc');
        $this->response = $this->response->withStringBody(json_encode($result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }
 }




