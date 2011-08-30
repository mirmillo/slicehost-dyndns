exports.trim = trim;
function trim(string) {
//	return string.replace(/^\s*|\s*$/, '')
	return string.replace(/^(\s*)((\S+\s*?)*)(\s*)$/,"$2");
}
