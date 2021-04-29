<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ColorsProductsSize[]|\Cake\Collection\CollectionInterface $colorsProductsSize
 */
?>
<div class="colorsProductsSize index content">
    <?= $this->Html->link(__('New Colors Products Size'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Colors Products Size') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('color_id') ?></th>
                    <th><?= $this->Paginator->sort('product_id') ?></th>
                    <th><?= $this->Paginator->sort('size_id') ?></th>
                    <th><?= $this->Paginator->sort('count') ?></th>
                    <th><?= $this->Paginator->sort('created') ?></th>
                    <th><?= $this->Paginator->sort('modified') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($colorsProductsSize as $colorsProductsSize): ?>
                <tr>
                    <td><?= $colorsProductsSize->has('color') ? $this->Html->link($colorsProductsSize->color->name, ['controller' => 'Colors', 'action' => 'view', $colorsProductsSize->color->id]) : '' ?></td>
                    <td><?= $colorsProductsSize->has('product') ? $this->Html->link($colorsProductsSize->product->name, ['controller' => 'Products', 'action' => 'view', $colorsProductsSize->product->id]) : '' ?></td>
                    <td><?= $colorsProductsSize->has('size') ? $this->Html->link($colorsProductsSize->size->name, ['controller' => 'Sizes', 'action' => 'view', $colorsProductsSize->size->id]) : '' ?></td>
                    <td><?= $this->Number->format($colorsProductsSize->count) ?></td>
                    <td><?= h($colorsProductsSize->created) ?></td>
                    <td><?= h($colorsProductsSize->modified) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $colorsProductsSize->color_id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $colorsProductsSize->color_id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $colorsProductsSize->color_id], ['confirm' => __('Are you sure you want to delete # {0}?', $colorsProductsSize->color_id)]) ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('first')) ?>
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
            <?= $this->Paginator->last(__('last') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) ?></p>
    </div>
</div>
