-- This script inserts data using simple integers for primary and foreign keys,
-- matching a BIGSERIAL schema.

-- Table: roles
INSERT INTO roles (role_id, role_name) VALUES
(1, 'instructor'),
(2, 'student');

-- Table: user_base
INSERT INTO user_base (user_id, username, email, role_id, password) VALUES
(1, 'john.doe', 'john.doe@example.com', 1, 'hashed_password_instructor1'),
(2, 'alice', 'alice@example.com', 2, 'hashed_password_student1'),
(3, 'bob', 'bob@example.com', 2, 'hashed_password_student2');

-- Table: profile_user (profile_id is auto-generated)
INSERT INTO profile_user (fullname, no_hp, job, user_id, working_place,gender , country_code) VALUES
('John Doe', '0811111111', 'Senior Software Engineer', 1, 'Big Tech Inc.','male', '+62'),
('Alice Wonderland', '0855555555', 'Mahasiswa', 2, 'Universitas Koding','female', '+62'),
('Bob Builder', '0866666666', 'Mahasiswa', 3, 'Institut Teknologi','male', '+62');

-- Table: course_categories
INSERT INTO course_categories (category_id, category_name) VALUES
(10, 'Programming'),
(20, 'Design'),
(30, 'Business');

-- Table: course_base
INSERT INTO course_base (course_id, course_name, description, user_id, category_id, price, duration, certificate) VALUES
(101, 'Intro to Python', 'Learn Python from scratch.', 1, 10, 49.99, 360, true),
(102, 'Web Design Fundamentals', 'Master HTML and CSS.', 1, 20, 75.50, 480, true),
(103, 'Startup Business 101', 'A guide to launching your business.', 1, 30, 99.00, 600, true);

-- Table: orders
INSERT INTO orders (order_id, user_id, total_price, order_date, status) VALUES
(201, 2, 75.50, '2025-09-01', 'completed'),
(202, 3, 49.99, '2025-09-05', 'completed'),
(203, 2, 124.99, '2025-09-10', 'pending');

-- Table: order_item (order_item_id is auto-generated)
INSERT INTO order_item (course_id, order_id, price_at_purchase) VALUES
(102, 201, 75.50),
(101, 202, 49.99),
(101, 203, 49.99),
(103, 203, 75.00);

-- Table: purchased_course (purchase_id is auto-generated)
INSERT INTO purchased_course (course_id, user_id, purchase_date, progress, completion_date, certificate_code, certificate_issued_date) VALUES
(102, 2, '2025-09-01', 1.0, '2025-09-28', 'CERT-WD-ALICE', '2025-09-28'),
(101, 3, '2025-09-05', 0.8, NULL, NULL, NULL);

-- Table: review_course (review_id is auto-generated)
INSERT INTO review_course (user_id, course_id, rating, review) VALUES
(2, 102, 5.0, 'Excellent course!'),
(3, 101, 4.0, 'Very helpful content.');

-- Table: section_course
INSERT INTO section_course (section_id, course_id, title, "order") VALUES
(301, 101, 'Week 1: The Basics', 1),
(302, 101, 'Week 2: Data Structures', 2),
(303, 102, 'Module 1: HTML Essentials', 1);

-- Table: lesson_section
INSERT INTO lesson_section (lesson_id, section_id, title, "order", content_type) VALUES
(401, 301, 'Introduction to Python', 1, 'video'),
(402, 301, 'Your First "Hello, World!" Program', 2, 'article'),
(403, 302, 'Working with Lists and Tuples', 1, 'video');

-- Table: lesson_content (content_id is auto-generated)
INSERT INTO lesson_content (lesson_id, video_url, article_text) VALUES
(401, 'https://example.com/video/py_intro.mp4', NULL),
(402, NULL, 'To print "Hello, World!" in Python, use the print() function.'),
(403, 'https://example.com/video/py_lists.mp4', NULL);

-- ### SINKRONISASI SEQUENCES ###
SELECT setval(pg_get_serial_sequence('roles', 'role_id'), (SELECT MAX(role_id) FROM roles));
SELECT setval(pg_get_serial_sequence('user_base', 'user_id'), (SELECT MAX(user_id) FROM user_base));
SELECT setval(pg_get_serial_sequence('course_categories', 'category_id'), (SELECT MAX(category_id) FROM course_categories));
SELECT setval(pg_get_serial_sequence('course_base', 'course_id'), (SELECT MAX(course_id) FROM course_base));
SELECT setval(pg_get_serial_sequence('orders', 'order_id'), (SELECT MAX(order_id) FROM orders));
SELECT setval(pg_get_serial_sequence('section_course', 'section_id'), (SELECT MAX(section_id) FROM section_course));
SELECT setval(pg_get_serial_sequence('lesson_section', 'lesson_id'), (SELECT MAX(lesson_id) FROM lesson_section));
SELECT setval(pg_get_serial_sequence('profile_user', 'profile_id'), (SELECT MAX(profile_id) FROM profile_user));