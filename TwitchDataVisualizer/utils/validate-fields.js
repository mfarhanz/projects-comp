/**
 * Contains methods to validate fields/entries in created Streamer objects.
 */
let validator = require('validator');

/**
 * Checks if the supplied string is a valid streamer name.
 * @param name A string of a user's name
 * @returns A message validating the supplied name
 */
let _validate_name = (name) => {
	return new Promise((resolve, reject) => {
		name = name.split(' ').join(''); //Removing blanks
		let is_valid = validator.isAlphanumeric(name);
		if (is_valid){
			resolve('The name is valid.');
		} else if (checkChars(name)){
            resolve('The name is valid.');
        } else {
			reject('The name is invalid.');
		}
	});
};
/**
 * Checks if the supplied string is a valid number.
 * @param num A string of a number
 * @returns A message validating the supplied number
 */
let _validate_number = (num) => {
	return new Promise((resolve, reject) => {
		let is_valid = validator.isInt(num, {gt: 0});
		if (is_valid){
			resolve('Valid integer.');
		} else {
			reject('Invalid integer.');
		}
	});
};

/**
 * Checks if the supplied string has valid CJK Unicode characters.
 * @param name A string of a user's name
 * @returns boolean
 */
function checkChars(name) {
    return /^.*[a-zA-Z0-9\u3400-\u4DBF\u4E00-\u9FFF_()]{0,25}.*$/.test(name);
}

/**
 * Checks if all supplied parameters are valid to be used as streamer data.
 * @param name A string of a user's name
 * @param watchtime A string of a user's hours watched
 * @param streamtime A string of a user's hours streamed
 * @param maxviewers A string of a user's peak viewer count
 * @returns boolean
 */
module.exports.validate_fields = (name, watchtime, streamtime, maxviewers) => {
	return Promise.all([_validate_name(name), _validate_number(watchtime), 
						_validate_number(streamtime), _validate_number(maxviewers)])
		.then((values) => {
			return true;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
};
