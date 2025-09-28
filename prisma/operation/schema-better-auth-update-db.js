import mysql from "mysql2/promise";

// Configurações da base de dados
const dbConfig = {
  host: "10.0.0.210",
  port: 3306,
  database: "database_dev",
  user: "admin01",
  password: "19372846",
};

// Definições das tabelas que queremos garantir que existam
const tableDefinitions = {
  tbl_user: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    email: "VARCHAR(255) NOT NULL",
    emailVerified: "BOOLEAN NOT NULL DEFAULT FALSE",
    image: "VARCHAR(500) NULL",
    createdAt: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt:
      "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  },

  tbl_session: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    expiresAt: "DATETIME NOT NULL",
    token: "VARCHAR(500) NOT NULL",
    createdAt: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt:
      "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ipAddress: "VARCHAR(45) NULL",
    userAgent: "TEXT NULL",
    userId: "VARCHAR(255) NOT NULL",
    activeOrganizationId: "VARCHAR(255) NULL",
  },

  tbl_account: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    accountId: "VARCHAR(255) NOT NULL",
    providerId: "VARCHAR(255) NOT NULL",
    userId: "VARCHAR(255) NOT NULL",
    accessToken: "TEXT NULL",
    refreshToken: "TEXT NULL",
    idToken: "TEXT NULL",
    accessTokenExpiresAt: "DATETIME NULL",
    refreshTokenExpiresAt: "DATETIME NULL",
    scope: "VARCHAR(500) NULL",
    password: "VARCHAR(255) NULL",
    createdAt: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt:
      "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  },

  tbl_verification: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    identifier: "VARCHAR(255) NOT NULL",
    value: "VARCHAR(500) NOT NULL",
    expiresAt: "DATETIME NOT NULL",
    createdAt: "DATETIME NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt:
      "DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  },

  tbl_organization: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    name: "TEXT NOT NULL",
    slug: "VARCHAR(255) NULL",
    logo: "TEXT NULL",
    createdAt: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
    metadata: "TEXT NULL",
  },

  tbl_member: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    organizationId: "VARCHAR(255) NOT NULL",
    userId: "VARCHAR(255) NOT NULL",
    role: "TEXT NOT NULL",
    createdAt: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  tbl_invitation: {
    id: "VARCHAR(255) NOT NULL PRIMARY KEY",
    organizationId: "VARCHAR(255) NOT NULL",
    email: "TEXT NOT NULL",
    role: "TEXT NULL",
    status: "TEXT NOT NULL",
    expiresAt: "DATETIME NOT NULL",
    inviterId: "VARCHAR(255) NOT NULL",
  },
};

