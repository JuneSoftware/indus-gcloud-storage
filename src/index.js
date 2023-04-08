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
    var fs = require("fs");
    var stats = fs.statSync(destination)
    var fileSizeInBytes = stats.size
    var fileSizeInGigabytes = fileSizeInBytes / (1024*1024*1024)
    console.log(`${fileSizeInGigabytes.toFixed(2)}G`)
  }
  catch(err)
  {
    console.log(err)
  }
}

run()
