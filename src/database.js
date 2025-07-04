import mysql from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prot4_43822520'
};

export const pool = mysql.createPool(properties);
