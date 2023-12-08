import path from "path";
import { EnvFunction } from "../types/config.types";

const clientConfigs = new Map<string, (env: EnvFunction) => object>();

clientConfigs.set("mysql", env => ({
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

clientConfigs.set("mysql2", env => ({
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

clientConfigs.set("postgres", env => ({
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

clientConfigs.set("sqlite", env => ({
	connection: {
		filename: env("DATABASE_FILENAME", path.join(__dirname, "..", "..", ".tmp/data.db"))
	},
	useNullAsDefault: true
}));

export default clientConfigs;