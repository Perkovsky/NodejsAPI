const { v4: uuidv4 } = require('uuid')

class DashboardService {
    async getCounters() {
        return await new Promise((resolve, reject) => {
            try {
                const result = {
                    c1: Math.trunc(Math.random() * 1000),
                    c2: Math.trunc(Math.random() * 1000),
                    c3: Math.trunc(Math.random() * 1000),
                    uuid: uuidv4()
                }
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new DashboardService()
