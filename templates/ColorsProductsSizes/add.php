<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ColorsProductsSize $colorsProductsSize
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('List Colors Products Size'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="colorsProductsSize form content">
            <?= $this->Form->create($colorsProductsSize) ?>
            <fieldset>
                <legend><?= __('Add Colors Products Size') ?></legend>
                <?php
                    echo $this->Form->control('count');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
