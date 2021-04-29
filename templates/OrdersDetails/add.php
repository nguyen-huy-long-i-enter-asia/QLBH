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
            <?= $this->Html->link(__('List Orders Details'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="ordersDetails form content">
            <?= $this->Form->create($ordersDetail) ?>
            <fieldset>
                <legend><?= __('Add Orders Detail') ?></legend>
                <?php
                    echo $this->Form->control('count');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
