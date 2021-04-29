<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\CategoriesProduct $categoriesProduct
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $categoriesProduct->product_id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $categoriesProduct->product_id), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Categories Products'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="categoriesProducts form content">
            <?= $this->Form->create($categoriesProduct) ?>
            <fieldset>
                <legend><?= __('Edit Categories Product') ?></legend>
                <?php
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
