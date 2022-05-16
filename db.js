const db = {
    id: 0,
    memoryDb: new Map(),
    insertOne: function (obj) {
      this.memoryDb.set(this.id++, obj);
    },
    exists: function (id) {
      return this.memoryDb.has(id);
    },
    updateOne: function (id, obj) {
      if (this.exists(id)) {
        this.memoryDb.set(id, obj);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    },
    deleteOne: function (id) {
      if (this.exists(id)) {
        this.memoryDb.delete(id);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    },
  
    getAll: function () {
      return Object.fromEntries(this.memoryDb);
    },
  };
  
  db.insertOne({ name: "Alice" });
  db.insertOne({ name: "Bob" });
  db.insertOne({ name: "Charlie" });
  
  module.exports = db;
  