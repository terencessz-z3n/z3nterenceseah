class User {
    constructor(connection) {
        this.pool = connection;
        this.user = {}
    }

    get = async (id) => {
        const session = await this.pool.connect();

        let query = `SELECT * FROM users WHERE id = '${id}'`;

        try {
            let data = {};

            let getUserResult = await session.query(query);

            if (getUserResult.rows.length > 0) {
                data = getUserResult.rows[0];

                return {
                    success: true,
                    data: data
                };
            }
        } catch (error) {
            await session.query('ROLLBACK');

            return {
                success: false,
                error: error.message
            };
        } finally {
            session.release();
        }
    };

    getbyEmail = async (email) => {
        const session = await this.pool.connect();

        let query = `SELECT * FROM users WHERE email = '${email}'`;

        try {
            let data = {};

            let getUserResult = await session.query(query);

            if (getUserResult.rows.length > 0) {
                data = getUserResult.rows[0];

                return {
                    success: true,
                    data: data
                };
            }
        } catch (error) {
            await session.query('ROLLBACK');

            return {
                success: false,
                error: error.message
            };
        } finally {
            session.release();
        }
    }

    getbyfield = async (field, value) => {
        const session = await this.pool.connect();

        let query = `SELECT * FROM users WHERE ${field} = '${value}'`;

        try {
            let data = {};

            let getUserResult = await session.query(query);

            if (getUserResult.rows.length > 0) {
                data = getUserResult.rows[0];

                return {
                    success: true,
                    data: data
                };
            }
        }
        catch (error) {
            await session.query('ROLLBACK');

            return {
                success: false,
                error: error.message
            };
        }
        finally {
            session.release();
        }
    };

    verifyUser = async (email, password) => {
        const session = await this.pool.connect();

        let query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

        try {
            let data = {};

            let getUserResult = await session.query(query);

            if (getUserResult.rows.length > 0) {
                data = getUserResult.rows[0];

                return {
                    success: true,
                    data: data
                };
            }
            else {
                return {
                    success: false
                }
            }
        }
        catch (error) {
            await session.query('ROLLBACK');

            return {
                success: false,
                error: error.message
            };
        }
        finally {
            session.release();
        }
    }
}

module.exports = User;