import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    if (! req.body) {
        res.statusCode = 404
        res.end('error')
        return
    }

    let data = JSON.parse(req.body)
    delete data.password

    let key = process.env.JWT_TOKEN_KEY

    let token = jwt.sign({
        data,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, key)
    
    res.send(JSON.stringify(token))
}
