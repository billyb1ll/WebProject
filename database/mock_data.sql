-- Mock data for Ratamoth DB
USE `ratamoth_db`;

-- Insert mock products
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('Dark Chocolate Bar', TRUE, 100, 5.99, 'bar'),
('Milk Chocolate Truffle', TRUE, 150, 8.99, 'truffle'),
('White Chocolate Bonbon', TRUE, 80, 7.50, 'bonbon'),
('Hazelnut Praline', TRUE, 120, 6.75, 'praline'),
('Raspberry Chocolate Bar', TRUE, 90, 6.25, 'bar'),
('Coconut Chocolate Ball', TRUE, 110, 4.99, 'ball'),
('Mint Chocolate Square', TRUE, 70, 5.50, 'square'),
('Caramel Chocolate Heart', TRUE, 85, 9.99, 'heart');

-- Insert mock chocolate types
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('Dark Chocolate', TRUE, 100, 6.99, 'base'),
('Milk Chocolate', TRUE, 100, 5.99, 'base'),
('White Chocolate', TRUE, 100, 7.99, 'base');

-- Insert mock toppings
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('No Toppings', TRUE, 100, 0.00, 'topping'),
('Mixed Nuts', TRUE, 100, 1.99, 'topping'),
('Colorful Sprinkles', TRUE, 100, 0.99, 'topping'),
('Dried Fruits', TRUE, 100, 1.49, 'topping');

-- Insert mock shapes
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('Classic Square', TRUE, 100, 0.00, 'shape'),
('Elegant Round', TRUE, 100, 1.50, 'shape'),
('Romantic Heart', TRUE, 100, 2.50, 'shape');

-- Insert general pricing info product
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('Custom Options Pricing', TRUE, 999, 0.00, 'pricing');

-- Insert product descriptions
INSERT INTO `product_description` (`product_id`, `product_des`, `specifications`) VALUES
(1, 'Rich dark chocolate bar made with 72% cocoa beans from Ecuador.', '{"weight": "100g", "ingredients": ["cocoa mass", "sugar", "cocoa butter", "vanilla"], "allergens": ["may contain traces of nuts and milk"]}'),
(2, 'Smooth milk chocolate truffles with a velvet ganache center.', '{"weight": "15g each", "box_count": "12", "ingredients": ["milk chocolate", "cream", "butter", "cocoa powder"]}'),
(3, 'Delicate white chocolate bonbons with a hint of Madagascar vanilla.', '{"weight": "18g each", "box_count": "9", "ingredients": ["cocoa butter", "milk solids", "sugar", "vanilla"]}'),
(4, 'Crunchy hazelnut praline covered in milk chocolate.', '{"weight": "20g each", "box_count": "8", "ingredients": ["hazelnuts", "sugar", "milk chocolate"]}'),
(5, 'Dark chocolate bar infused with natural raspberry essence.', '{"weight": "100g", "ingredients": ["cocoa mass", "sugar", "cocoa butter", "raspberry extract"], "allergens": ["may contain traces of nuts"]}'),
(6, 'Milk chocolate balls filled with coconut cream.', '{"weight": "15g each", "box_count": "10", "ingredients": ["milk chocolate", "coconut", "cream", "sugar"]}'),
(7, 'Thin dark chocolate squares with refreshing mint filling.', '{"weight": "10g each", "box_count": "16", "ingredients": ["dark chocolate", "mint extract", "sugar"]}'),
(8, 'Heart-shaped milk chocolate filled with salted caramel.', '{"weight": "25g each", "box_count": "6", "ingredients": ["milk chocolate", "sugar", "butter", "cream", "sea salt"]}'),
(9, 'Dark chocolate is our premium chocolate base with 70% cocoa content', '{"dark": 6.99, "description": "Rich and intense with 70% cocoa content. Perfect for those who appreciate a robust chocolate flavor with minimal sweetness."}'),
(10, 'Milk chocolate is our classic chocolate base', '{"milk": 5.99, "description": "Smooth and creamy classic favorite. A perfect balance of sweetness and chocolate flavor that everyone loves."}'),
(11, 'White chocolate is our specialty chocolate base', '{"white": 7.99, "description": "Sweet and buttery with vanilla notes. A delicate flavor profile with a smooth, melt-in-your-mouth texture."}'),
(12, 'No additional toppings for a pure chocolate experience', '{"none": 0.00, "description": "Pure chocolate experience with no added ingredients. Enjoy the authentic taste of our premium chocolate."}'),
(13, 'Mixed nuts topping adds crunch and flavor', '{"nuts": 1.99, "description": "Almonds, hazelnuts, and pecans. A perfect combination of crunchy nuts that complement the smooth chocolate."}'),
(14, 'Colorful sprinkles for a festive appearance', '{"sprinkles": 0.99, "description": "Fun and festive decoration that adds a pop of color and a slight crunch to your chocolate creation."}'),
(15, 'Dried fruits for natural sweetness and tang', '{"fruit": 1.49, "description": "Berries and citrus zest that add a natural sweetness and tangy flavor to complement the chocolate."}'),
(16, 'Classic square shape is our standard shape', '{"square": 0.00, "description": "Traditional and elegant design. Perfect for gifting and sharing with friends and family."}'),
(17, 'Elegant round shape for a modern look', '{"round": 1.50, "description": "Smooth edges, perfect for gifting. A timeless shape that represents unity and perfection."}'),
(18, 'Romantic heart shape for special occasions', '{"heart": 2.50, "description": "Express your feelings with this shape. Ideal for anniversaries, Valentine\'s Day, or to show someone you care."}'),
(19, 'General pricing data for custom chocolate features', '{"messageBasePrice": 1.99, "messageCharPrice": 0.15, "messageFonts": ["cursive", "serif", "sans-serif", "monospace"]}');

