import { nanoid } from 'nanoid';
import prisma from '../../clients/client';

export const config = {
  api: {
    externalResolver: true,
  },
}

export default function getPathDefinition(req, res) {
  try {
    prisma.routingTable
      .findFirst({ where: { full_url: req.query.queryUrl } })
      .then((route) => {
        if (route !== null) {
          //Code already exists in Database, return code to client.
          res.status(200).json({ route: route.code });
        } else {
          //URL not registered yet, register URL in DB.
          const shortenedUrl = nanoid(6);
          prisma.routingTable.create({
            data: {
              code: shortenedUrl,
              full_url: req.query.queryUrl,
            },
          }).
          then((newRoute) => {
            res.status(200).json({ route: newRoute.code });
          })
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  } finally {
    prisma.$disconnect();
  }
}
