<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ProductStatesTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ProductStatesTable Test Case
 */
class ProductStatesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ProductStatesTable
     */
    protected $ProductStates;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.ProductStates',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('ProductStates') ? [] : ['className' => ProductStatesTable::class];
        $this->ProductStates = $this->getTableLocator()->get('ProductStates', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->ProductStates);

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
}
