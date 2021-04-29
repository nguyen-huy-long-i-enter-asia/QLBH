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
            <?= $this->Html->link(__('Edit Colors Products Size'), ['action' => 'edit', $colorsProductsSize->color_id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Colors Products Size'), ['action' => 'delete', $colorsProductsSize->color_id], ['confirm' => __('Are you sure you want to delete # {0}?', $colorsProductsSize->color_id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Colors Products Size'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Colors Products Size'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="colorsProductsSize view content">
            <h3><?= h($colorsProductsSize->color_id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Color') ?></th>
                    <td><?= $colorsProductsSize->has('color') ? $this->Html->link($colorsProductsSize->color->name, ['controller' => 'Colors', 'action' => 'view', $colorsProductsSize->color->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Product') ?></th>
                    <td><?= $colorsProductsSize->has('product') ? $this->Html->link($colorsProductsSize->product->name, ['controller' => 'Products', 'action' => 'view', $colorsProductsSize->product->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Size') ?></th>
                    <td><?= $colorsProductsSize->has('size') ? $this->Html->link($colorsProductsSize->size->name, ['controller' => 'Sizes', 'action' => 'view', $colorsProductsSize->size->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Count') ?></th>
                    <td><?= $this->Number->format($colorsProductsSize->count) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($colorsProductsSize->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($colorsProductsSize->modified) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
