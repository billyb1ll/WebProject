DROP DATABASE IF EXISTS `ratamoth_db`;
CREATE DATABASE IF NOT EXISTS `ratamoth_db`;
USE `ratamoth_db`;

-- Product Table
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
    `product_id` INT NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(50) NOT NULL,
    `product_status` BOOLEAN DEFAULT TRUE,
    `product_quantities` INT DEFAULT 0,
    `product_sold` INT DEFAULT 0,
    `product_price` DECIMAL(10,2) NOT NULL,
    `product_category` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`product_id`),
    INDEX `idx_product_category` (`product_category`),
    INDEX `idx_product_status` (`product_status`)
);

-- Product Images Table
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
    `image_id` INT NOT NULL AUTO_INCREMENT,
    `product_id` INT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`image_id`),
    CONSTRAINT `fk_product_image` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE
);

-- Admin Login Table
DROP TABLE IF EXISTS `admin_login`;
CREATE TABLE `admin_login` (
    `log_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `pass` VARCHAR(255) NOT NULL,  -- Use hashed passwords
    `a_role` VARCHAR(20) NOT NULL,
    `login_log` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `last_login` TIMESTAMP NULL DEFAULT NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (`log_id`),
    INDEX `idx_admin_username` (`username`)
);

-- Admin Info Table
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
    `a_id` INT NOT NULL AUTO_INCREMENT,
    `a_firstname` VARCHAR(50) NOT NULL,
    `a_lastname` VARCHAR(50) NOT NULL,
    `a_email` VARCHAR(50) NOT NULL UNIQUE,
    `a_address` VARCHAR(100),
    `a_role` VARCHAR(20) NOT NULL,
    `log_id` INT NOT NULL,
    PRIMARY KEY (`a_id`),
    CONSTRAINT `fk_admin_login` FOREIGN KEY (`log_id`) REFERENCES `admin_login` (`log_id`) ON DELETE CASCADE
);

-- Product Description Table
DROP TABLE IF EXISTS `product_description`;
CREATE TABLE `product_description` (
    `product_id` INT NOT NULL,
    `product_des` TEXT NOT NULL, 
    `specifications` JSON DEFAULT NULL, 
    PRIMARY KEY (`product_id`),
    CONSTRAINT `fk_product_desc` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE
);

-- Customer Table 
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
    `c_id` INT NOT NULL AUTO_INCREMENT,
    `c_name` VARCHAR(50) NOT NULL,
    `c_email` VARCHAR(50) NOT NULL UNIQUE,
    -- Use hashed passwords
    `c_pass` VARCHAR(255),
    `c_address` VARCHAR(100) NOT NULL,
    `c_phone_num` VARCHAR(20) NOT NULL UNIQUE,
    `c_created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `c_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `c_last_order` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`c_id`),
    INDEX `idx_customer_email` (`c_email`),
    INDEX `idx_customer_phone` (`c_phone_num`)
);

-- Order Table 
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `order_id` INT NOT NULL AUTO_INCREMENT,
    `c_id` INT NOT NULL,
    `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `shipping_address` VARCHAR(100) NOT NULL,
    `order_status` ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    `payment_status` ENUM('Pending', 'Paid', 'Failed', 'Refunded') DEFAULT 'Pending',
    `shipping_method` VARCHAR(20) DEFAULT 'Standard',
    `total_amount` DECIMAL(10,2) NOT NULL,
    `notes` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`order_id`),
    CONSTRAINT `fk_order_customer` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`) ON DELETE CASCADE,
    INDEX `idx_order_status` (`order_status`),
    INDEX `idx_order_date` (`order_date`)
);

-- Order Items Table 
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
    `item_id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `unit_price` DECIMAL(10,2) NOT NULL,
    `is_custom` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (`item_id`),
    CONSTRAINT `fk_orderitem_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_orderitem_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT
);

-- Payments Table
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
    `payment_id` INT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL,
    `transaction_id` VARCHAR(100) DEFAULT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `payment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
    PRIMARY KEY (`payment_id`),
    CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
);

