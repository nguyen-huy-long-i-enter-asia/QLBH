<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\OrdersDetail[]|\Cake\Collection\CollectionInterface $ordersDetails
 */
?>
<div class="ordersDetails index content">
    <?= $this->Html->link(__('New Orders Detail'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Orders Details') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('order_id') ?></th>
                    <th><?= $this->Paginator->sort('product_id') ?></th>
                    <th><?= $this->Paginator->sort('count') ?></th>
                    <th><?= $this->Paginator->sort('created') ?></th>
                    <th><?= $this->Paginator->sort('modified') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($ordersDetails as $ordersDetail): ?>
                <tr>
                    <td><?= $ordersDetail->has('order') ? $this->Html->link($ordersDetail->order->id, ['controller' => 'Orders', 'action' => 'view', $ordersDetail->order->id]) : '' ?></td>
                    <td><?= $ordersDetail->has('product') ? $this->Html->link($ordersDetail->product->name, ['controller' => 'Products', 'action' => 'view', $ordersDetail->product->id]) : '' ?></td>
                    <td><?= $this->Number->format($ordersDetail->count) ?></td>
                    <td><?= h($ordersDetail->created) ?></td>
                    <td><?= h($ordersDetail->modified) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $ordersDetail->order_id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $ordersDetail->order_id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $ordersDetail->order_id], ['confirm' => __('Are you sure you want to delete # {0}?', $ordersDetail->order_id)]) ?>
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
