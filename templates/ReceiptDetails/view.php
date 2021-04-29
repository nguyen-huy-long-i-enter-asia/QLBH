<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ReceiptDetail $receiptDetail
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Receipt Detail'), ['action' => 'edit', $receiptDetail->receipt_id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Receipt Detail'), ['action' => 'delete', $receiptDetail->receipt_id], ['confirm' => __('Are you sure you want to delete # {0}?', $receiptDetail->receipt_id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Receipt Details'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Receipt Detail'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="receiptDetails view content">
            <h3><?= h($receiptDetail->receipt_id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Receipt') ?></th>
                    <td><?= $receiptDetail->has('receipt') ? $this->Html->link($receiptDetail->receipt->id, ['controller' => 'Receipts', 'action' => 'view', $receiptDetail->receipt->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Product') ?></th>
                    <td><?= $receiptDetail->has('product') ? $this->Html->link($receiptDetail->product->name, ['controller' => 'Products', 'action' => 'view', $receiptDetail->product->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($receiptDetail->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Size Id') ?></th>
                    <td><?= $this->Number->format($receiptDetail->size_id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Color Id') ?></th>
                    <td><?= $this->Number->format($receiptDetail->color_id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Count') ?></th>
                    <td><?= $this->Number->format($receiptDetail->count) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($receiptDetail->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($receiptDetail->modified) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
