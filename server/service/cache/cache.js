import mongoose from "mongoose";
import redis from "redis";
import { promisify } from "util";

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = async function (options = {}) {
  this.useCache = true;

  this.hashKey = options.key

  await client.connect()
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    exec.apply(this, arguments);
  }

  const key = JSON.stringify(this.hashKey)

  const cacheValue = await client.get(key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map((d) => new this.modal(d))
      : new this.modal(doc);
  }
  let result = {};
  try {
    result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
  return result;
};
