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

    mockData() {
        return new Promise((resolve, reject) => {
            let filePath = path.join(__dirname, 'products.json');
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(content));
            });
        });
    }

    async read() {
        let sql = `SELECT 
        p.id,p.name,p.stock,p.active,p.insdate, m.name AS manufacturer, m.contact AS contact	  
        FROM 
        products as p JOIN manufacturers as m ON 
        p.manufacturer=m.id`;

        let result = await this.conn.query(sql);
        return result
    }




}