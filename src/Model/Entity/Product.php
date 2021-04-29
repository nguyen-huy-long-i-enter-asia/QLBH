<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Product Entity
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $manufacturer_id
 * @property int|null $state
 * @property string|null $note
 * @property int|null $original_price
 * @property int|null $sell_price
 * @property string|null $image
 * @property int|null $discount
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\Manufacture $manufacture
 * @property \App\Model\Entity\ColorsProductsSize[] $colors_products_size
 * @property \App\Model\Entity\OrdersDetail[] $orders_details
 * @property \App\Model\Entity\ReceiptDetail[] $receipt_details
 * @property \App\Model\Entity\Category[] $categories
 */
class Product extends Entity
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
        'name' => true,
        'manufacturer_id' => true,
        'state_id' => true,
        'note' => true,
        'original_price' => true,
        'sell_price' => true,
        'image' => true,
        'discount' => true,
        'created' => true,
        'modified' => true,
        'manufacturer' => true,
        'colors_products_sizes' => true,
        'orders_details' => true,
        'receipt_details' => true,
        'categories' => true,
    ];
}
