<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Receipt Entity
 *
 * @property int $id
 * @property int|null $manufacturer_id
 * @property int|null $staff_id
 * @property int|null $total
 * @property int|null $note
 * @property int|null $state
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\Manufacture $manufacture
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\ReceiptDetail[] $receipt_details
 */
class Receipt extends Entity
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
        'manufacturer_id' => true,
        'staff_id' => true,
        'total' => true,
        'note' => true,
        'created' => true,
        'modified' => true,
        'manufacturer' => true,
        'user' => true,
        'receipt_details' => true,
    ];
}