-- Packaging Table 
DROP TABLE IF EXISTS `packaging`;
CREATE TABLE `packaging` (
    `packaging_id` INT NOT NULL AUTO_INCREMENT,
    `packaging_type` VARCHAR(50),
    `packaging_name` VARCHAR(50) NOT NULL UNIQUE,
    `packaging_price` DECIMAL(10,2) NOT NULL,
    `packaging_image` VARCHAR(255) DEFAULT NULL,
    `is_available` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`packaging_id`)
);

-- Custom Chocolate Table
DROP TABLE IF EXISTS `custom_chocolate`;
CREATE TABLE `custom_chocolate` (
    `custom_id` INT NOT NULL AUTO_INCREMENT,
    `item_id` INT NOT NULL,
    `base_chocolate_id` INT NOT NULL,
    `shape_id` INT NOT NULL,
    `packaging_id` INT DEFAULT NULL,
    `engraved_name` VARCHAR(15) DEFAULT NULL,
    `font_style` VARCHAR(50) DEFAULT NULL,
    `gift_message` VARCHAR(200) DEFAULT NULL,
    `custom_price` DECIMAL(10,2) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`custom_id`),
    CONSTRAINT `fk_custom_orderitem` FOREIGN KEY (`item_id`) REFERENCES `order_items` (`item_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_custom_base` FOREIGN KEY (`base_chocolate_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_custom_shape` FOREIGN KEY (`shape_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_custom_packaging` FOREIGN KEY (`packaging_id`) REFERENCES `packaging` (`packaging_id`) ON DELETE SET NULL
);

-- Table for managing custom chocolate toppings (many-to-many relationship)
DROP TABLE IF EXISTS `custom_chocolate_toppings`;
CREATE TABLE `custom_chocolate_toppings` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `custom_id` INT NOT NULL,
    `topping_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_custom_topping` (`custom_id`, `topping_id`),
    CONSTRAINT `fk_choctop_custom` FOREIGN KEY (`custom_id`) REFERENCES `custom_chocolate` (`custom_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_choctop_topping` FOREIGN KEY (`topping_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT
);

CREATE TABLE `Review_product` (
    `review_id` INT NOT NULL AUTO_INCREMENT,
    `product_id` INT DEFAULT NULL,
    `customer_id` INT DEFAULT NULL,
    `message` TEXT DEFAULT NULL,
    `rating` INT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`review_id`),
    CONSTRAINT `fk_review_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE SET NULL,
    CONSTRAINT `fk_review_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`c_id`) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_type ENUM('customer', 'admin') NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (token),
    INDEX (user_id, user_type)
)
-- =============================
-- DATABASE TRIGGERS
-- =============================

-- 1. Update inventory when order is placed
DELIMITER //
CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    -- Reduce product quantity and increase product sold count
    UPDATE product 
    SET product_quantities = product_quantities - NEW.quantity,
        product_sold = product_sold + NEW.quantity
    WHERE product_id = NEW.product_id;
    
    -- Set product status to unavailable if no stock left
    UPDATE product
    SET product_status = FALSE
    WHERE product_id = NEW.product_id 
      AND product_quantities <= 0;
END //
DELIMITER ;

-- 2. Restore inventory when order is cancelled
DELIMITER //
CREATE TRIGGER after_order_status_update
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    -- If order status changed to 'Cancelled'
    IF NEW.order_status = 'Cancelled' AND OLD.order_status != 'Cancelled' THEN
        -- Update product quantities and sold counts for all items in the order
        UPDATE product p
        JOIN order_items oi ON p.product_id = oi.product_id
        SET p.product_quantities = p.product_quantities + oi.quantity,
            p.product_sold = p.product_sold - oi.quantity,
            -- Restore product status to available if quantities are now positive
            p.product_status = IF(p.product_quantities > 0, TRUE, p.product_status)
        WHERE oi.order_id = NEW.order_id;
    END IF;
END //
DELIMITER ;

-- 3. Update customer's last order timestamp
DELIMITER //
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE customer
    SET c_last_order = NEW.order_date
    WHERE c_id = NEW.c_id;
END //
DELIMITER ;

-- 4. Track admin login history
DELIMITER //
CREATE TRIGGER before_admin_login_update
BEFORE UPDATE ON admin_login
FOR EACH ROW
BEGIN
    IF OLD.last_login != NEW.last_login THEN
        SET NEW.login_log = OLD.last_login;
    END IF;
END //
DELIMITER ;

-- 5. Prevent primary image deletion if it's the only image for a product
DELIMITER //
CREATE TRIGGER before_product_image_delete
BEFORE DELETE ON product_images
FOR EACH ROW
BEGIN
    DECLARE image_count INT;
    
    -- Count total images for this product
    SELECT COUNT(*) INTO image_count 
    FROM product_images 
    WHERE product_id = OLD.product_id;
    
    -- If trying to delete the only image or the primary image when there's only one left
    IF (image_count = 1) OR (OLD.is_primary = TRUE AND image_count <= 2) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete the only image or primary image when it is the only remaining image for a product';
    END IF;
END //
DELIMITER ;

-- 6. Auto-assign primary image if none exists
DELIMITER //
CREATE TRIGGER after_product_image_insert
AFTER INSERT ON product_images
FOR EACH ROW
BEGIN
    DECLARE primary_exists INT;
    
    -- Check if a primary image already exists for this product
    SELECT COUNT(*) INTO primary_exists
    FROM product_images
    WHERE product_id = NEW.product_id AND is_primary = TRUE;
    
    -- If no primary image exists, make this the primary
    IF primary_exists = 0 THEN
        UPDATE product_images
        SET is_primary = TRUE
        WHERE image_id = NEW.image_id;
    END IF;
END //
DELIMITER ;

-- 7. Auto-calculate and update order total amount
DELIMITER //
CREATE TRIGGER before_order_item_insert
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    -- Ensure we don't insert if product is out of stock
    DECLARE stock_available INT;
    SELECT product_quantities INTO stock_available 
    FROM product WHERE product_id = NEW.product_id;
    
    IF stock_available < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock for this product';
    END IF;
END //
DELIMITER ;

-- 8. Update order total when item is added
DELIMITER //
CREATE TRIGGER after_order_item_change
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    -- Recalculate and update the order total
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
END //
DELIMITER ;

-- 9. Soft delete for products instead of actual deletion
DELIMITER //
CREATE TRIGGER before_product_delete
BEFORE DELETE ON product
FOR EACH ROW
BEGIN
    -- Instead of deleting, update deleted_at timestamp and set status to inactive
    UPDATE product
    SET deleted_at = CURRENT_TIMESTAMP,
        product_status = FALSE
    WHERE product_id = OLD.product_id;
    
    -- Prevent the actual deletion
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Products cannot be deleted. Use soft delete by updating deleted_at field.';
END //
DELIMITER ;

-- 10. Update payment status when payment is completed
DELIMITER //
CREATE TRIGGER after_payment_update
AFTER UPDATE ON payments
FOR EACH ROW
BEGIN
    -- If payment status changed to 'Completed'
    IF NEW.status = 'Completed' AND OLD.status != 'Completed' THEN
        -- Update order payment status
        UPDATE orders
        SET payment_status = 'Paid',
            order_status = IF(order_status = 'Pending', 'Processing', order_status)
        WHERE order_id = NEW.order_id;
    END IF;
    
    -- If payment status changed to 'Failed'
    IF NEW.status = 'Failed' AND OLD.status != 'Failed' THEN
        -- Update order payment status
        UPDATE orders
        SET payment_status = 'Failed'
        WHERE order_id = NEW.order_id;
    END IF;
    
    -- If payment status changed to 'Refunded'
    IF NEW.status = 'Refunded' AND OLD.status != 'Refunded' THEN
        -- Update order payment status
        UPDATE orders
        SET payment_status = 'Refunded',
            order_status = 'Cancelled'
        WHERE order_id = NEW.order_id;
    END IF;
END //
DELIMITER ;

-- 11. Auto-calculate custom chocolate prices from components
DELIMITER //
CREATE TRIGGER before_custom_chocolate_insert
BEFORE INSERT ON custom_chocolate
FOR EACH ROW
BEGIN
    DECLARE base_price DECIMAL(10,2);
    DECLARE shape_price DECIMAL(10,2);
    DECLARE packaging_price DECIMAL(10,2);
    DECLARE engraving_price DECIMAL(10,2);
    
    -- Get base chocolate price
    SELECT product_price INTO base_price
    FROM product
    WHERE product_id = NEW.base_chocolate_id;
    
    -- Get shape price
    SELECT product_price INTO shape_price
    FROM product
    WHERE product_id = NEW.shape_id;
    
    -- Get packaging price if exists
    IF NEW.packaging_id IS NOT NULL THEN
        SELECT packaging_price INTO packaging_price
        FROM packaging
        WHERE packaging_id = NEW.packaging_id;
    ELSE
        SET packaging_price = 0;
    END IF;
    
    -- Add engraving price if text exists
    IF NEW.engraved_name IS NOT NULL AND LENGTH(NEW.engraved_name) > 0 THEN
        SET engraving_price = 5.00; -- Fixed price for engraving
    ELSE
        SET engraving_price = 0;
    END IF;
    
    -- Calculate total custom chocolate price
    SET NEW.custom_price = base_price + shape_price + packaging_price + engraving_price;
END //
DELIMITER ;

-- 12. Validate review ratings before insert
DELIMITER //
CREATE TRIGGER before_review_insert
BEFORE INSERT ON Review_product
FOR EACH ROW
BEGIN
    -- Ensure rating is between 1 and 5
    IF NEW.rating < 1 OR NEW.rating > 5 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rating must be between 1 and 5';
    END IF;
    
    -- Verify customer exists
    IF NOT EXISTS (SELECT 1 FROM customer WHERE c_id = NEW.customer_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid customer ID';
    END IF;
    
    -- Verify product exists
    IF NOT EXISTS (SELECT 1 FROM product WHERE product_id = NEW.product_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid product ID';
    END IF;
    
    -- Check if customer has already reviewed this product
    IF EXISTS (SELECT 1 FROM Review_product WHERE customer_id = NEW.customer_id AND product_id = NEW.product_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Customer has already reviewed this product';
    END IF;
END //
DELIMITER ;

-- 13. Audit admin password changes
DELIMITER //
CREATE TRIGGER after_admin_password_change
AFTER UPDATE ON admin_login
FOR EACH ROW
BEGIN
    IF NEW.pass != OLD.pass THEN
        -- You could log this to an audit table
        -- For demonstration, we'll just set last_login
        UPDATE admin_login
        SET last_login = CURRENT_TIMESTAMP
        WHERE log_id = NEW.log_id;
    END IF;
END //
DELIMITER ;

-- 14. Update order total when item is removed
DELIMITER //
CREATE TRIGGER after_order_item_delete
AFTER DELETE ON order_items
FOR EACH ROW
BEGIN
    -- Restore product quantity
    UPDATE product
    SET product_quantities = product_quantities + OLD.quantity,
        product_sold = product_sold - OLD.quantity,
        -- Restore product status to available if quantities are now positive
        product_status = IF(product_quantities > 0, TRUE, product_status)
    WHERE product_id = OLD.product_id;
    
    -- Recalculate and update the order total
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * unit_price), 0)
        FROM order_items
        WHERE order_id = OLD.order_id
    )
    WHERE order_id = OLD.order_id;
END //
DELIMITER ;

-- 15. Auto-update custom chocolate topping price
DELIMITER //
CREATE TRIGGER after_custom_topping_change
AFTER INSERT ON custom_chocolate_toppings
FOR EACH ROW
BEGIN
    DECLARE topping_price DECIMAL(10,2);
    
    -- Get topping price
    SELECT product_price INTO topping_price
    FROM product
    WHERE product_id = NEW.topping_id;
    
    -- Update custom chocolate price
    UPDATE custom_chocolate
    SET custom_price = custom_price + topping_price
    WHERE custom_id = NEW.custom_id;
    
    -- Update corresponding order item price
    UPDATE order_items oi
    JOIN custom_chocolate cc ON oi.item_id = cc.item_id
    SET oi.unit_price = cc.custom_price
    WHERE cc.custom_id = NEW.custom_id;
    
    -- Update order total
    UPDATE orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN custom_chocolate cc ON oi.item_id = cc.item_id
    SET o.total_amount = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = oi.order_id
    )
    WHERE cc.custom_id = NEW.custom_id;
END //
DELIMITER ;
