const path = require('path');
const fs = require('fs');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    database: 'shop',
    user: 'root',
    password: 'root',
    connectionLimit: 5
});

module.exports = class DB {
    constructor() {
        pool.getConnection().then(conn => this.conn = conn)

    }

    async login(user) {
        let sql = `
        SELECT * from users 
            where email='${user.email}'
                and password=SHA1('${user.password}')  
       `;
        let result = await this.conn.query(sql)
        return result;
    }

    async read() {
        let sql = `SELECT 
        p.id,p.name,p.stock,p.active,p.insdate, m.name AS manufacturername, m.contact AS contact,p.price,m.id as manufacturerid	  
        FROM 
        products as p JOIN manufacturers as m ON 
        p.manufacturer=m.id`;

        let result = await this.conn.query(sql);
        return result
    }

    async create(data) {
        let sql = `
        INSERT INTO products 
        (name, price, stock, manufacturer,active)
        VALUES ('${data.name}',${data.price},${data.stock},${data.manufacturer},1)
        `;
        let result = await this.conn.query(sql)
        return result
    }

    async delete(id) {
        let sql = `
        DELETE FROM products WHERE id=${id}`
        let result = await this.conn.query(sql);
        return result
    }

    async update(id, data) {
        let sql = `
        UPDATE products
        SET name='${data.name}',price=${data.price},stock=${data.stock},manufacturer=${data.manufacturer} 
        WHERE id=${id}
        `;
        let result = await this.conn.query(sql);
        return result
    }


}