class Collection{
    constructor(collectionName) {
      this.collectionName = collectionName;
      this.memoryDb = new Map();
      this.id = 0;
    }
    insertOne(obj) {
      this.memoryDb.set(this.id, obj);
      return { id: this.id++, inserted: obj };
    }
    getOne(id) {
      if (this.exists(id)) {
        return this.memoryDb.get(id);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    }
    exists(id) {
      return this.memoryDb.has(id);
    }
    updateOne(id, obj) {
      if (this.exists(id)) {
        this.memoryDb.set(id, obj);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    }
    deleteOne(id) {
      if (this.exists(id)) {
        this.memoryDb.delete(id);
      } else {
        throw new Error(`Key ${id} doesn't not exists`);
      }
    }
    getAll() {
      return Object.fromEntries(this.memoryDb);
    }
    findByProperty(propertyName, value) {
      let result = false;
      this.memoryDb.forEach((obj, id) => {
        if (!result) {
          if (propertyName in obj && obj[propertyName] === value) {
            result = { id: id, found: obj };
          }
        }
      });
      return result || {};
    }
  }
  
  module.exports = Collection;
  