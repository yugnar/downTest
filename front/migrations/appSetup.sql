-- Up

CREATE TABLE RoutingTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT,
    full_url TEXT
);

-- Down
DROP TABLE RoutingTable;