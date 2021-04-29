<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ReceiptDetail[]|\Cake\Collection\CollectionInterface $receiptDetails
 */
?>
<div class="receiptDetails index content">
    <?= $this->Html->link(__('New Receipt Detail'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Receipt Details') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('receipt_id') ?></th>
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
                <?php foreach ($receiptDetails as $receiptDetail): ?>
                <tr>
                    <td><?= $this->Number->format($receiptDetail->id) ?></td>
                    <td><?= $receiptDetail->has('receipt') ? $this->Html->link($receiptDetail->receipt->id, ['controller' => 'Receipts', 'action' => 'view', $receiptDetail->receipt->id]) : '' ?></td>
                    <td><?= $receiptDetail->has('product') ? $this->Html->link($receiptDetail->product->name, ['controller' => 'Products', 'action' => 'view', $receiptDetail->product->id]) : '' ?></td>
                    <td><?= $this->Number->format($receiptDetail->size_id) ?></td>
                    <td><?= $this->Number->format($receiptDetail->color_id) ?></td>
                    <td><?= $this->Number->format($receiptDetail->count) ?></td>
                    <td><?= h($receiptDetail->created) ?></td>
                    <td><?= h($receiptDetail->modified) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $receiptDetail->receipt_id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $receiptDetail->receipt_id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $receiptDetail->receipt_id], ['confirm' => __('Are you sure you want to delete # {0}?', $receiptDetail->receipt_id)]) ?>
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
