import postgres from 'postgres'

// TODO Consider doing this with config options {} instead
const sql = postgres('postgres://postgres:password@127.0.0.1:5432/postgres')

export default sql
