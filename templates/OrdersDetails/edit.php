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
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $ordersDetail->order_id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $ordersDetail->order_id), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Orders Details'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="ordersDetails form content">
            <?= $this->Form->create($ordersDetail) ?>
            <fieldset>
                <legend><?= __('Edit Orders Detail') ?></legend>
                <?php
                    echo $this->Form->control('count');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
