import mysqlConnection from 'msql2/promise';
const propities = {
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'prot4_43822520'
};

export const pool = mysqlConnection.createPool(properties);