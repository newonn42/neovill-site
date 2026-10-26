CREATE TABLE IF NOT EXISTS rooms (
  no TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('premium', 'outer', 'inner')),
  status TEXT NOT NULL DEFAULT 'occupied' CHECK (status IN ('occupied', 'empty', 'soon', 'hidden')),
  avail_date TEXT,
  sort INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO rooms (no, type, status, sort) VALUES
  ('601', 'premium', 'occupied', 1),
  ('602', 'premium', 'occupied', 2),
  ('603', 'premium', 'occupied', 3),
  ('604', 'premium', 'soon', 4),
  ('605', 'premium', 'occupied', 5),
  ('606', 'outer', 'occupied', 6),
  ('607', 'inner', 'occupied', 7),
  ('608', 'inner', 'occupied', 8),
  ('609', 'inner', 'occupied', 9),
  ('610', 'inner', 'occupied', 10),
  ('611', 'inner', 'occupied', 11),
  ('612', 'inner', 'occupied', 12),
  ('613', 'outer', 'occupied', 13),
  ('614', 'premium', 'occupied', 14),
  ('615', 'inner', 'occupied', 15),
  ('616', 'premium', 'occupied', 16),
  ('617', 'premium', 'occupied', 17),
  ('618', 'premium', 'occupied', 18),
  ('사무실', 'inner', 'hidden', 99);
