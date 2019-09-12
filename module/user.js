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
    getToken(l = 20) {
        let cookie = '';
        for (let i = 0; i < l; i++) {
            let index = Math.round(Math.random() * 50 + 65)
            cookie += String.fromCharCode(index)
            return cookie;
        }
    };
    async login(user) {
        let sql = `
        SELECT * from users 
            where email='${user.email}'
                and password=SHA1('${user.password}')  
       `;
        let result = await this.conn.query(sql)
        return result;
    }

    async create(data) {
        let sql = `
        INSERT INTO users 
        (name,email,password,token)
        VALUES ('${data.name}','${data.email}',SHA1('${data.password}'),'1')
        `;
        let result = await this.conn.query(sql)
        return result
    }



}