import { bcrypt } from "@/lib/utils";
import { prisma } from "@/lib/prisma";


export default async function handler(req, res) {
    const { email } = JSON.parse(req.body);

    const results = await prisma.user.findFirst({
        where: {
            'email': email
        }
    })
    if (results){
        res.status(200).json(results);
    } else {
        res.status(401).json(results);
    }
  }
  