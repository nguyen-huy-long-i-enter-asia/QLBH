<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Size[]|\Cake\Collection\CollectionInterface $sizes
 */
?>
<div class="sizes index content">
    <?= $this->Html->link(__('New Size'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Sizes') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('name') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($sizes as $size): ?>
                <tr>
                    <td><?= $this->Number->format($size->id) ?></td>
                    <td><?= h($size->name) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $size->id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $size->id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $size->id], ['confirm' => __('Are you sure you want to delete # {0}?', $size->id)]) ?>
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
