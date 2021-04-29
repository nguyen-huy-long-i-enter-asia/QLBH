<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\TransactionState $transactionState
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Transaction State'), ['action' => 'edit', $transactionState->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Transaction State'), ['action' => 'delete', $transactionState->id], ['confirm' => __('Are you sure you want to delete # {0}?', $transactionState->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Transaction States'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Transaction State'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="transactionStates view content">
            <h3><?= h($transactionState->name) ?></h3>
            <table>
                <tr>
                    <th><?= __('Name') ?></th>
                    <td><?= h($transactionState->name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($transactionState->id) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
