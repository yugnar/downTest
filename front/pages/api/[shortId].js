import prisma from '../../clients/client';

export const config = {
    api: {
      externalResolver: true,
    },
  }

export default function getRedirectValue(req, res) {
  try {
    prisma.routingTable
      .findFirst({ where: { code: req.query.shortId } })
      .then((route) => {
        if (route !== null) {
          res.status(200).json({ route: route.full_url });
        } else {
          res
            .status(200)
            .json({ route: "http://" + process.env.NEXT_PUBLIC_SHORTEN_BASE });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  } finally {
    prisma.$disconnect();
  }
}
