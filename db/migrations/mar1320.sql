DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS availability CASCADE;
CREATE TABLE admins (id SERIAL PRIMARY KEY NOT NULL);
CREATE TABLE employees (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL
);
CREATE TABLE availability (
  id SERIAL PRIMARY KEY NOT NULL,
  employee_id VARCHAR(50) REFERENCES employees(id),
  start_time TIME NOT NULL,
  duration INTEGER NOT NULL,
  day_of_week VARCHAR(10)
);
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admins(id),
  start_date DATE
);
CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  day VARCHAR(10),
  schedule_id INTEGER REFERENCES schedules(id)
);
CREATE TABLE employeeShits (
  employee_id INTEGER REFERENCES employees(id),
)