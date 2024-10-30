import fs from 'node:fs/promises'
import path from 'node:path'

const databasePath = path.join(__dirname, '../db.json')

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Row {
  id: string | number
  [key: string]: any
}

interface Where {
  [key: string]: any
}

export class Database {
  #database: { [key: string]: Row[] } = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist(): void {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
  }

  // SELECT MANY
  findMany(table: string, where?: Where): Row[] {
    let data = this.#database[table] ?? []

    if (where) {
      data = data.filter((row) => {
        return Object.entries(where).every(([key, value]) => {
          if (typeof row[key] === 'boolean') return row[key] === value

          return row[key]?.includes(value)
        })
      })
    }

    return data
  }

  // SELECT UNIQUE
  findUnique(table: string, where: Where): Row | null {
    const data = this.#database[table] ?? []

    const found = data.find((row) =>
      Object.entries(where).every(([key, value]) => row[key] === value),
    )

    return found ?? null
  }

  // INSERT
  create(table: string, data: Row): Row {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  // UPDATE
  update(
    table: string,
    id: string | number,
    data: Omit<Row, 'id'>,
  ): Row | null {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      const found = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = { ...found, ...data }
      this.#persist()

      return { id, ...data }
    }

    return null
  }

  // DELETE
  delete(table: string, id: string | number): Row | null {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      const [deletedRow] = this.#database[table].splice(rowIndex, 1)
      this.#persist()

      return deletedRow
    }

    return null
  }
}
