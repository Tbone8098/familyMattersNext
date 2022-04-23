import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    if (! req.body) {
        res.status(401).json(false)
    }
    let body = await JSON.parse(req.body)
    let data = await JSON.parse(body)
    let user = jwt.verify(data.token, process.env.JWT_TOKEN_KEY)
    
    if (user) {
        res.status(200).json(true)
    } else {
        res.status(401).json(false)
    }

}
