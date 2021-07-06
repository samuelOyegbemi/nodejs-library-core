import path from 'path';
import cloud from 'cloudinary';
import dURI from 'datauri';

import { getEnv, removeFileExtension, setEnv } from './utility';

export const DataURI = dURI;
const dUri = new dURI();

/**
 * @method toDataUri
 * @description This function converts the buffer to data url
 * @param {{file: File} | File} config - Express request object
 * @returns {*} The data url from the string buffer
 */
const toDataUri = config => {
  return config.file
    ? dUri.format(path.extname(config.file.originalname).toString(), config.file.buffer)
    : dUri.format(path.extname(config.originalname).toString(), config.buffer);
};

// eslint-disable-next-line require-jsdoc
const getBaseFolder = () => {
  const { cloudBaseFolder, APP_ENV, NODE_ENV } = getEnv();
  return `${cloudBaseFolder}/${APP_ENV || NODE_ENV}`.trim().replace(/^(\/)|(\/)$/g, '') || '';
};

// eslint-disable-next-line require-jsdoc
const constructFolder = folder => {
  folder = folder || '';
  folder = folder.endsWith('/') ? folder.slice(0, -1) : folder;
  folder = folder.startsWith('/') ? folder.slice(1) : folder;
  folder = `${getBaseFolder()}/${folder.trim()}`;
  return folder;
};

/**
 * @namespace uploader
 * */
const uploader = {};

/**
 * @method initialize
 * @param {Object} req - Express request object
 * @param {Object} req.cloudConfig - Cloud configuration which must be appended to request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @memberOf uploader
 * @return {null} Null
 */
uploader.initialize = (req, res, next) => {
  const { cloudConfig = {} } = req;
  cloud.config({
    cloud_name: cloudConfig.cloudName,
    api_key: cloudConfig.apiKey,
    api_secret: cloudConfig.apiSecret,
  });
  setEnv({ cloudBaseFolder: cloudConfig.baseFolder || '' });
  next();
};

/**
 * @method uploadImageFromDataURI
 * @param {string} dataURI - a base64 representation of the file
 * @param {string} fileName - Name of the file to upload
 * @param {string} [folder] - the folder to upload the file excluding the main folder
 * @memberOf uploader
 * @return {Promise<*>} Uploader
 */
uploader.uploadImageFromDataURI = (dataURI, fileName, folder = '') => {
  fileName = removeFileExtension(fileName);
  folder = constructFolder(folder);
  return cloud.v2.uploader.upload(dataURI, { folder, public_id: fileName });
};

/**
 * @method uploadImageFromFile
 * @param {*} file - file
 * @param {string} fileName - Name of the file to upload
 * @param {string} [folder] - the folder to upload the file excluding the main folder
 * @memberOf uploader
 * @return {Promise<*>} Uploader
 */
uploader.uploadImageFromFile = (file, fileName, folder = '') => {
  const dataURI = toDataUri(file).content;
  return uploader.uploadImageFromDataURI(dataURI, fileName, folder);
};

/**
 * @method removeImage
 * @param {string} link - The cloudinary link to the image
 * @memberOf uploader
 * @return {*} Null
 */
uploader.removeImage = link => {
  [, link] = link.split(`/${getBaseFolder()}/`);
  if (!link) return;
  link = removeFileExtension(link);
  link = `${getBaseFolder()}/${(link || '').trim()}`;
  cloud.v2.uploader.destroy(link).catch(() => {});
};

/**
 * @method getFilesInFolder
 * @param {string} folder - the folder to load the files from
 * @memberOf uploader
 * @return {Promise<any>} Resources
 */
uploader.getFilesInFolder = folder => {
  folder = constructFolder(folder);
  return cloud.v2.api.resources({
    type: 'upload',
    prefix: `${folder}/`,
  });
};

export { toDataUri, uploader };
