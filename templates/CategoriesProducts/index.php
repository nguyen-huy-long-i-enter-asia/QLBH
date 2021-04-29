<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\CategoriesProduct[]|\Cake\Collection\CollectionInterface $categoriesProducts
 */
?>
<div class="categoriesProducts index content">
    <?= $this->Html->link(__('New Categories Product'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Categories Products') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('product_id') ?></th>
                    <th><?= $this->Paginator->sort('category_id') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($categoriesProducts as $categoriesProduct): ?>
                <tr>
                    <td><?= $categoriesProduct->has('product') ? $this->Html->link($categoriesProduct->product->name, ['controller' => 'Products', 'action' => 'view', $categoriesProduct->product->id]) : '' ?></td>
                    <td><?= $categoriesProduct->has('category') ? $this->Html->link($categoriesProduct->category->name, ['controller' => 'Categories', 'action' => 'view', $categoriesProduct->category->id]) : '' ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $categoriesProduct->product_id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $categoriesProduct->product_id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $categoriesProduct->product_id], ['confirm' => __('Are you sure you want to delete # {0}?', $categoriesProduct->product_id)]) ?>
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
