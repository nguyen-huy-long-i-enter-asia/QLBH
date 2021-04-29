<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\TransactionStatesTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\TransactionStatesTable Test Case
 */
class TransactionStatesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\TransactionStatesTable
     */
    protected $TransactionStates;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.TransactionStates',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('TransactionStates') ? [] : ['className' => TransactionStatesTable::class];
        $this->TransactionStates = $this->getTableLocator()->get('TransactionStates', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->TransactionStates);

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
