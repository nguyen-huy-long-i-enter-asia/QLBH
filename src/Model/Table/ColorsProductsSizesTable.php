<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ColorsProductsSize Model
 *
 * @property \App\Model\Table\ColorsTable&\Cake\ORM\Association\BelongsTo $Colors
 * @property \App\Model\Table\ProductsTable&\Cake\ORM\Association\BelongsTo $Products
 * @property \App\Model\Table\SizesTable&\Cake\ORM\Association\BelongsTo $Sizes
 *
 * @method \App\Model\Entity\ColorsProductsSize newEmptyEntity()
 * @method \App\Model\Entity\ColorsProductsSize newEntity(array $data, array $options = [])
 * @method \App\Model\Entity\ColorsProductsSize[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ColorsProductsSize get($primaryKey, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize findOrCreate($search, ?callable $callback = null, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ColorsProductsSize[] patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\ColorsProductsSize|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize[]|\Cake\Datasource\ResultSetInterface|false saveMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize[]|\Cake\Datasource\ResultSetInterface saveManyOrFail(iterable $entities, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize[]|\Cake\Datasource\ResultSetInterface|false deleteMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\ColorsProductsSize[]|\Cake\Datasource\ResultSetInterface deleteManyOrFail(iterable $entities, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ColorsProductsSizesTable extends Table
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

        $this->setTable('colors_products_sizes');
        $this->setDisplayField('color_id');
        $this->setPrimaryKey(['color_id', 'product_id', 'size_id']);

        $this->addBehavior('Timestamp');

        $this->belongsTo('Colors', [
            'foreignKey' => 'color_id',
        ]);
        $this->belongsTo('Products', [
            'foreignKey' => 'product_id',
        ]);
        $this->belongsTo('Sizes', [
            'foreignKey' => 'size_id',
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
        $rules->add($rules->existsIn(['color_id'], 'Colors'), ['errorField' => 'color_id']);
        $rules->add($rules->existsIn(['product_id'], 'Products'), ['errorField' => 'product_id']);
        $rules->add($rules->existsIn(['size_id'], 'Sizes'), ['errorField' => 'size_id']);

        return $rules;
    }
}
