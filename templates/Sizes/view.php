<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Size $size
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Size'), ['action' => 'edit', $size->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Size'), ['action' => 'delete', $size->id], ['confirm' => __('Are you sure you want to delete # {0}?', $size->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Sizes'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Size'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="sizes view content">
            <h3><?= h($size->name) ?></h3>
            <table>
                <tr>
                    <th><?= __('Name') ?></th>
                    <td><?= h($size->name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($size->id) ?></td>
                </tr>
            </table>
            <div class="related">
                <h4><?= __('Related Colors Products Size') ?></h4>
                <?php if (!empty($size->colors_products_sizes)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Color Id') ?></th>
                            <th><?= __('Product Id') ?></th>
                            <th><?= __('Size Id') ?></th>
                            <th><?= __('Count') ?></th>
                            <th><?= __('Created') ?></th>
                            <th><?= __('Modified') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($size->colors_products_sizes as $colorsProductsSize) : ?>
                        <tr>
                            <td><?= h($colorsProductsSize->color_id) ?></td>
                            <td><?= h($colorsProductsSize->product_id) ?></td>
                            <td><?= h($colorsProductsSize->size_id) ?></td>
                            <td><?= h($colorsProductsSize->count) ?></td>
                            <td><?= h($colorsProductsSize->created) ?></td>
                            <td><?= h($colorsProductsSize->modified) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'ColorsProductsSize', 'action' => 'view', $colorsProductsSize->color_id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'ColorsProductsSize', 'action' => 'edit', $colorsProductsSize->color_id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'ColorsProductsSize', 'action' => 'delete', $colorsProductsSize->color_id], ['confirm' => __('Are you sure you want to delete # {0}?', $colorsProductsSize->color_id)]) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </table>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
