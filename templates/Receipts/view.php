<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Receipt $receipt
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Receipt'), ['action' => 'edit', $receipt->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Receipt'), ['action' => 'delete', $receipt->id], ['confirm' => __('Are you sure you want to delete # {0}?', $receipt->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Receipts'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Receipt'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="receipts view content">
            <h3><?= h($receipt->id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Manufacturer') ?></th>
                    <td><?= $receipt->has('manufacturer') ? $this->Html->link($receipt->manufacturer->name, ['controller' => 'Manufacturers', 'action' => 'view', $receipt->manufacturer->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('User') ?></th>
                    <td><?= $receipt->has('user') ? $this->Html->link($receipt->user->name, ['controller' => 'Users', 'action' => 'view', $receipt->user->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($receipt->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Total') ?></th>
                    <td><?= $this->Number->format($receipt->total) ?></td>
                </tr>
                <tr>
                    <th><?= __('Note') ?></th>
                    <td><?= $this->Number->format($receipt->note) ?></td>
                </tr>
                <tr>
                    <th><?= __('State') ?></th>
                    <td><?= $this->Number->format($receipt->state) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($receipt->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($receipt->modified) ?></td>
                </tr>
            </table>
            <div class="related">
                <h4><?= __('Related Receipt Details') ?></h4>
                <?php if (!empty($receipt->receipt_details)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Receipt Id') ?></th>
                            <th><?= __('Product Id') ?></th>
                            <th><?= __('Count') ?></th>
                            <th><?= __('Created') ?></th>
                            <th><?= __('Modified') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($receipt->receipt_details as $receiptDetails) : ?>
                        <tr>
                            <td><?= h($receiptDetails->receipt_id) ?></td>
                            <td><?= h($receiptDetails->product_id) ?></td>
                            <td><?= h($receiptDetails->count) ?></td>
                            <td><?= h($receiptDetails->created) ?></td>
                            <td><?= h($receiptDetails->modified) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'ReceiptDetails', 'action' => 'view', $receiptDetails->receipt_id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'ReceiptDetails', 'action' => 'edit', $receiptDetails->receipt_id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'ReceiptDetails', 'action' => 'delete', $receiptDetails->receipt_id], ['confirm' => __('Are you sure you want to delete # {0}?', $receiptDetails->receipt_id)]) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </table>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
