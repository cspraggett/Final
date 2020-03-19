-- grant all privileges on all tables in schema public to final;
INSERT INTO admins (id)
values
  (1);
INSERT INTO employees (admin_id, first_name, last_name, email)
values
  (1, 'John', 'Doe', 'jd@gmail.com'),
  (1, 'Jane', 'Doe', 'janed@gmail.com'),
  (1, 'Robert', 'Smith', 'robs@gmail.com'),
  (1, 'Barbara', 'Brown', 'barbb@gmail.com'),
  (1, 'Sean', 'Burke', 'sburke@gmail.com'),
  (
    1,
    'Sandra',
    'Collins',
    'scollins@gmail.com'
  );
INSERT INTO schedules (admin_id, start_date)
VALUES
  (1, '2020,03,16');
INSERT INTO days (day, schedule_id)
VALUES
  ('Monday', 1),
  ('Tuesday', 1),
  ('Wednesday', 1),
  ('Thursday', 1),
  ('Friday', 1);
INSERT INTO shifts (day_id, start_time, duration, num_of_employees)
values
  (1, '09:00', 8, 2),
  (2, '09:00', 8, 2),
  (3, '09:00', 8, 2),
  (4, '09:00', 8, 2),
  (5, '09:00', 8, 3);
INSERT INTO employeeshifts (employee_id, shift_id)
values
  (1, 1),
  (2, 1),
  (1, 2),
  (2, 2),
  (3, 3),
  (4, 3),
  (3, 4),
  (4, 4),
  (1, 5),
  (2, 5),
  (4, 5);
INSERT INTO availability (employee_id, start_time, duration, day_of_week)
VALUES
  (1, '09:00', 8, 'Monday'),
  (1, '09:00', 8, 'Tuesday'),
  (1, '09:00', 8, 'Wednesday'),
  (1, '09:00', 8, 'Thursday'),
  (1, '09:00', 8, 'Friday'),
  (1, null, null, 'Saturday'),
  (1, null, null, 'Sunday'),
  (2, '09:00', 8, 'Monday'),
  (2, '09:00', 8, 'Tuesday'),
  (2, '09:00', 8, 'Wednesday'),
  (2, '09:00', 8, 'Thursday'),
  (2, '09:00', 8, 'Friday'),
  (2, null, null, 'Saturday'),
  (2, null, null, 'Sunday'),
  (3, '09:00', 8, 'Monday'),
  (3, '09:00', 8, 'Tuesday'),
  (3, '09:00', 8, 'Wednesday'),
  (3, '09:00', 8, 'Thursday'),
  (3, '09:00', 8, 'Friday'),
  (3, null, null, 'Saturday'),
  (3, null, null, 'Sunday'),
  (4, '09:00', 8, 'Monday'),
  (4, '09:00', 8, 'Tuesday'),
  (4, '09:00', 8, 'Wednesday'),
  (4, '09:00', 8, 'Thursday'),
  (4, '09:00', 8, 'Friday'),
  (4, null, null, 'Saturday'),
  (4, null, null, 'Sunday'),
  (5, '09:00', 8, 'Monday'),
  (5, '09:00', 8, 'Tuesday'),
  (5, '09:00', 8, 'Wednesday'),
  (5, '09:00', 8, 'Thurday'),
  (5, '09:00', 8, 'Friday'),
  (5, null, null, 'Saturday'),
  (5, null, null, 'Sunday'),
  (6, '09:00', 8, 'Monday'),
  (6, '09:00', 8, 'Tuesday'),
  (6, '09:00', 8, 'Wednesday'),
  (6, '09:00', 8, 'Thurday'),
  (6, '09:00', 8, 'Friday'),
  (6, null, null, 'Saturday'),
  (6, null, null, 'Sunday');
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO final;