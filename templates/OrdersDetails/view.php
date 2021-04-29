<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\OrdersDetail $ordersDetail
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Orders Detail'), ['action' => 'edit', $ordersDetail->order_id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Orders Detail'), ['action' => 'delete', $ordersDetail->order_id], ['confirm' => __('Are you sure you want to delete # {0}?', $ordersDetail->order_id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Orders Details'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Orders Detail'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="ordersDetails view content">
            <h3><?= h($ordersDetail->order_id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Order') ?></th>
                    <td><?= $ordersDetail->has('order') ? $this->Html->link($ordersDetail->order->id, ['controller' => 'Orders', 'action' => 'view', $ordersDetail->order->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Product') ?></th>
                    <td><?= $ordersDetail->has('product') ? $this->Html->link($ordersDetail->product->name, ['controller' => 'Products', 'action' => 'view', $ordersDetail->product->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Count') ?></th>
                    <td><?= $this->Number->format($ordersDetail->count) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($ordersDetail->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($ordersDetail->modified) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
