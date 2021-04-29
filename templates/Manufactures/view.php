<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Manufacture $manufacture
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Manufacturer'), ['action' => 'edit', $manufacturer->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Manufacturer'), ['action' => 'delete', $manufacturer->id], ['confirm' => __('Are you sure you want to delete # {0}?', $manufacturer->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Manufacturers'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Manufacturer'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="manufacturers view content">
            <h3><?= h($manufacturer->name) ?></h3>
            <table>
                <tr>
                    <th><?= __('Name') ?></th>
                    <td><?= h($manufacturer->name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Phone') ?></th>
                    <td><?= h($manufacturer->phone) ?></td>
                </tr>
                <tr>
                    <th><?= __('Address') ?></th>
                    <td><?= h($manufacturer->address) ?></td>
                </tr>
                <tr>
                    <th><?= __('Email') ?></th>
                    <td><?= h($manufacturer->email) ?></td>
                </tr>
                <tr>
                    <th><?= __('Note') ?></th>
                    <td><?= h($manufacturer->note) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($manufacturer->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($manufacturer->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($manufacturer->modified) ?></td>
                </tr>
            </table>
            <div class="related">
                <h4><?= __('Related Products') ?></h4>
                <?php if (!empty($manufacturer->products)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Id') ?></th>
                            <th><?= __('Name') ?></th>
                            <th><?= __('Manufacture Id') ?></th>
                            <th><?= __('State') ?></th>
                            <th><?= __('Note') ?></th>
                            <th><?= __('Original Price') ?></th>
                            <th><?= __('Sell Price') ?></th>
                            <th><?= __('Image') ?></th>
                            <th><?= __('Discount') ?></th>
                            <th><?= __('Created') ?></th>
                            <th><?= __('Modified') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($manufacturer->products as $products) : ?>
                        <tr>
                            <td><?= h($products->id) ?></td>
                            <td><?= h($products->name) ?></td>
                            <td><?= h($products->manufacturer_id) ?></td>
                            <td><?= h($products->state) ?></td>
                            <td><?= h($products->note) ?></td>
                            <td><?= h($products->original_price) ?></td>
                            <td><?= h($products->sell_price) ?></td>
                            <td><?= h($products->image) ?></td>
                            <td><?= h($products->discount) ?></td>
                            <td><?= h($products->created) ?></td>
                            <td><?= h($products->modified) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'Products', 'action' => 'view', $products->id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'Products', 'action' => 'edit', $products->id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'Products', 'action' => 'delete', $products->id], ['confirm' => __('Are you sure you want to delete # {0}?', $products->id)]) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </table>
                </div>
                <?php endif; ?>
            </div>
            <div class="related">
                <h4><?= __('Related Receipts') ?></h4>
                <?php if (!empty($manufacturer->receipts)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Id') ?></th>
                            <th><?= __('Manufacture Id') ?></th>
                            <th><?= __('Staff Id') ?></th>
                            <th><?= __('Total') ?></th>
                            <th><?= __('Note') ?></th>
                            <th><?= __('State') ?></th>
                            <th><?= __('Created') ?></th>
                            <th><?= __('Modified') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($manufacturer->receipts as $receipts) : ?>
                        <tr>
                            <td><?= h($receipts->id) ?></td>
                            <td><?= h($receipts->manufacturer_id) ?></td>
                            <td><?= h($receipts->staff_id) ?></td>
                            <td><?= h($receipts->total) ?></td>
                            <td><?= h($receipts->note) ?></td>
                            <td><?= h($receipts->state) ?></td>
                            <td><?= h($receipts->created) ?></td>
                            <td><?= h($receipts->modified) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'Receipts', 'action' => 'view', $receipts->id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'Receipts', 'action' => 'edit', $receipts->id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'Receipts', 'action' => 'delete', $receipts->id], ['confirm' => __('Are you sure you want to delete # {0}?', $receipts->id)]) ?>
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
