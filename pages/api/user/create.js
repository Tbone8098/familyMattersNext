import { bcrypt } from "@/lib/utils";
import { prisma } from "@/lib/prisma";


export default async function handler(req, res) {
    const { firstName, lastName, email, pw } = JSON.parse(req.body);
    let salt = bcrypt.genSaltSync()
    let password = bcrypt.hashSync(pw, salt)
    let level = 1
    const results = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password,
            level,
        }
    });
    if (results){
        res.status(200).json(results);
    }
    res.status(401).json(results);
  }
  