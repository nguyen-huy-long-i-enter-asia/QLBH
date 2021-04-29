<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\OrderDetail $orderDetail
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Order Detail'), ['action' => 'edit', $orderDetail->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Order Detail'), ['action' => 'delete', $orderDetail->id], ['confirm' => __('Are you sure you want to delete # {0}?', $orderDetail->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Order Details'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Order Detail'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="orderDetails view content">
            <h3><?= h($orderDetail->id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Order') ?></th>
                    <td><?= $orderDetail->has('order') ? $this->Html->link($orderDetail->order->id, ['controller' => 'Orders', 'action' => 'view', $orderDetail->order->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Product') ?></th>
                    <td><?= $orderDetail->has('product') ? $this->Html->link($orderDetail->product->name, ['controller' => 'Products', 'action' => 'view', $orderDetail->product->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Size') ?></th>
                    <td><?= $orderDetail->has('size') ? $this->Html->link($orderDetail->size->name, ['controller' => 'Sizes', 'action' => 'view', $orderDetail->size->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Color') ?></th>
                    <td><?= $orderDetail->has('color') ? $this->Html->link($orderDetail->color->name, ['controller' => 'Colors', 'action' => 'view', $orderDetail->color->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($orderDetail->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Count') ?></th>
                    <td><?= $this->Number->format($orderDetail->count) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($orderDetail->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($orderDetail->modified) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
