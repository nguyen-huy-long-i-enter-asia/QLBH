<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Product $product
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Product'), ['action' => 'edit', $product->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Product'), ['action' => 'delete', $product->id], ['confirm' => __('Are you sure you want to delete # {0}?', $product->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Products'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Product'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="products view content">
            <h3><?= h($product->name) ?></h3>
            <table>
                <tr>
                    <th><?= __('Name') ?></th>
                    <td><?= h($product->name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Manufacturer') ?></th>
                    <td><?= $product->has('manufacturer') ? $this->Html->link($product->manufacturer->name, ['controller' => 'Manufacturers', 'action' => 'view', $product->manufacturer->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Note') ?></th>
                    <td><?= h($product->note) ?></td>
                </tr>
                <tr>
                    <th><?= __('Image') ?></th>
                    <td><?= h($product->image) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($product->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('State') ?></th>
                    <td><?= $this->Number->format($product->state) ?></td>
                </tr>
                <tr>
                    <th><?= __('Original Price') ?></th>
                    <td><?= $this->Number->format($product->original_price) ?></td>
                </tr>
                <tr>
                    <th><?= __('Sell Price') ?></th>
                    <td><?= $this->Number->format($product->sell_price) ?></td>
                </tr>
                <tr>
                    <th><?= __('Discount') ?></th>
                    <td><?= $this->Number->format($product->discount) ?></td>
                </tr>
                <tr>
                    <th><?= __('Created') ?></th>
                    <td><?= h($product->created) ?></td>
                </tr>
                <tr>
                    <th><?= __('Modified') ?></th>
                    <td><?= h($product->modified) ?></td>
                </tr>
            </table>
            <div class="related">
                <h4><?= __('Related Categories') ?></h4>
                <?php if (!empty($product->categories)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Id') ?></th>
                            <th><?= __('Name') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($product->categories as $categories) : ?>
                        <tr>
                            <td><?= h($categories->id) ?></td>
                            <td><?= h($categories->name) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'Categories', 'action' => 'view', $categories->id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'Categories', 'action' => 'edit', $categories->id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'Categories', 'action' => 'delete', $categories->id], ['confirm' => __('Are you sure you want to delete # {0}?', $categories->id)]) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </table>
                </div>
                <?php endif; ?>
            </div>
            <div class="related">
                <h4><?= __('Related Colors Products Size') ?></h4>
                <?php if (!empty($product->colors_products_sizes)) : ?>
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
                        <?php foreach ($product->colors_products_sizes as $colorsProductsSize) : ?>
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
            <div class="related">
                <h4><?= __('Related Orders Details') ?></h4>
                <?php if (!empty($product->orders_details)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Order Id') ?></th>
                            <th><?= __('Product Id') ?></th>
                            <th><?= __('Count') ?></th>
                            <th><?= __('Created') ?></th>
                            <th><?= __('Modified') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($product->orders_details as $ordersDetails) : ?>
                        <tr>
                            <td><?= h($ordersDetails->order_id) ?></td>
                            <td><?= h($ordersDetails->product_id) ?></td>
                            <td><?= h($ordersDetails->count) ?></td>
                            <td><?= h($ordersDetails->created) ?></td>
                            <td><?= h($ordersDetails->modified) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'OrdersDetails', 'action' => 'view', $ordersDetails->order_id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'OrdersDetails', 'action' => 'edit', $ordersDetails->order_id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'OrdersDetails', 'action' => 'delete', $ordersDetails->order_id], ['confirm' => __('Are you sure you want to delete # {0}?', $ordersDetails->order_id)]) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </table>
                </div>
                <?php endif; ?>
            </div>
            <div class="related">
                <h4><?= __('Related Receipt Details') ?></h4>
                <?php if (!empty($product->receipt_details)) : ?>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th><?= __('Receipt Id') ?></th>
                            <th><?= __('Product Id') ?></th>
                            <th><?= __('Count') ?></th>
                            <th><?= __('Created') ?></th>
                            <th><?= __('Modified') ?></th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <?php foreach ($product->receipt_details as $receiptDetails) : ?>
                        <tr>
                            <td><?= h($receiptDetails->receipt_id) ?></td>
                            <td><?= h($receiptDetails->product_id) ?></td>
                            <td><?= h($receiptDetails->count) ?></td>
                            <td><?= h($receiptDetails->created) ?></td>
                            <td><?= h($receiptDetails->modified) ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['controller' => 'ReceiptDetails', 'action' => 'view', $receiptDetails->receipt_id]) ?>
                                <?= $this->Html->link(__('Edit'), ['controller' => 'ReceiptDetails', 'action' => 'edit', $receiptDetails->receipt_id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['controller' => 'ReceiptDetails', 'action' => 'delete', $receiptDetails->receipt_id], ['confirm' => __('Are you sure you want to delete # {0}?', $receiptDetails->receipt_id)]) ?>
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
