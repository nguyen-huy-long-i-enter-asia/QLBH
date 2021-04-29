<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ColorsTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ColorsTable Test Case
 */
class ColorsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ColorsTable
     */
    protected $Colors;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.Colors',
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
        $config = $this->getTableLocator()->exists('Colors') ? [] : ['className' => ColorsTable::class];
        $this->Colors = $this->getTableLocator()->get('Colors', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->Colors);

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
