import type { NextApiRequest, NextApiResponse } from 'next'

//import {Users} from '../../db/user';

// JWT (Storage)
// Next Auth (Social Login)
// Cognito, Auth0


const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  //const users = await Users;
  //const id = ;

  console.log(req.query.id);

  const users = await [
    { id: 1, nome: 'Diogo' },
    { id: 2, nome: 'Davi' },
    { id: 3, nome: 'Gabi' },
  ];

  return res.json(users);
};

export default getUsers;