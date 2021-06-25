import path from 'path';
import cloud from 'cloudinary';
import DataURI from 'datauri';

import { getEnv, removeFileExtension, setEnv } from '.';

const dUri = new DataURI();

/**
 * @callback UploaderInitialize
 * @param {Object} config - Configuration object
 * @param {string} config.cloudName - Cloud Name
 * @param {string} config.apiKey - API Key
 * @param {string} config.apiSecret - API Secret
 * @param {string} config.baseFolder - Base Folder
 * @return {function(Object, Object, Function): JSON} Express middleware function
 */

/**
 * @callback UploadImageFromDataURI
 * @param {string} dataURI - a base64 representation of the file
 * @param {string} fileName - Name of the file to upload
 * @param {string} [folder] - the folder to upload the file excluding the main folder
 * @return {Promise<*>} Uploader
 */

/**
 * @callback UploadImageFromFile
 * @param {string} dataURI - a base64 representation of the file
 * @param {string} fileName - Name of the file to upload
 * @param {string} [folder] - the folder to upload the file excluding the main folder
 * @return {Promise<*>} Uploader
 */

/**
 * @callback UploaderRemoveImage
 * @param {string} link - The cloudinary link to the image
 * @return {*} Null
 */

/**
 * @callback UploaderGetFilesInFolder
 * @param {string} folder - the folder to load the files from
 * @return {Promise<any>} Resources
 */

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
const initialize = config => (req, res, next) => {
  cloud.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
  });
  setEnv({ cloudBaseFolder: config.baseFolder || '' });
  next();
};

/**
 * @method getBaseFolder
 * @return {string} base folder
 */
const getBaseFolder = () => {
  const { cloudBaseFolder, APP_ENV, NODE_ENV } = getEnv();
  return `${cloudBaseFolder}/${APP_ENV || NODE_ENV}`.trim().replace(/^(\/)|(\/)$/g, '') || '';
};

/**
 * @method constructFolder
 * @param {string} folder
 * @return {string} refined folder
 */
const constructFolder = folder => {
  folder = folder || '';
  folder = folder.endsWith('/') ? folder.slice(0, -1) : folder;
  folder = folder.startsWith('/') ? folder.slice(1) : folder;
  folder = `${getBaseFolder()}/${folder.trim()}`;
  return folder;
};

// eslint-disable-next-line require-jsdoc
const uploadImageFromDataURI = (dataURI, fileName, folder = '') => {
  fileName = removeFileExtension(fileName);
  folder = constructFolder(folder);
  return cloud.v2.uploader.upload(dataURI, { folder, public_id: fileName });
};

// eslint-disable-next-line require-jsdoc
const uploadImageFromFile = (file, fileName, folder = '') => {
  const dataURI = toDataUri(file).content;
  return uploadImageFromDataURI(dataURI, fileName, folder);
};

// eslint-disable-next-line require-jsdoc
const removeImage = link => {
  [, link] = link.split(`/${getBaseFolder()}/`);
  if (!link) return;
  link = removeFileExtension(link);
  link = `${getBaseFolder()}/${(link || '').trim()}`;
  cloud.v2.uploader.destroy(link).catch(() => {});
};

// eslint-disable-next-line require-jsdoc
const getFilesInFolder = folder => {
  folder = constructFolder(folder);
  return cloud.v2.api.resources({
    type: 'upload',
    prefix: `${folder}/`,
  });
};

export { DataURI, toDataUri };

/**
 * Uploader
 * @const
 * @property {UploaderInitialize} initialize
 * @property {UploadImageFromDataURI} uploadImageFromDataURI
 * @property {UploadImageFromDataURI} uploadImageFromFile
 * @property {UploaderRemoveImage} removeImage
 * @property {UploaderGetFilesInFolder} getFilesInFolder
 */
export const uploader = {
  initialize,
  uploadImageFromDataURI,
  uploadImageFromFile,
  removeImage,
  getFilesInFolder,
};
