import multer from 'multer';

const storage = multer.memoryStorage();

/**
 * @const multerUploads
 * @property {function(*=):*} single
 * @property {function(*=):*} any
 * @property {function(*=, *=):*} array
 * @property {function(*=):*} fields
 * @property {function():*} none
 */
const multerUploads = multer({ storage });

export { multerUploads };
