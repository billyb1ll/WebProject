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
    `is_custom` BOOLEAN DEFAULT FALSE COMMENT 'Indicates if the product is for custom chocolate',
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
