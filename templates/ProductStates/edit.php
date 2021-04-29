<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ProductState $productState
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $productState->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $productState->id), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Product States'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="productStates form content">
            <?= $this->Form->create($productState) ?>
            <fieldset>
                <legend><?= __('Edit Product State') ?></legend>
                <?php
                    echo $this->Form->control('name');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
