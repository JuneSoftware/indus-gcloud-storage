const core = require('@actions/core');
const {Storage} = require('@google-cloud/storage');

async function run() 
{
  const credentials = core.getInput('credentials')
  const bucketName = core.getInput('bucketName')
  const destination = core.getInput('destination')
  const source = core.getInput('source');

  const storageConfig = { credentials:JSON.parse(credentials) }
  const storage = new Storage(storageConfig)
  const downlaodOptions = { destination:destination }

  try
  {
    await storage.bucket(bucketName).file(source).download(downlaodOptions)
  }
  catch(err)
  {
    console.log(err)
  }
}

run()