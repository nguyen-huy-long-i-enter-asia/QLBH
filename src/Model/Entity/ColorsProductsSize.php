<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ColorsProductsSize Entity
 *
 * @property int $id
 * @property int|null $color_id
 * @property int|null $product_id
 * @property int|null $size_id
 * @property int|null $count
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\Color $color
 * @property \App\Model\Entity\Product $product
 * @property \App\Model\Entity\Size $size
 */
class ColorsProductsSize extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'color_id' => true,
        'product_id' => true,
        'size_id' => true,
        'count' => true,
        'created' => true,
        'modified' => true,
        'color' => true,
        'product' => true,
        'size' => true,
    ];
}
