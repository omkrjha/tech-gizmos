const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    // console.log('#$#$#$#');
    // console.log(response); //see response on console how the api data is structure and look like
    // console.log('#$#$#$#');
    const products = response.records.map((product) => {
      const { id, fields } = product;
      // console.log(fields); //fields is an object it contains all data of every product we setup on airtable
      const {
        name,
        images,
        featured,
        price,
        company,
        description,
        colors,
        shipping,
        category,
      } = fields;
      // console.log(images); //images is an array contains all data of images like url, id, width height etc.
      const { url } = images[0]; //getting first image as main image
      return {
        id,
        name,
        featured,
        price,
        description,
        category,
        company,
        colors,
        shipping,
        image: url,
      };
    });
    // console.log(products); //array of objects
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'There was an error',
    };
  }
};
