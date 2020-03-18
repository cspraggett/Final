DROP TABLE IF EXISTS employeeShifts CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS availability CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS days CASCADE;
DROP TABLE IF EXISTS shifts CASCADE;
CREATE TABLE admins (id SERIAL PRIMARY KEY NOT NULL);
CREATE TABLE employees (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL
);
CREATE TABLE availability (
  id SERIAL PRIMARY KEY NOT NULL,
  employee_id INTEGER REFERENCES employees(id),
  start_time TIME,
  duration INTEGER,
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
CREATE TABLE shifts (
  id SERIAL PRIMARY KEY NOT NULL,
  day_id INTEGER REFERENCES days(id),
  start_time TIME NOT NULL,
  duration INTEGER,
  num_of_employees INTEGER
);
CREATE TABLE employeeShifts (
  employee_id INTEGER REFERENCES employees(id),
  shift_id INTEGER REFERENCES shifts(id),
  PRIMARY KEY(employee_id, shift_id)
);