async function checkAndCreateTables() {
  let connection;

  try {
    console.log("🔌 Conectando à base de dados...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Conectado com sucesso!");

    // Para cada tabela definida
    for (const [tableName, columns] of Object.entries(tableDefinitions)) {
      console.log(`\n📋 Verificando tabela: ${tableName}`);

      // Verificar se a tabela existe
      const [tables] = await connection.execute(
        `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
        [dbConfig.database, tableName],
      );

      if (tables.length === 0) {
        console.log(`❌ Tabela ${tableName} não existe. Criando...`);
        await createTable(connection, tableName, columns);
      } else {
        console.log(`✅ Tabela ${tableName} já existe. Verificando campos...`);
        await checkAndAddColumns(connection, tableName, columns);
      }
    }

    // Criar índices e constraints se necessário
    await createIndexesAndConstraints(connection);

    console.log("\n🎉 Atualização da base de dados concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro:", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Conexão fechada.");
    }
  }
}

async function createTable(connection, tableName, columns) {
  const columnDefinitions = Object.entries(columns)
    .map(([name, definition]) => `${name} ${definition}`)
    .join(",\n  ");

  const createTableSQL = `
    CREATE TABLE ${tableName} (
      ${columnDefinitions}
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await connection.execute(createTableSQL);
    console.log(`✅ Tabela ${tableName} criada com sucesso!`);
  } catch (error) {
    console.error(`❌ Erro ao criar tabela ${tableName}:`, error.message);
    throw error;
  }
}

async function checkAndAddColumns(connection, tableName, requiredColumns) {
  // Obter colunas existentes
  const [existingColumns] = await connection.execute(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [dbConfig.database, tableName],
  );

  const existingColumnNames = existingColumns.map((row) => row.COLUMN_NAME);

  // Verificar cada coluna necessária
  for (const [columnName, columnDefinition] of Object.entries(
    requiredColumns,
  )) {
    if (!existingColumnNames.includes(columnName)) {
      console.log(`  ➕ Adicionando campo ${columnName} à tabela ${tableName}`);

      try {
        await connection.execute(
          `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition}`,
        );
        console.log(`  ✅ Campo ${columnName} adicionado com sucesso!`);
      } catch (error) {
        console.error(
          `  ❌ Erro ao adicionar campo ${columnName}:`,
          error.message,
        );
        // Continuar com outros campos mesmo se um falhar
      }
    } else {
      console.log(`  ✅ Campo ${columnName} já existe`);
    }
  }
}

async function createIndexesAndConstraints(connection) {
  console.log("\n🔗 Criando índices e constraints...");

  const indexQueries = [
    // Índices para tbl_user
    `CREATE UNIQUE INDEX IF NOT EXISTS user_email_unique ON tbl_user(email)`,

    // Índices para tbl_session
    `CREATE INDEX IF NOT EXISTS session_userId_fkey ON tbl_session(userId)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS session_token_unique ON tbl_session(token)`,

    // Índices para tbl_account
    `CREATE INDEX IF NOT EXISTS account_userId_fkey ON tbl_account(userId)`,

    // Índices para tbl_organization
    `CREATE UNIQUE INDEX IF NOT EXISTS organization_slug_unique ON tbl_organization(slug)`,

    // Índices para tbl_member
    `CREATE INDEX IF NOT EXISTS member_organizationId_fkey ON tbl_member(organizationId)`,
    `CREATE INDEX IF NOT EXISTS member_userId_fkey ON tbl_member(userId)`,

    // Índices para tbl_invitation
    `CREATE INDEX IF NOT EXISTS invitation_organizationId_fkey ON tbl_invitation(organizationId)`,
    `CREATE INDEX IF NOT EXISTS invitation_inviterId_fkey ON tbl_invitation(inviterId)`,

    // Índices para tbl_verification
    // Não há índices únicos específicos definidos no schema Prisma além do ID
  ];

  // Constraints de Foreign Key
  const foreignKeyQueries = [
    // Foreign keys para tbl_session
    `ALTER TABLE tbl_session ADD CONSTRAINT fk_session_user 
     FOREIGN KEY (userId) REFERENCES tbl_user(id) ON DELETE CASCADE`,

    // Foreign keys para tbl_account
    `ALTER TABLE tbl_account ADD CONSTRAINT fk_account_user 
     FOREIGN KEY (userId) REFERENCES tbl_user(id) ON DELETE CASCADE`,

    // Foreign keys para tbl_member
    `ALTER TABLE tbl_member ADD CONSTRAINT fk_member_organization 
     FOREIGN KEY (organizationId) REFERENCES tbl_organization(id) ON DELETE CASCADE`,
    `ALTER TABLE tbl_member ADD CONSTRAINT fk_member_user 
     FOREIGN KEY (userId) REFERENCES tbl_user(id) ON DELETE CASCADE`,

    // Foreign keys para tbl_invitation
    `ALTER TABLE tbl_invitation ADD CONSTRAINT fk_invitation_organization 
     FOREIGN KEY (organizationId) REFERENCES tbl_organization(id) ON DELETE CASCADE`,
    `ALTER TABLE tbl_invitation ADD CONSTRAINT fk_invitation_inviter 
     FOREIGN KEY (inviterId) REFERENCES tbl_user(id) ON DELETE CASCADE`,
  ];

  // Criar índices
  for (const query of indexQueries) {
    try {
      await connection.execute(query);
      console.log(`✅ Índice criado: ${query.split(" ")[5] || "índice"}`);
    } catch (error) {
      if (!error.message.includes("Duplicate key name")) {
        console.log(`ℹ️  Índice já existe ou erro esperado: ${error.message}`);
      }
    }
  }

  // Criar Foreign Keys
  for (const query of foreignKeyQueries) {
    try {
      await connection.execute(query);
      console.log(
        `✅ Foreign Key criada: ${query.split("CONSTRAINT")[1]?.split("FOREIGN")[0]?.trim() || "FK"}`,
      );
    } catch (error) {
      if (
        !error.message.includes("Duplicate foreign key constraint") &&
        !error.message.includes("already exists")
      ) {
        console.log(
          `ℹ️  Foreign Key já existe ou erro esperado: ${error.message}`,
        );
      }
    }
  }
}

// Executar o script
async function main() {
  try {
    await checkAndCreateTables();
    console.log("\n✨ Script executado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n💥 Falha na execução:", error);
    process.exit(1);
  }
}

// Executar apenas se for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkAndCreateTables };
