const { v4: uuidv4 } = require('uuid')

class DashboardService {
    async getCounters() {
        return await new Promise((resolve, reject) => {
            try {
                const result = {
                    first: Math.trunc(Math.random() * 1000),
                    second: Math.trunc(Math.random() * 1000),
                    third: Math.trunc(Math.random() * 1000),
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
