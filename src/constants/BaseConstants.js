export function truncateDescription(description, wordLimit = 20) {
	const words = description.split(' ');
	return words.length > wordLimit
		? words.slice(0, wordLimit).join(' ') + '...'
		: description;
}
