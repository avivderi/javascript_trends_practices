export function validateOrder (req, res, next) {
    const { customer, table, items } = req.body
    if (!customer || !table || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Missing required fields" })
    }
    next()
}

export function checkId (req, res, next) {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" })
    }
    next()
}