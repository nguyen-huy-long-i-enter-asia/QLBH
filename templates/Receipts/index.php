<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Receipt[]|\Cake\Collection\CollectionInterface $receipts
 */
?>
<div class="receipts index content">
    <?= $this->Html->link(__('New Receipt'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Receipts') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('manufacturer_id') ?></th>
                    <th><?= $this->Paginator->sort('staff_id') ?></th>
                    <th><?= $this->Paginator->sort('total') ?></th>
                    <th><?= $this->Paginator->sort('note') ?></th>
                    <th><?= $this->Paginator->sort('state') ?></th>
                    <th><?= $this->Paginator->sort('created') ?></th>
                    <th><?= $this->Paginator->sort('modified') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($receipts as $receipt): ?>
                <tr>
                    <td><?= $this->Number->format($receipt->id) ?></td>
                    <td><?= $receipt->has('manufacturer') ? $this->Html->link($receipt->manufacturer->name, ['controller' => 'Manufacturers', 'action' => 'view', $receipt->manufacturer->id]) : '' ?></td>
                    <td><?= $receipt->has('user') ? $this->Html->link($receipt->user->name, ['controller' => 'Users', 'action' => 'view', $receipt->user->id]) : '' ?></td>
                    <td><?= $this->Number->format($receipt->total) ?></td>
                    <td><?= $this->Number->format($receipt->note) ?></td>
                    <td><?= $this->Number->format($receipt->state) ?></td>
                    <td><?= h($receipt->created) ?></td>
                    <td><?= h($receipt->modified) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $receipt->id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $receipt->id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $receipt->id], ['confirm' => __('Are you sure you want to delete # {0}?', $receipt->id)]) ?>
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
