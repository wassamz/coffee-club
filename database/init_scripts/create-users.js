db.createUser({ user: 'admin', pwd: 'manager', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