-- Insert mock product images
INSERT INTO `product_images` (`product_id`, `image_url`, `is_primary`) VALUES
(1, 'https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', TRUE),
(1, 'https://example.com/images/dark-chocolate-bar-2.jpg', FALSE),
(2, 'https://plus.unsplash.com/premium_photo-1677678736767-7641af9cb43c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', TRUE),
(3, 'https://plus.unsplash.com/premium_photo-1663047314541-5b9e07f5836b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', TRUE),
(4, 'https://example.com/images/hazelnut-praline.jpg', TRUE),
(5, 'https://example.com/images/raspberry-bar.jpg', TRUE),
(6, 'https://example.com/images/coconut-ball.jpg', TRUE),
(7, 'https://example.com/images/mint-square.jpg', TRUE),
(8, 'https://example.com/images/caramel-heart.jpg', TRUE),
(9, '/images/chocolate-dark.jpg', TRUE),
(10, '/images/chocolate-milk.jpg', TRUE),
(11, '/images/chocolate-white.jpg', TRUE),
(12, '/images/topping-none.jpg', TRUE),
(13, '/images/topping-nuts.jpg', TRUE),
(14, '/images/topping-sprinkles.jpg', TRUE),
(15, '/images/topping-fruit.jpg', TRUE),
(16, '/images/shape-square.jpg', TRUE),
(17, '/images/shape-round.jpg', TRUE),
(18, '/images/shape-heart.jpg', TRUE);

-- Insert mock packaging options
INSERT INTO `packaging` (`packaging_id`, `packaging_type`, `packaging_name`, `packaging_price`, `packaging_image`, `is_available`) VALUES
(1, 'standard', 'Standard Box', 0.00, '/images/packaging-standard.jpg', TRUE),
(2, 'gift', 'Gift Package', 3.99, '/images/packaging-gift.jpg', TRUE),
(3, 'premium', 'Premium Box', 8.99, '/images/packaging-premium.jpg', TRUE),
(4, 'eco', 'Eco-Friendly', 1.99, '/images/packaging-eco.jpg', TRUE),
(5, 'seasonal', 'Holiday Package', 4.99, '/images/packaging-holiday.jpg', TRUE),
(6, 'corporate', 'Corporate Gift Box', 7.50, '/images/packaging-corporate.jpg', TRUE),
(7, 'luxury', 'Luxury Collection Box', 12.99, '/images/packaging-luxury.jpg', TRUE),
(8, 'mini', 'Mini Gift Box', 2.50, '/images/packaging-mini.jpg', TRUE);

