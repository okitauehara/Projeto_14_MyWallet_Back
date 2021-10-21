import pg from 'pg'

const { Pool } = pg

const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'mywallet',
    password: '123456'
})

export default connection