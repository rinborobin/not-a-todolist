USE todo_app;

-- =========================
-- Users
-- =========================

INSERT INTO users (
    id,
    name,
    email,
    password_hash
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Robin',
    'robin@example.com',
    '$2b$10$examplehashedpassword1'
),
(
    '22222222-2222-2222-2222-222222222222',
    'Alice',
    'alice@example.com',
    '$2b$10$examplehashedpassword2'
),
(
    '33333333-3333-3333-3333-333333333333',
    'Bob',
    'bob@example.com',
    '$2b$10$examplehashedpassword3'
);

-- =========================
-- Tags
-- =========================

INSERT INTO tags (
    id,
    name,
    color
) VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Study',
    '#3B82F6'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Work',
    '#EF4444'
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Personal',
    '#22C55E'
),
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Important',
    '#F59E0B'
);

-- =========================
-- Todos
-- =========================

INSERT INTO todos (
    id,
    user_id,
    title,
    description,
    is_completed,
    due_date
) VALUES
(
    'aaaa1111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'Study Database Design',
    'Review ER diagrams and normalization.',
    FALSE,
    '2026-10-02 18:00:00'
),
(
    'aaaa2222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Finish Todo API',
    'Implement CRUD endpoints using Express.',
    FALSE,
    '2026-10-03 20:00:00'
),
(
    'aaaa3333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'Buy groceries',
    'Milk, eggs, bread and chicken.',
    TRUE,
    NULL
),
(
    'aaaa4444-4444-4444-4444-444444444444',
    '22222222-2222-2222-2222-222222222222',
    'Complete project report',
    'Finish the introduction and methodology sections.',
    FALSE,
    '2026-10-05 17:00:00'
),
(
    'aaaa5555-5555-5555-5555-555555555555',
    '33333333-3333-3333-3333-333333333333',
    'Go to the gym',
    'Leg day workout.',
    FALSE,
    '2026-10-04 16:00:00'
);

-- =========================
-- Todo ↔ Tags
-- =========================

INSERT INTO todo_tags (
    todo_id,
    tag_id
) VALUES

-- Robin's todos
(
    'aaaa1111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
),
(
    'aaaa1111-1111-1111-1111-111111111111',
    'dddddddd-dddd-dddd-dddd-dddddddddddd'
),

(
    'aaaa2222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
),
(
    'aaaa2222-2222-2222-2222-222222222222',
    'dddddddd-dddd-dddd-dddd-dddddddddddd'
),

(
    'aaaa3333-3333-3333-3333-333333333333',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
),

-- Alice's todo
(
    'aaaa4444-4444-4444-4444-444444444444',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
),

-- Bob's todo
(
    'aaaa5555-5555-5555-5555-555555555555',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
);
