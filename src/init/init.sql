-- Custom data types (Enums) based on the diagram
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE lesson_content_type AS ENUM ('video', 'article', 'quiz');
CREATE TYPE gender AS ENUM ('male', 'female');

-- Table: roles
-- Stores user roles like 'instructor' or 'student'.
CREATE TABLE roles (
    role_id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Table: user_base
-- Stores core user authentication details.
CREATE TABLE user_base (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id BIGINT NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Table: profile_user
-- Stores additional, non-essential user profile information.
CREATE TABLE profile_user (
    profile_id BIGSERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    no_hp VARCHAR(50),
    job VARCHAR(255),
    user_id BIGINT UNIQUE NOT NULL,
    working_place VARCHAR(255),
    gender gender,
    country_code VARCHAR(10),
    created_date TIMESTAMPTZ DEFAULT NOW(),
    updated_date TIMESTAMPTZ,
    FOREIGN KEY (user_id) REFERENCES user_base(user_id)
);

-- Table: course_categories
-- Stores different categories for courses.
CREATE TABLE course_categories (
    category_id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Table: course_base
-- Stores main information about each course.
CREATE TABLE course_base (
    course_id BIGSERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id BIGINT NOT NULL, -- The instructor who created the course
    rating REAL,
    category_id BIGINT,
    review_count INT DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    duration INT, -- Duration in minutes or hours
    certificate BOOLEAN DEFAULT FALSE,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ,
    FOREIGN KEY (user_id) REFERENCES user_base(user_id),
    FOREIGN KEY (category_id) REFERENCES course_categories(category_id)
);

-- Table: orders
-- Stores order headers, linking a user to a transaction.
CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date DATE,
    status order_status,
    FOREIGN KEY (user_id) REFERENCES user_base(user_id)
);

-- Table: order_item
-- Stores individual items within an order (junction table).
CREATE TABLE order_item (
    order_item_id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course_base(course_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Table: purchased_course
-- Tracks which courses a user has purchased and their progress.
CREATE TABLE purchased_course (
    purchase_id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    purchase_date DATE,
    progress REAL DEFAULT 0.0, -- Progress as a float (e.g., 0.75 for 75%)
    completion_date DATE,
    certificate_code VARCHAR(255) UNIQUE,
    certificate_issued_date DATE,
    UNIQUE (course_id, user_id), -- A user can only purchase a course once
    FOREIGN KEY (course_id) REFERENCES course_base(course_id),
    FOREIGN KEY (user_id) REFERENCES user_base(user_id)
);

-- Table: review_course
-- Stores user reviews and ratings for courses.
CREATE TABLE review_course (
    review_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    rating REAL NOT NULL, -- Rating as a float (e.g., 4.5)
    review TEXT,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, course_id), -- A user can only review a course once
    FOREIGN KEY (user_id) REFERENCES user_base(user_id),
    FOREIGN KEY (course_id) REFERENCES course_base(course_id)
);

-- Table: section_course
-- Defines a section or module within a course.
CREATE TABLE section_course (
    section_id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    "order" INT, -- Using double quotes because 'order' is a SQL keyword
    FOREIGN KEY (course_id) REFERENCES course_base(course_id)
);

-- Table: lesson_section
-- Defines a single lesson within a section.
CREATE TABLE lesson_section (
    lesson_id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    "order" INT,
    content_type lesson_content_type,
    FOREIGN KEY (section_id) REFERENCES section_course(section_id)
);

-- Table: lesson_content
-- Stores the actual content (video URL, article text) for a lesson.
CREATE TABLE lesson_content (
    content_id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT UNIQUE NOT NULL,
    video_url VARCHAR(255),
    article_text TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lesson_section(lesson_id)
);