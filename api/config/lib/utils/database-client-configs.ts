import path from "path";
import { EnvFunction } from "../types/config";

export const databaseClientConfigs = new Map<string, (env: EnvFunction) => object>();

databaseClientConfigs.set("mysql", env => ({
	connection: {
		connectionString: env("DATABASE_URL"),
		host: env("DATABASE_HOST", "localhost"),
		port: env.int("DATABASE_PORT", 3306),
		database: env("DATABASE_NAME", "strapi"),
		user: env("DATABASE_USERNAME", "strapi"),
		password: env("DATABASE_PASSWORD", "strapi"),
		ssl: env.bool("DATABASE_SSL", false) && {
			key: env("DATABASE_SSL_KEY"),
			cert: env("DATABASE_SSL_CERT"),
			ca: env("DATABASE_SSL_CA"),
			capath: env("DATABASE_SSL_CAPATH"),
			cipher: env("DATABASE_SSL_CIPHER"),
			rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true)

		}
	},
	pool: {
		min: env.int("DATABASE_POOL_MIN", 2),
		max: env.int("DATABASE_POOL_MAX", 10)
	}
}));

databaseClientConfigs.set("mysql2", env => ({
	connection: {
		host: env("DATABASE_HOST", "localhost"),
		port: env.int("DATABASE_PORT", 3306),
		database: env("DATABASE_NAME", "strapi"),
		user: env("DATABASE_USERNAME", "strapi"),
		password: env("DATABASE_PASSWORD", "strapi"),
		ssl: env.bool("DATABASE_SSL", false) && {
			key: env("DATABASE_SSL_KEY"),
			cert: env("DATABASE_SSL_CERT"),
			ca: env("DATABASE_SSL_CA"),
			capath: env("DATABASE_SSL_CAPATH"),
			cipher: env("DATABASE_SSL_CIPHER"),
			rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true)
		}
	},
	pool: {
		min: env.int("DATABASE_POOL_MIN", 2),
		max: env.int("DATABASE_POOL_MAX", 10)
	}
}));

databaseClientConfigs.set("postgres", env => ({
	connection: {
		connectionString: env("DATABASE_URL"),
		host: env("DATABASE_HOST", "localhost"),
		port: env.int("DATABASE_PORT", 5432),
		database: env("DATABASE_NAME", "strapi"),
		user: env("DATABASE_USERNAME", "strapi"),
		password: env("DATABASE_PASSWORD", "strapi"),
		ssl: env.bool("DATABASE_SSL", false) && {
			key: env("DATABASE_SSL_KEY"),
			cert: env("DATABASE_SSL_CERT"),
			ca: env("DATABASE_SSL_CA"),
			capath: env("DATABASE_SSL_CAPATH"),
			cipher: env("DATABASE_SSL_CIPHER"),
			rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true)
		},
		schema: env("DATABASE_SCHEMA", "public")
	},
	pool: {
		min: env.int("DATABASE_POOL_MIN", 2),
		max: env.int("DATABASE_POOL_MAX", 10)
	}
}));

databaseClientConfigs.set("sqlite", env => ({
	connection: {
		filename: env("DATABASE_FILENAME", path.join(__dirname, "..", "..", ".tmp/data.db"))
	},
	useNullAsDefault: true
}));