-- Insert mock admin user
INSERT INTO `admin_login` (`username`, `pass`, `a_role`) VALUES
('admin', '$2b$10$gL5YsV4oNzZFNzUxMizBn.5vjXqU2Yx5L5UOV5e9Xy2ROD.Sgj2T.', 'admin'), -- password is "admin123"
('admin1', '$2b$10$dH2185pCWwIV3rhkRWrpqe3JcmNL/TLtMWt5G5n8T.rJEIiE/ug0C', 'admin'), -- password is "12345678a"


INSERT INTO `admin_info` (`a_firstname`, `a_lastname`, `a_email`, `a_address`, `a_role`, `log_id`) VALUES
('Admin', 'User', 'admin@ratamoth.com', '123 Chocolate Street, Sweet City', 'admin', 1),
('Admin1', 'User', 'admin1@ratamoth.com', '123 Chocolate Street, Sweet City', 'admin', 2);

-- Insert mock customers
INSERT INTO `customer` (`c_name`, `c_email`, `c_address`, `c_phone_num`) VALUES
('John Doe', 'john.doe@example.com', '456 Main St, Anytown, US', '555-123-4567'),
('Jane Smith', 'jane.smith@example.com', '789 Oak Rd, Somewhere, US', '555-987-6543'),
('Robert Johnson', 'robert@example.com', '101 Pine Ave, Elsewhere, US', '555-456-7890'),
('Sarah Williams', 'sarah@example.com', '202 Maple Dr, Nowhere, US', '555-789-0123');

-- Insert mock orders
INSERT INTO `orders` (`c_id`, `shipping_address`, `order_status`, `payment_status`, `shipping_method`, `total_amount`) VALUES
(1, '456 Main St, Anytown, US', 'Delivered', 'Paid', 'Express', 35.97),
(2, '789 Oak Rd, Somewhere, US', 'Shipped', 'Paid', 'Standard', 42.25),
(3, '101 Pine Ave, Elsewhere, US', 'Processing', 'Paid', 'Standard', 29.99),
(4, '202 Maple Dr, Nowhere, US', 'Pending', 'Pending', 'Express', 53.75);

-- Insert mock order items
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `unit_price`, `is_custom`) VALUES
(1, 1, 2, 5.99, FALSE),
(1, 3, 3, 7.50, FALSE),
(2, 2, 1, 8.99, FALSE),
(2, 4, 2, 6.75, FALSE),
(2, 5, 3, 6.25, FALSE),
(3, 6, 4, 4.99, FALSE),
(3, 7, 1, 5.50, FALSE),
(4, 8, 3, 9.99, TRUE),
(4, 5, 2, 6.25, FALSE);

-- Insert mock payments
INSERT INTO `payments` (`order_id`, `payment_method`, `transaction_id`, `amount`, `status`) VALUES
(1, 'Credit Card', 'TXN123456789', 35.97, 'Completed'),
(2, 'PayPal', 'PP987654321', 42.25, 'Completed'),
(3, 'Credit Card', 'TXN456789123', 29.99, 'Completed'),
(4, 'Debit Card', 'TXN789123456', 53.75, 'Pending');

-- Insert mock custom chocolates
INSERT INTO `custom_chocolate` (`item_id`, `base_chocolate_id`, `shape_id`, `packaging_id`, `engraved_name`, `font_style`, `gift_message`, `custom_price`) VALUES
(8, 10, 18, 4, 'Love', 'Script', 'Happy Anniversary!', 19.99),
(1, 9, 16, 5, 'Mom', 'Serif', 'Happy Mother''s Day!', 12.99),
(2, 10, 17, 6, 'BFF', 'Sans-serif', 'Friends Forever', 15.50),
(3, 11, 18, 7, 'Joy', 'Cursive', 'Congratulations on your new job!', 17.75),
(4, 9, 17, 8, 'Dad', 'Monospace', 'Happy Birthday Dad!', 14.25),
(5, 10, 16, 6, 'Grad', 'Sans-serif', 'Class of 2025!', 16.99),
(6, 11, 18, 7, 'Champ', 'Script', 'You did it!', 18.50);

-- Insert mock custom chocolate toppings
INSERT INTO `custom_chocolate_toppings` (`custom_id`, `topping_id`) VALUES 
(1, 13), -- nuts on first custom
(1, 15), -- fruit on first custom
(2, 14), -- sprinkles on second custom
(3, 13), -- nuts on third custom
(4, 14), -- sprinkles on fourth custom
(5, 15), -- fruit on fifth custom
(6, 13), -- nuts on sixth custom
(6, 14), -- sprinkles on sixth custom
(7, 13), -- nuts on seventh custom
(7, 15); -- fruit on seventh custom

-- Insert mock reviews for standard products (these products are created earlier)
INSERT INTO `Review_product` (`product_id`, `customer_id`, `message`, `rating`) VALUES
(1, 1, 'The dark chocolate bar has an excellent rich flavor with perfect bitterness. Will definitely buy again!', 5),
(1, 2, 'Good quality chocolate but a bit too bitter for my taste.', 4),
(2, 3, 'These milk chocolate truffles are simply divine! The ganache center is so smooth.', 5),
(3, 4, 'White chocolate bonbons are my favorite treat. The vanilla flavor is subtle and perfect.', 5),
(4, 1, 'The hazelnut praline has the perfect crunch. Love the contrast with the milk chocolate.', 4),
(5, 2, 'The raspberry flavor in this bar is natural and not overpowering. Great balance!', 4),
(6, 3, 'Coconut chocolate balls are good but could use more coconut flavor.', 3),
(7, 4, 'The mint chocolate squares are refreshing and perfect after dinner.', 5),
(8, 1, 'These caramel hearts make the perfect gift. The salted caramel filling is amazing!', 5),
(2, 2, 'The truffles melted during shipping, but still tasted great.', 3),
(3, 3, 'I usually don\'t like white chocolate but these bonbons changed my mind!', 4),
(4, 4, 'The pralines have a perfect balance of sweetness and nuttiness.', 5);

-- Insert seasonal chocolate products
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('Christmas Spiced Chocolate', TRUE, 50, 7.99, 'seasonal'),
('Halloween Pumpkin Truffles', TRUE, 75, 8.49, 'seasonal'),
('Valentine\'s Champagne Truffles', TRUE, 60, 10.99, 'seasonal'),
('Easter Chocolate Eggs', TRUE, 80, 6.49, 'seasonal');

-- Insert seasonal product descriptions
INSERT INTO `product_description` (`product_id`, `product_des`, `specifications`) VALUES
(20, 'Dark chocolate infused with cinnamon, nutmeg, and clove for a festive flavor.', '{"weight": "100g", "season": "Winter", "ingredients": ["dark chocolate", "cinnamon", "nutmeg", "clove"], "allergens": ["may contain nuts"]}'),
(21, 'Milk chocolate truffles shaped like mini pumpkins with orange-colored white chocolate shells.', '{"weight": "15g each", "box_count": "9", "season": "Fall", "ingredients": ["milk chocolate", "white chocolate", "orange food coloring", "pumpkin spice"]}'),
(22, 'Luxurious dark chocolate truffles with real champagne ganache centers.', '{"weight": "18g each", "box_count": "6", "season": "Valentine\'s Day", "ingredients": ["dark chocolate", "cream", "champagne", "butter"], "allergens": ["contains alcohol"]}'),
(23, 'Colorful chocolate eggs with surprise fillings including caramel, hazelnut, and fruit jellies.', '{"weight": "25g each", "box_count": "8", "season": "Easter", "ingredients": ["milk chocolate", "dark chocolate", "white chocolate", "caramel", "hazelnut paste", "fruit jelly"]}');

