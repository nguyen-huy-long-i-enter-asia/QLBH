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
            <?= $this->Html->link(__('List Receipts'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="receipts form content">
            <?= $this->Form->create($receipt) ?>
            <fieldset>
                <legend><?= __('Add Receipt') ?></legend>
                <?php
                    echo $this->Form->control('manufacturer_id', ['options' => $manufacturers, 'empty' => true]);
                    echo $this->Form->control('staff_id', ['options' => $users, 'empty' => true]);
                    echo $this->Form->control('total');
                    echo $this->Form->control('note');
                    echo $this->Form->control('state');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
