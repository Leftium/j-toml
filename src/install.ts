import TypeError from '.TypeError';
import Promise from '.Promise';
import parse from './parse';

export default function install (
	readFile :(path :string) => Buffer | Promise<Buffer>,
	specificationVersion :0.5 | 0.4,
	multiLineJoiner :string,
	useBigInt :boolean | number = true,
	xOptions                    = null
) {
	if ( typeof readFile!=='function' ) { throw TypeError('TOML.install(readFile)'); }
	parse('', specificationVersion, multiLineJoiner, useBigInt, xOptions);
	require.extensions['.toml'] = function require_toml (module, filename :string) :void {
		const sourceContent = readFile(filename);
		module.exports = sourceContent instanceof Promise
			? sourceContent.then(onFulfilled)
			: parse(sourceContent, specificationVersion, multiLineJoiner, useBigInt, xOptions);
	};
	function onFulfilled (sourceContent :Buffer) :object {
		return parse(sourceContent, specificationVersion, multiLineJoiner, useBigInt, xOptions);
	}
};
