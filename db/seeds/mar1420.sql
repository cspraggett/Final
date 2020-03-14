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
  (1, 'Sandra', 'Collins', 'scollins@gmail.com');
INSERT INTO schedules (admin_id, start_date)
VALUES
  (1, '2020,03,17');
INSERT INTO days (day, schedule_id)
VALUES
  ('m', 1),
  ('tu', 1),
  ('w', 1),
  ('th', 1),
  ('f', 1);
INSERT INTO shifts (day_id, start_time, duration, num_of_employess)
values
  (1, '09:00', 8, 2),
  (1, '09:00', 8, 2),
  (2, '09:00', 8, 2),
  (2, '09:00', 8, 2),
  (3, '09:00', 8, 2),
  (3, '09:00', 8, 2),
  (4, '09:00', 8, 2),
  (4, '09:00', 8, 2),
  (5, '09:00', 8, 3),
  (5, '09:00', 8, 3),
  (5, '09:00', 8, 3);
INSERT INTO employeeshits (employee_id, shift_id)
values
  (1, 1),
  (2, 2),
  (1, 3),
  (2, 4),
  (3, 5),
  (4, 6),
  (3, 7),
  (4, 8),
  (1, 9),
  (2, 10),
  (4, 11);
INSERT INTO availability (employee_id, start_time, duration, day_of_week)
VALUES
  (1, '09:00', 8, 'm'),
  (1, '09:00', 8, 'tu'),
  (1, '09:00', 8, 'w'),
  (1, '09:00', 8, 'th'),
  (1, '09:00', 8, 'f'),
  (1, null, null, 'sa'),
  (1, null, null, 'su'),
  (2, '09:00', 8, 'm'),
  (2, '09:00', 8, 'tu'),
  (2, '09:00', 8, 'w'),
  (2, '09:00', 8, 'th'),
  (2, '09:00', 8, 'f'),
  (2, null, null, 'su'),
  (2, null, null, 'su'),
  (3, '09:00', 8, 'm'),
  (3, '09:00', 8, 'tu'),
  (3, '09:00', 8, 'w'),
  (3, '09:00', 8, 'th'),
  (3, '09:00', 8, 'f'),
  (3, null, null, 'su'),
  (3, null, null, 'su'),
  (4, '09:00', 8, 'm'),
  (4, '09:00', 8, 'tu'),
  (4, '09:00', 8, 'w'),
  (4, '09:00', 8, 'th'),
  (4, '09:00', 8, 'f'),
  (4, null, null, 'su'),
  (4, null, null, 'su'),
  (5, '09:00', 8, 'm'),
  (5, '09:00', 8, 'tu'),
  (5, '09:00', 8, 'w'),
  (5, '09:00', 8, 'th'),
  (5, '09:00', 8, 'f'),
  (5, null, null, 'su'),
  (5, null, null, 'su'),
  (6, '09:00', 8, 'm'),
  (6, '09:00', 8, 'tu'),
  (6, '09:00', 8, 'w'),
  (6, '09:00', 8, 'th'),
  (6, '09:00', 8, 'f'),
  (6, null, null, 'su'),
  (6, null, null, 'su');