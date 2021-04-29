<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\SizesTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\SizesTable Test Case
 */
class SizesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\SizesTable
     */
    protected $Sizes;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.Sizes',
        'app.ColorsProductsSize',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('Sizes') ? [] : ['className' => SizesTable::class];
        $this->Sizes = $this->getTableLocator()->get('Sizes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->Sizes);

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
