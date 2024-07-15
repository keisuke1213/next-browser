// import csvtojson from 'csvtojson';
// import { NextApiRequest,NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest,res: NextApiResponse) {
//     try {
//         const response = await fetch('https://data.bodik.jp/api/3/action/datastore_search?resource_id=b420ef32-14a6-4ca6-8955-9b423a2e428c');
//         const data = await response.json();
//         res.status(200).json(data);
//     } catch (error:any) {
//         res.status(500).json({ error: error.message });
//     }
// }