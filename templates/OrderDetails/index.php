<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\OrderDetail[]|\Cake\Collection\CollectionInterface $orderDetails
 */
?>
<div class="orderDetails index content">
    <?= $this->Html->link(__('New Order Detail'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Order Details') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('order_id') ?></th>
                    <th><?= $this->Paginator->sort('product_id') ?></th>
                    <th><?= $this->Paginator->sort('size_id') ?></th>
                    <th><?= $this->Paginator->sort('color_id') ?></th>
                    <th><?= $this->Paginator->sort('count') ?></th>
                    <th><?= $this->Paginator->sort('created') ?></th>
                    <th><?= $this->Paginator->sort('modified') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($orderDetails as $orderDetail): ?>
                <tr>
                    <td><?= $this->Number->format($orderDetail->id) ?></td>
                    <td><?= $orderDetail->has('order') ? $this->Html->link($orderDetail->order->id, ['controller' => 'Orders', 'action' => 'view', $orderDetail->order->id]) : '' ?></td>
                    <td><?= $orderDetail->has('product') ? $this->Html->link($orderDetail->product->name, ['controller' => 'Products', 'action' => 'view', $orderDetail->product->id]) : '' ?></td>
                    <td><?= $orderDetail->has('size') ? $this->Html->link($orderDetail->size->name, ['controller' => 'Sizes', 'action' => 'view', $orderDetail->size->id]) : '' ?></td>
                    <td><?= $orderDetail->has('color') ? $this->Html->link($orderDetail->color->name, ['controller' => 'Colors', 'action' => 'view', $orderDetail->color->id]) : '' ?></td>
                    <td><?= $this->Number->format($orderDetail->count) ?></td>
                    <td><?= h($orderDetail->created) ?></td>
                    <td><?= h($orderDetail->modified) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $orderDetail->id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $orderDetail->id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $orderDetail->id], ['confirm' => __('Are you sure you want to delete # {0}?', $orderDetail->id)]) ?>
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
