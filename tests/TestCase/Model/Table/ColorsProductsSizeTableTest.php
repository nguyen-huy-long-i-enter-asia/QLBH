<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ColorsProductsSizeTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ColorsProductsSizeTable Test Case
 */
class ColorsProductsSizeTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ColorsProductsSizeTable
     */
    protected $ColorsProductsSize;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.ColorsProductsSize',
        'app.Colors',
        'app.Products',
        'app.Sizes',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('ColorsProductsSize') ? [] : ['className' => ColorsProductsSizeTable::class];
        $this->ColorsProductsSize = $this->getTableLocator()->get('ColorsProductsSize', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->ColorsProductsSize);

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
