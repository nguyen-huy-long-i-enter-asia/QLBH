<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ReceiptDetails Model
 *
 * @property \App\Model\Table\ReceiptsTable&\Cake\ORM\Association\BelongsTo $Receipts
 * @property \App\Model\Table\ProductsTable&\Cake\ORM\Association\BelongsTo $Products
 *
 * @method \App\Model\Entity\ReceiptDetail newEmptyEntity()
 * @method \App\Model\Entity\ReceiptDetail newEntity(array $data, array $options = [])
 * @method \App\Model\Entity\ReceiptDetail[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ReceiptDetail get($primaryKey, $options = [])
 * @method \App\Model\Entity\ReceiptDetail findOrCreate($search, ?callable $callback = null, $options = [])
 * @method \App\Model\Entity\ReceiptDetail patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ReceiptDetail[] patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\ReceiptDetail|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ReceiptDetail saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ReceiptDetail[]|\Cake\Datasource\ResultSetInterface|false saveMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\ReceiptDetail[]|\Cake\Datasource\ResultSetInterface saveManyOrFail(iterable $entities, $options = [])
 * @method \App\Model\Entity\ReceiptDetail[]|\Cake\Datasource\ResultSetInterface|false deleteMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\ReceiptDetail[]|\Cake\Datasource\ResultSetInterface deleteManyOrFail(iterable $entities, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ReceiptDetailsTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('receipt_details');
        $this->setDisplayField('receipt_id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Receipts', [
            'foreignKey' => 'receipt_id',
        ]);
        $this->belongsTo('Products', [
            'foreignKey' => 'product_id',
        ]);
        $this->belongsTo('Sizes', [
            'foreignKey' => 'size_id',
        ]);
        $this->belongsTo('Colors', [
            'foreignKey' => 'color_id',
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->integer('id')
            ->allowEmptyString('id', null, 'create');

        $validator
            ->integer('count')
            ->allowEmptyString('count');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules): RulesChecker
    {
        $rules->add($rules->existsIn(['receipt_id'], 'Receipts'), ['errorField' => 'receipt_id']);
        $rules->add($rules->existsIn(['product_id'], 'Products'), ['errorField' => 'product_id']);
        $rules->add($rules->existsIn(['size_id'], 'Sizes'), ['errorField' => 'size_id']);
        $rules->add($rules->existsIn(['color_id'], 'Colors'), ['errorField' => 'color_id']);

        return $rules;
    }
}
