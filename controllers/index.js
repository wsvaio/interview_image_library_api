import connection from "../models/index.js";

export async function insert({
  title,
  author,
  created_at,
  price,
  license_type,
} = {}) {
  const [results, fields] = await connection.execute(
    `INSERT INTO images(title, author, created_at, price, license_type) VALUES('${title}', '${author}', '${created_at}', '${price}', '${license_type}')`
  );
  return results;
}

export async function findMany() {
  const [results, fields] = await connection.query("select * from images");
  return results;
}

export async function findById(id) {
  const [results, fields] = await connection.query(
    `select * from images where id = ${id}`
  );
  return results;
}

export async function update(
  id,
  { title, author, created_at, price, license_type } = {}
) {
  const patchs = Object.entries({
    title,
    author,
    created_at,
    price,
    license_type,
  }).filter(([key, val]) => val !== null && val !== undefined);
  const [results, fields] = await connection.execute(
    `update images set ${patchs.map(([key, val]) => `${key}='${val}'`)} where id = ${id}`
  );
  return results;
}

export async function deleteById(id) {
  const [results, fields] = await connection.execute(
    `delete from images where id = ${id}`
  );
  return results;
}

export async function statistics() {
  const [results, fields] = await connection.query(
    `select avg(price) as avg, max(price) as max, min(price) as min from images`
  );
  return results;
}
