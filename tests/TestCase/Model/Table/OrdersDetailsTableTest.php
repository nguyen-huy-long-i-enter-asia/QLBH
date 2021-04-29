<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\OrdersDetailsTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\OrdersDetailsTable Test Case
 */
class OrdersDetailsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\OrdersDetailsTable
     */
    protected $OrdersDetails;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.OrdersDetails',
        'app.Orders',
        'app.Products',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('OrdersDetails') ? [] : ['className' => OrdersDetailsTable::class];
        $this->OrdersDetails = $this->getTableLocator()->get('OrdersDetails', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->OrdersDetails);

        parent::tearDown();
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
