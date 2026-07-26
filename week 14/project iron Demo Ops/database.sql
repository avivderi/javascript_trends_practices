USE iron_dome;

CREATE TABLE IF NOT EXISTS operators (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    role VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS incidents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code_name VARCHAR(100),
    threat_level VARCHAR(50),
    status VARCHAR(50),
    operator_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_incident_operator FOREIGN KEY (operator_id) REFERENCES operators (id)
);

CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(100),
    incident_id INT,
    operator_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_incident FOREIGN KEY (incident_id) REFERENCES incidents (id),
    CONSTRAINT fk_log_operator FOREIGN KEY (operator_id) REFERENCES operators (id)
);