-- PostgreSQL database schema for farm management system
-- Table for catalogue types
CREATE TABLE catalogue_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(32) NOT NULL UNIQUE,
    description TEXT,
    status VARCHAR(1) DEFAULT '1',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for catalogue values
CREATE TABLE catalogue_value (
    id SERIAL PRIMARY KEY,
    catalogue_type_id INT REFERENCES catalogue_type(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(32) NOT NULL UNIQUE,
    description TEXT,
    status VARCHAR(1) DEFAULT '1',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for workers
CREATE TABLE worker (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NULL,
    identification_number VARCHAR(10) NULL,
    daily_wage DECIMAL(10, 2) NOT NULL,
    status VARCHAR(1) DEFAULT '1',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for work logs
CREATE TABLE work_log (
    id SERIAL PRIMARY KEY,
    worker_id INT REFERENCES worker(id),
    work_date DATE NOT NULL,
    -- Reemplazamos hours_worked por journal_units
    -- 1.0 = un jornal completo
    -- 0.5 = medio jornal (por ejemplo, adicional en la tarde)
    journal_units DECIMAL(3, 2) NOT NULL DEFAULT 1.0,
    -- Si es un trabajo adicional en la tarde
    is_additional BOOLEAN DEFAULT FALSE,
    is_paid BOOLEAN DEFAULT FALSE,
    status VARCHAR(1) DEFAULT '1',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for sales
CREATE TABLE sale (
    id SERIAL PRIMARY KEY,
    sale_date DATE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(1) DEFAULT '1',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for expenses
CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    expense_date DATE NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(1) DEFAULT '1',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);