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
            <?= $this->Html->link(__('Edit Product State'), ['action' => 'edit', $productState->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Product State'), ['action' => 'delete', $productState->id], ['confirm' => __('Are you sure you want to delete # {0}?', $productState->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Product States'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Product State'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="productStates view content">
            <h3><?= h($productState->name) ?></h3>
            <table>
                <tr>
                    <th><?= __('Name') ?></th>
                    <td><?= h($productState->name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($productState->id) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
