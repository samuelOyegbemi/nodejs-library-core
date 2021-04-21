import path from 'path';
import cloud from 'cloudinary';
import DataURI from 'datauri';

import { getEnv, removeFileExtension } from '.';

const dUri = new DataURI();

/**
 * @callback UploaderInitialize
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @return {null} Null
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
const initialize = (req, res, next) => {
  cloud.config({
    cloud_name: getEnv().CLOUDINARY_CLOUD_NAME,
    api_key: getEnv().CLOUDINARY_API_KEY,
    api_secret: getEnv().CLOUDINARY_API_SECRET,
  });
  next();
};

/**
 * @method getBaseFolder
 * @return {string} base folder
 */
const getBaseFolder = () => {
  return `${getEnv().APP_NAME}/${getEnv().APP_ENV}`;
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
