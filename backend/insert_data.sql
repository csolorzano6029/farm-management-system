-- Insert test data into catalogue_type
INSERT INTO
    catalogue_type (name, code, description)
VALUES
    (
        'Tipo de Producto',
        'PROD_TYPE',
        'Categorías de productos en la finca'
    ),
    (
        'Tipo de Gasto',
        'EXP_TYPE',
        'Categorías de gastos en la finca'
    );

-- Insert test data into catalogue_value
INSERT INTO
    catalogue_value (catalogue_type_id, name, code, description)
VALUES
    (
        (
            SELECT
                id
            FROM
                catalogue_type
            WHERE
                code = 'PROD_TYPE'
        ),
        'Frutas',
        'FRUIT',
        'Productos tipo frutas'
    ),
    (
        (
            SELECT
                id
            FROM
                catalogue_type
            WHERE
                code = 'PROD_TYPE'
        ),
        'Vegetales',
        'VEG',
        'Productos tipo vegetales'
    ),
    (
        (
            SELECT
                id
            FROM
                catalogue_type
            WHERE
                code = 'EXP_TYPE'
        ),
        'Mantenimiento',
        'MAINT',
        'Gastos por mantenimiento'
    ),
    (
        (
            SELECT
                id
            FROM
                catalogue_type
            WHERE
                code = 'EXP_TYPE'
        ),
        'Insumos',
        'SUPPLIES',
        'Gastos por insumos'
    );

-- Insert test data into worker
INSERT INTO
    worker (name, daily_wage)
VALUES
    ('Juan Pérez', 25.00),
    ('Ana García', 30.50),
    ('Luis Torres', 28.75);

-- Insert test data into work_log
INSERT INTO
    work_log (worker_id, work_date, hours_worked, is_paid)
VALUES
    (
        (
            SELECT
                id
            FROM
                worker
            WHERE
                name = 'Juan Pérez'
        ),
        '2025-04-18',
        8.0,
        false
    ),
    (
        (
            SELECT
                id
            FROM
                worker
            WHERE
                name = 'Ana García'
        ),
        '2025-04-18',
        6.5,
        true
    ),
    (
        (
            SELECT
                id
            FROM
                worker
            WHERE
                name = 'Luis Torres'
        ),
        '2025-04-18',
        7.0,
        false
    );

-- Insert test data into sale
INSERT INTO
    sale (sale_date, product_name, quantity, unit_price)
VALUES
    ('2025-04-17', 'Tomate', 100, 0.80),
    ('2025-04-17', 'Manzana', 50, 1.20),
    ('2025-04-16', 'Lechuga', 30, 0.50);

-- Insert test data into expense
INSERT INTO
    expense (expense_date, description, amount)
VALUES
    ('2025-04-15', 'Compra de fertilizantes', 150.00),
    ('2025-04-16', 'Reparación de tractor', 300.00),
    ('2025-04-17', 'Compra de semillas', 75.50);