-- Insert seasonal product images
INSERT INTO `product_images` (`product_id`, `image_url`, `is_primary`) VALUES
(20, 'https://example.com/images/christmas-spice-chocolate.jpg', TRUE),
(21, 'https://example.com/images/halloween-pumpkin-truffles.jpg', TRUE),
(22, 'https://example.com/images/champagne-truffles.jpg', TRUE),
(23, 'https://example.com/images/easter-eggs.jpg', TRUE);

-- Insert gift bundles
INSERT INTO `product` (`product_name`, `product_status`, `product_quantities`, `product_price`, `product_category`) VALUES
('Chocolate Lover\'s Bundle', TRUE, 30, 24.99, 'bundle'),
('Assorted Truffles Gift Box', TRUE, 40, 19.99, 'bundle'),
('Luxury Chocolate Collection', TRUE, 20, 39.99, 'bundle'),
('Family Sharing Chocolate Box', TRUE, 35, 29.99, 'bundle');

-- Insert gift bundle descriptions
INSERT INTO `product_description` (`product_id`, `product_des`, `specifications`) VALUES
(24, 'A bundle featuring our most popular chocolate bars - dark, milk, and raspberry.', '{"weight": "300g total", "contents": ["Dark Chocolate Bar", "Milk Chocolate Bar", "Raspberry Chocolate Bar"], "packaging": "Gift wrapped in elegant box with ribbon"}'),
(25, 'An assortment of our handcrafted truffles including milk, dark, and white chocolate varieties.', '{"weight": "180g total", "contents": ["Milk Chocolate Truffles", "Dark Chocolate Truffles", "White Chocolate Truffles"], "box_count": "12", "packaging": "Signature truffle box"}'),
(26, 'Our premium collection featuring the finest chocolates from our artisan range.', '{"weight": "400g total", "contents": ["Champagne Truffles", "Single Origin Dark Chocolate", "Pralines", "Caramel Hearts"], "packaging": "Luxury wood box"}'),
(27, 'A generous selection of family favorites perfect for sharing with loved ones.', '{"weight": "500g total", "contents": ["Milk Chocolate Squares", "Dark Chocolate Squares", "Chocolate Covered Nuts", "Chocolate Covered Fruits", "Mini Chocolate Bars"], "packaging": "Family-size tin box"}');

-- Insert gift bundle images
INSERT INTO `product_images` (`product_id`, `image_url`, `is_primary`) VALUES
(24, 'https://example.com/images/chocolate-lovers-bundle.jpg', TRUE),
(25, 'https://example.com/images/assorted-truffles.jpg', TRUE),
(26, 'https://example.com/images/luxury-collection.jpg', TRUE),
(27, 'https://example.com/images/family-chocolate-box.jpg', TRUE);

-- Insert additional custom chocolate examples with advanced customizations
INSERT INTO `custom_chocolate` (`item_id`, `base_chocolate_id`, `shape_id`, `packaging_id`, `engraved_name`, `font_style`, `gift_message`, `custom_price`) VALUES
(7, 11, 17, 3, 'XO', 'Script', 'With all my love on our anniversary', 24.99),
(9, 9, 16, 7, 'Thanks', 'Sans-serif', 'Thank you for everything you do', 21.50),
(9, 10, 18, 4, 'Best Day', 'Serif', 'Celebrating your special milestone!', 26.75);

-- Insert matching toppings for the new custom chocolates
INSERT INTO `custom_chocolate_toppings` (`custom_id`, `topping_id`) VALUES 
(8, 14), -- sprinkles on eighth custom
(8, 15), -- fruit on eighth custom
(9, 13), -- nuts on ninth custom
(9, 14), -- sprinkles on ninth custom
(10, 13), -- nuts on tenth custom
(10, 15); -- fruit on tenth custom

-- Now that product ID 26 (Luxury Chocolate Collection) exists, we can safely add its review
INSERT INTO `Review_product` (`product_id`, `customer_id`, `message`, `rating`) VALUES
(26, 2, 'The Luxury Chocolate Collection was the perfect gift for my chocolate-loving friend. Every piece was exquisite and beautifully presented in the wooden box. Worth every penny!', 5);

