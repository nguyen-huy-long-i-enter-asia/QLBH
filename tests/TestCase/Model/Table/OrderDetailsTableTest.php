<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\OrderDetailsTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\OrderDetailsTable Test Case
 */
class OrderDetailsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\OrderDetailsTable
     */
    protected $OrderDetails;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.OrderDetails',
        'app.Orders',
        'app.Products',
        'app.Sizes',
        'app.Colors',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('OrderDetails') ? [] : ['className' => OrderDetailsTable::class];
        $this->OrderDetails = $this->getTableLocator()->get('OrderDetails', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->OrderDetails);

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
