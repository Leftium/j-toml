﻿/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.33.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

import Error from '.Error';
import TypeError from '.TypeError';
import isView from '.ArrayBuffer.isView';
import isArray$1 from '.Array.isArray';
import Object_assign from '.Object.assign';
import hasOwn from '.Object.hasOwn?=';
import undefined$1 from '.undefined';
import Null$1 from '.null';
import isArrayBuffer from '.class.isArrayBuffer';
import TextDecoder from '.TextDecoder';
import bind from '.Function.prototype.bind?';
import test from '.RegExp.prototype.test';
import exec from '.RegExp.prototype.exec';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import freeze from '.Object.freeze?';
import apply from '.Reflect.apply?';
import Proxy from '.Proxy?';
import RangeError from '.RangeError';
import WeakMap from '.WeakMap';
import map_get from '.WeakMap.prototype.get';
import map_set from '.WeakMap.prototype.set';
import Object_create from '.Object.create';
import isSafeInteger from '.Number.isSafeInteger';
import getOwnPropertyNames from '.Object.getOwnPropertyNames';
import NULL from '.null.prototype';
import WeakSet from '.WeakSet';
import has from '.WeakSet.prototype.has';
import add from '.WeakSet.prototype.add';
import set_del from '.WeakSet.prototype.delete';
import Proxy$1 from '.Proxy';
import Object_defineProperty from '.Object.defineProperty';
import freeze$1 from '.Object.freeze';
import Reflect_apply from '.Reflect.apply';
import Reflect_construct from '.Reflect.construct';
import Reflect_defineProperty from '.Reflect.defineProperty';
import Reflect_deleteProperty from '.Reflect.deleteProperty';
import Reflect_ownKeys from '.Reflect.ownKeys';
import map_has from '.WeakMap.prototype.has';
import map_del from '.WeakMap.prototype.delete';
import Symbol from '.Symbol';
import Object$1 from '.Object';
import NativeDate from '.Date';
import parse$2 from '.Date.parse';
import preventExtensions from '.Object.preventExtensions';
import getOwnPropertyDescriptors from '.Object.getOwnPropertyDescriptors';
import defineProperties from '.null.defineProperties';
import parseInt from '.parseInt';
import fromCharCode from '.String.fromCharCode';
import fromCodePoint from '.String.fromCodePoint';
import BigInt from '.BigInt';
import isFinite from '.isFinite';
import Infinity from '.Infinity';
import NaN$1 from '.NaN';
import Array from '.Array';
import MAX_SAFE_INTEGER from '.Number.MAX_SAFE_INTEGER';
import DATE$1 from '.Date.prototype';
import isPrototypeOf from '.Object.prototype.isPrototypeOf';
import is from '.Object.is';
import isString from '.class.isString';
import isNumber from '.class.isNumber';
import isBigInt from '.class.isBigInt';
import isBoolean from '.class.isBoolean';
import Object_fromEntries from '.Object.fromEntries';
import Float64Array from '.Float64Array';
import Uint8Array from '.Uint8Array';
import Default from '.default';

const version = '1.33.1';

/*!@preserve@license
 * 模块名称：j-regexp
 * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
   　　　　　More readable way for creating RegExp. Belong to "Plan J".
 * 模块版本：8.2.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
 */

var Test                                           = bind
	? /*#__PURE__*/bind.bind(test       )       
	: function (re) {
		return function (string) {
			return test.call(re, string);
		};
	};

var Exec                                           = bind
	? /*#__PURE__*/bind.bind(exec       )       
	: function (re) {
		return function (string) {
			return exec.call(re, string);
		};
	};

function __PURE__ (re        )         {
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	var source = test.source = exec.source = re.source;
	test.unicode = exec.unicode = re.unicode;
	test.ignoreCase = exec.ignoreCase = re.ignoreCase;
	test.multiline = exec.multiline = source.indexOf('^')<0 && source.indexOf('$')<0 ? null : re.multiline;
	test.dotAll = exec.dotAll = source.indexOf('.')<0 ? null : re.dotAll;
	return re;
}
function theRegExp (re        )         { return /*#__PURE__*/__PURE__(re); }

var NT = /[\n\t]+/g;
var ESCAPE = /\\./g;
function graveAccentReplacer ($$        ) { return $$==='\\`' ? '`' : $$; }

var includes = ''.includes       
	? function (that        , searchString        ) { return that.includes(searchString); }
	: function (that        , searchString        ) { return that.indexOf(searchString)>-1; };

function RE (               template                      ) {
	var U = this.U;
	var I = this.I;
	var M = this.M;
	var S = this.S;
	var raw = template.raw;
	var source = raw[0] .replace(NT, '');
	var index = 1;
	var length = arguments.length;
	while ( index!==length ) {
		var value            
			                       
			                          
			                             
			                            
			                         
		  = arguments[index];
		if ( typeof value==='string' ) { source += value; }
		else {
			var value_source = value.source;
			if ( typeof value_source!=='string' ) { throw TypeError('source'); }
			if ( value.unicode===U ) { throw SyntaxError('unicode'); }
			if ( value.ignoreCase===I ) { throw SyntaxError('ignoreCase'); }
			if ( value.multiline===M && ( includes(value_source, '^') || includes(value_source, '$') ) ) { throw SyntaxError('multiline'); }
			if ( value.dotAll===S && includes(value_source, '.') ) { throw SyntaxError('dotAll'); }
			source += value_source;
		}
		source += raw[index++] .replace(NT, '');
	}
	var re         = RegExp(U ? source = source.replace(ESCAPE, graveAccentReplacer) : source, this.flags);
	var test = re.test = Test(re);
	var exec = re.exec = Exec(re);
	test.source = exec.source = source;
	test.unicode = exec.unicode = !U;
	test.ignoreCase = exec.ignoreCase = !I;
	test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? !M : null;
	test.dotAll = exec.dotAll = includes(source, '.') ? !S : null;
	return re;
}

var RE_bind = bind && /*#__PURE__*/bind.bind(RE       );

function Context (flags        )          {
	return {
		U: !includes(flags, 'u'),
		I: !includes(flags, 'i'),
		M: !includes(flags, 'm'),
		S: !includes(flags, 's'),
		flags: flags
	};
}

var CONTEXT          = /*#__PURE__*/Context('');

var newRegExp = Proxy
	? /*#__PURE__*/new Proxy(RE, {
		apply: function (RE, thisArg, args                                   ) { return apply(RE, CONTEXT, args); }
		,
		get: function (RE, flags        ) { return RE_bind(Context(flags)); }
		,
		defineProperty: function () { return false; }
		,
		preventExtensions: function () { return false; }
	})
	: /*#__PURE__*/function () {
		RE.apply = RE.apply;
		var newRegExp = function () { return RE.apply(CONTEXT, arguments       ); }       ;
		var d = 1;
		var g = d*2;
		var i = g*2;
		var m = i*2;
		var s = i*2;
		var u = s*2;
		var y = u*2;
		var flags = y*2 - 1;
		while ( flags-- ) {
			( function (context) {
				newRegExp[context.flags] = function () { return RE.apply(context, arguments       ); };
			} )(Context(
				( flags & d ? '' : 'd' )
				+
				( flags & g ? '' : 'g' )
				+
				( flags & i ? '' : 'i' )
				+
				( flags & m ? '' : 'm' )
				+
				( flags & s ? '' : 's' )
				+
				( flags & u ? '' : 'u' )
				+
				( flags & y ? '' : 'y' )
			));
		}
		return freeze ? freeze(newRegExp) : newRegExp;
	}();

var clearRegExp = '$_' in RegExp
	? /*#__PURE__*/function () {
		var REGEXP = /^/;
		REGEXP.test = REGEXP.test;
		return function clearRegExp                (value    )                {
			REGEXP.test('');
			return value;
		};
	}()
	: function clearRegExp                (value    )                {
		return value;
	};

var clearRegExp$1 = clearRegExp;

/*¡ j-regexp */

//import * as options from './options';

const NONE                    = [];
let sourcePath         = '';
let sourceLines                    = NONE;
let lastLineIndex         = -1;
let lineIndex         = -1;

const throws = (error       )        => {
	//if ( sourceLines!==NONE ) { done(); options.clear(); }
	throw error;
};

const EOL = /\r?\n/;
const todo = (source        , path        )       => {
	if ( typeof path!=='string' ) { throw TypeError(`TOML.parse(,,,,sourcePath)`); }
	sourcePath = path;
	sourceLines = source.split(EOL);
	lastLineIndex = sourceLines.length - 1;
	lineIndex = -1;
};

const next = ()         => sourceLines[++lineIndex] ;

const rest = ()          => lineIndex!==lastLineIndex;

class mark {
	                 lineIndex = lineIndex;
	                 type                                                                                           ;
	                 restColumn        ;
	constructor (type                                                                                           , restColumn        ) {
		this.type = type;
		this.restColumn = restColumn;
		return this;
	}
	must (          )         {
		lineIndex===lastLineIndex && throws(SyntaxError(`${this.type} is not close until the end of the file` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
		return sourceLines[++lineIndex] ;
	}
	nowrap (          )        {
		throw throws(Error(`TOML.parse(,,multilineStringJoiner) must be passed, while the source including multi-line string` + where(', which started from ', this.lineIndex, sourceLines[this.lineIndex] .length - this.restColumn + 1)));
	}
}
const where = (pre        , rowIndex         = lineIndex, columnNumber         = 0)         => sourceLines===NONE ? '' :
	sourcePath
		? `\n    at (${sourcePath}:${rowIndex + 1}:${columnNumber})`
		: `${pre}line ${rowIndex + 1}: ${sourceLines[rowIndex]}`;

const done = ()       => {
	sourcePath = '';
	sourceLines = NONE;
};

/*!@preserve@license
 * 模块名称：j-orderify
 * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
   　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
 * 模块版本：7.0.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
 */

const Keeper =     ()      => [];

const newWeakMap = () => {
	const weakMap = new WeakMap;
	weakMap.has = weakMap.has;
	weakMap.get = weakMap.get;
	weakMap.set = weakMap.set;
	return weakMap;
};
const target2keeper = /*#__PURE__*/newWeakMap()     
	                                                                      
	                                                                         
 ;
const proxy2target = /*#__PURE__*/newWeakMap()     
	                             
	                                                 
	                                                   
 ;
const target2proxy = /*#__PURE__*/newWeakMap()     
	                                                  
	                                                   
 ;

const handlers                       = /*#__PURE__*/Object_assign(Object_create(NULL), {
	defineProperty:                 (target                   , key   , descriptor                    )          => {
		if ( hasOwn(target, key) ) {
			return Reflect_defineProperty(target, key, Object_assign(Object_create(NULL), descriptor));
		}
		if ( Reflect_defineProperty(target, key, Object_assign(Object_create(NULL), descriptor)) ) {
			const keeper = target2keeper.get(target) ;
			keeper[keeper.length] = key;
			return true;
		}
		return false;
	},
	deleteProperty:                 (target                   , key   )          => {
		if ( Reflect_deleteProperty(target, key) ) {
			const keeper = target2keeper.get(target) ;
			const index = keeper.indexOf(key);
			index<0 || --keeper.copyWithin(index, index + 1).length;
			return true;
		}
		return false;
	},
	ownKeys:                    (target   ) => target2keeper.get(target)                         ,
	construct:                                     (target                         , args   , newTarget     )    => orderify(Reflect_construct(target, args, newTarget)),
	apply:                                        (target                              , thisArg   , args   )    => orderify(Reflect_apply(target, thisArg, args)),
});

const newProxy =                                              (target   , keeper           )    => {
	target2keeper.set(target, keeper);
	const proxy = new Proxy$1   (target, handlers);
	proxy2target.set(proxy, target);
	return proxy;
};

const orderify =                    (object   )    => {
	if ( proxy2target.has(object) ) { return object; }
	let proxy = target2proxy.get(object)                 ;
	if ( proxy ) { return proxy; }
	proxy = newProxy(object, Object_assign(Keeper          (), Reflect_ownKeys(object)));
	target2proxy.set(object, proxy);
	return proxy;
};

const Null = /*#__PURE__*/function () {
	function throwConstructing ()        { throw TypeError(`Super constructor Null cannot be invoked with 'new'`); }
	function throwApplying ()        { throw TypeError(`Super constructor Null cannot be invoked without 'new'`); }
	const Nullify = (constructor                             ) => {
		delete constructor.prototype.constructor;
		freeze$1(constructor.prototype);
		return constructor;
	};
	function Null (           constructor                              ) {
		return new.target
			? new.target===Null
				? /*#__PURE__*/throwConstructing()
				: /*#__PURE__*/newProxy(this, Keeper     ())
			: typeof constructor==='function'
				? /*#__PURE__*/Nullify(constructor)
				: /*#__PURE__*/throwApplying();
	}
	//@ts-ignore
	Null.prototype = null;
	Object_defineProperty(Null, 'name', Object_assign(Object_create(NULL), { value: '', configurable: false }));
	//delete Null.length;
	freeze$1(Null);
	return Null;
}()                                           ;

/*¡ j-orderify */

const INLINES = new WeakMap                                                                     ();
const SECTIONS = new WeakSet                ();

const deInline = /*#__PURE__*/map_del.bind(INLINES)                                                                              ;
const deSection = /*#__PURE__*/set_del.bind(SECTIONS)                                                  ;

const isInline = /*#__PURE__*/map_has.bind(INLINES)                                                  ;
const ofInline = /*#__PURE__*/map_get.bind(INLINES)     
	                                                                          
	                                                               
	                                       
 ;
const beInline = /*#__PURE__*/map_set.bind(INLINES)     
	                                                                                  
	                                                                       
 ;
const inline =                                                         (value   , mode                , looping         )    => {
	if ( isArray$1(value) ) {
		if ( looping ) { mode = 3; }
		else {
			if ( mode===undefined$1 ) { mode = 3; }
			else if ( mode!==0 && mode!==1 && mode!==2 && mode!==3 ) {
				throw typeof mode==='number'
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${mode}`)
					: TypeError(`array inline mode must be "number" type, not including ${mode===null ? '"null"' : typeof mode}`);
			}
		}
		beInline(value, mode);
	}
	else {
		beInline(value, true);
		deSection(value);
	}
	return value;
};
const multilineTable =                                  (value   )    => {
	beInline(value, false);
	deSection(value);
	return value;
};
const multilineArray =                                       (value   )    => {
	deInline(value);
	return value;
};

const isSection = /*#__PURE__*/has.bind(SECTIONS)                                                                  ;
const beSection = /*#__PURE__*/add.bind(SECTIONS)                                                 ;
const Section =                            (table   )    => {
	if ( isArray$1(table) ) { throw TypeError(`array can not be section, maybe you want to use it on the tables in it`); }
	beSection(table);
	deInline(table);
	return table;
};

const INLINE = true;

const tables = new WeakSet       ();
const tables_add = /*#__PURE__*/add.bind(tables);
const isTable = /*#__PURE__*/has.bind(tables)                                              ;

const implicitTables = new WeakSet       ();
const implicitTables_add = /*#__PURE__*/add.bind(implicitTables);
const implicitTables_del = /*#__PURE__*/set_del.bind(implicitTables)                                         ;
const directlyIfNot = (table       )          => {
	if ( implicitTables_del(table) ) {
		beSection(table);
		return true;
	}
	return false;
};
const DIRECTLY = true;
const IMPLICITLY = false;

const pairs = new WeakSet       ();
const pairs_add = /*#__PURE__*/add.bind(pairs);
const fromPair = /*#__PURE__*/has.bind(pairs)                                         ;
const PAIR = true;

const PlainTable = /*#__PURE__*/Null$1(class Table extends Null$1      {
	                                
	constructor (isDirect          , isInline$fromPair          ) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

const OrderedTable = /*#__PURE__*/Null$1(class Table extends Null      {
	                                
	constructor (isDirect          , isInline$fromPair          ) {
		super();
		tables_add(this);
		isDirect
			? isInline$fromPair ? beInline(this, true) : beSection(this)
			: ( isInline$fromPair ? pairs_add : implicitTables_add )(this);
		return this;
	}
});

/* nested (readable) */

const Whitespace = /[ \t]/;

const PRE_WHITESPACE = /*#__PURE__*/newRegExp`
	^${Whitespace}+`.valueOf();

const { exec: VALUE_REST_exec } = /*#__PURE__*/newRegExp.s       `
	^
	(
		(?:\d\d\d\d-\d\d-\d\d \d)?
		[\w\-+.:]+
	)
	${Whitespace}*
	(.*)
	$`.valueOf();

const { exec: LITERAL_STRING_exec } = /*#__PURE__*/newRegExp.s       `
	^
	'([^']*)'
	${Whitespace}*
	(.*)`.valueOf();

const { exec: MULTI_LINE_LITERAL_STRING_0_1_2 } = /*#__PURE__*/newRegExp.s           `
	^
	(.*?)
	'''('{0,2})
	${Whitespace}*
	(.*)`.valueOf();
const { exec: MULTI_LINE_LITERAL_STRING_0 } = /*#__PURE__*/newRegExp.s           `
	^
	(.*?)
	'''()
	${Whitespace}*
	(.*)`.valueOf();
let __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;

const SYM_WHITESPACE = /*#__PURE__*/newRegExp.s`
	^
	.
	${Whitespace}*`.valueOf();


const Tag = /[^\x00-\x1F"#'()<>[\\\]`{}\x7F]+/;

const { exec: KEY_VALUE_PAIR_exec } = /*#__PURE__*/newRegExp.s   `
	^
	${Whitespace}*
	=
	${Whitespace}*
	(?:
		<(${Tag})>
		${Whitespace}*
	)?
	(.*)
	$`.valueOf();

const { exec: _VALUE_PAIR_exec } = /*#__PURE__*/newRegExp.s       `
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.valueOf();

const { exec: TAG_REST_exec } = /*#__PURE__*/newRegExp.s       `
	^
	<(${Tag})>
	${Whitespace}*
	(.*)
	$`.valueOf();

/* optimized (avoid overflow or lost) */

const MULTI_LINE_BASIC_STRING = theRegExp(/[^\\"]+|\\.?|"(?!"")"?/sy);
const MULTI_LINE_BASIC_STRING_exec_0_length = (_        )         => {
	let lastIndex         = /*MULTI_LINE_BASIC_STRING.lastIndex = */0;
	while ( MULTI_LINE_BASIC_STRING.test(_) ) { lastIndex = MULTI_LINE_BASIC_STRING.lastIndex; }
	return lastIndex;
};

const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ = /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ = /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// Tab
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// Tab \<ws>newline
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH = /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;/// not \<ws>newline
let __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = (_        )          => !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, '');/// op?

const BASIC_STRING_TAB______ = theRegExp(/[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);
const BASIC_STRING__________ = theRegExp(/[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);/// Tab
const BASIC_STRING_DEL______ = theRegExp(/[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);/// Tab
const BASIC_STRING_DEL_SLASH = theRegExp(/[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y);/// Tab
let __BASIC_STRING = BASIC_STRING_DEL_SLASH;
const BASIC_STRING_exec_1_endIndex = (line        )         => {
	let lastIndex         = __BASIC_STRING.lastIndex = 1;
	while ( __BASIC_STRING.test(line) ) { lastIndex = __BASIC_STRING.lastIndex; }
	lastIndex!==line.length && line[lastIndex]==='"' || throws(SyntaxError(`Bad basic string` + where(' at ')));
	return lastIndex;
};

const { test: IS_DOT_KEY } = theRegExp(/^[ \t]*\./);
const DOT_KEY = /^[ \t]*\.[ \t]*/;
const { exec: BARE_KEY_STRICT } = theRegExp(/^[\w-]+/);
const { exec: BARE_KEY_FREE } = theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/);
let __BARE_KEY_exec = BARE_KEY_FREE;
const { exec: LITERAL_KEY____ } = theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/);
const { exec: LITERAL_KEY_DEL } = theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/);
let __LITERAL_KEY_exec = LITERAL_KEY_DEL;
let supportArrayOfTables = true;

const TABLE_DEFINITION_exec_groups = (lineRest        , parseKeys                                                                                                 )                                                                                                   => {
	const asArrayItem          = lineRest[1]==='[';
	if ( asArrayItem ) {
		supportArrayOfTables || throws(SyntaxError(`Array of Tables is not allowed before TOML v0.2` + where(', which at ')));
		lineRest = lineRest.slice(2);
	}
	else { lineRest = lineRest.slice(1); }
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	const { leadingKeys, finalKey } = { lineRest } = parseKeys(lineRest);
	lineRest = lineRest.replace(PRE_WHITESPACE, '');
	lineRest && lineRest[0]===']' || throws(SyntaxError(`Table header is not closed` + where(', which is found at ')));
	( lineRest.length>1 ? lineRest[1]===']'===asArrayItem : !asArrayItem ) || throws(SyntaxError(`Square brackets of Table definition statement not match` + where(' at ')));
	lineRest = lineRest.slice(asArrayItem ? 2 : 1).replace(PRE_WHITESPACE, '');
	let tag        ;
	if ( lineRest && lineRest[0]==='<' ) { ( { 1: tag, 2: lineRest } = TAG_REST_exec(lineRest) ?? throws(SyntaxError(`Bad tag` + where(' at '))) ); }
	else { tag = ''; }
	return { leadingKeys, finalKey, asArrayItem, tag, lineRest };
};

const KEY_VALUE_PAIR_exec_groups = ({ leadingKeys, finalKey, lineRest }                                                               )                                                                             => {
	const { 1: tag = '' } = { 2: lineRest } = KEY_VALUE_PAIR_exec(lineRest) ?? throws(SyntaxError(`Keys must equal something` + where(', but missing at ')));
	tag || lineRest && lineRest[0]!=='#' || throws(SyntaxError(`Value can not be missing after euqal sign` + where(', which is found at ')));
	return { leadingKeys, finalKey, tag, lineRest };
};

const { test: CONTROL_CHARACTER_EXCLUDE_TAB____ } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/);
const { test: CONTROL_CHARACTER_EXCLUDE_TAB_DEL } = theRegExp(/[\x00-\x08\x0B-\x1F]/);
let __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;

const switchRegExp = (specificationVersion        )       => {
	switch ( specificationVersion ) {
		case 1.0:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
			__BASIC_STRING = BASIC_STRING_TAB______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.5:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY____;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
			__BASIC_STRING = BASIC_STRING__________;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		case 0.4:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
			__BASIC_STRING = BASIC_STRING_DEL______;
			__BARE_KEY_exec = BARE_KEY_STRICT;
			supportArrayOfTables = true;
			break;
		default:
			__MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
			__LITERAL_KEY_exec = LITERAL_KEY_DEL;
			__CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
			__ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
			__BASIC_STRING = BASIC_STRING_DEL_SLASH;
			__BARE_KEY_exec = BARE_KEY_FREE;
			supportArrayOfTables = false;
	}
};

const NUM = /*#__PURE__*/newRegExp`
	(?:
		0
		(?:
			b[01][_01]*
		|
			o[0-7][_0-7]*
		|
			x[\dA-Fa-f][_\dA-Fa-f]*
		|
			(?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
		)
	|
		[1-9][_\d]*
		(?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
	|
		inf
	|
		nan
	)
`.valueOf();
const { test: IS_AMAZING } = /*#__PURE__*/newRegExp`
	^(?:
		-?${NUM}
		(?:-${NUM})*
	|
		true
	|
		false
	)$
`.valueOf();
const { test: BAD_DXOB } = /*#__PURE__*/newRegExp`_(?![\dA-Fa-f])`.valueOf();
const isAmazing = (keys        )          => IS_AMAZING(keys) && !BAD_DXOB(keys);

let mustScalar          = true;

/* options */

let useWhatToJoinMultilineString                = null;
let usingBigInt                 = true;
let IntegerMinNumber         = 0;
let IntegerMaxNumber         = 0;

              

                                           
	                 
	                
	                 
	                
	               
	                
	                  
	                 
	                  
  
let preserveLiteral         ;
let zeroDatetime         ;
let inlineTable         ;
let moreDatetime         ;
let disallowEmptyKey         ;
//export const xob :boolean = true;
let sError         ;
let sFloat         ;
                               
let Table                  ;
let allowLonger         ;
let enableNull         ;
let allowInlineTableMultilineAndTrailingCommaEvenNoComma         ;
let preserveComment         ;
let disableDigit         ;
const arrayTypes = new WeakMap           ();
const arrayTypes_get = /*#__PURE__*/map_get.bind(arrayTypes)                                  ;
const arrayTypes_set = /*#__PURE__*/map_set.bind(arrayTypes)                                     ;
                                  
const As = ()     => {
	const as = (array       )        => {
		const got = arrayTypes_get(array);
		got
			? got===as || throws(TypeError(`Types in Array must be same` + where('. Check ')))
			: arrayTypes_set(array, as);
		return array;
	};
	return as;
};
const AS_TYPED = {
	asNulls: As(),
	asStrings: As(),
	asTables: As(),
	asArrays: As(),
	asBooleans: As(),
	asFloats: As(),
	asIntegers: As(),
	asOffsetDateTimes: As(),
	asLocalDateTimes: As(),
	asLocalDates: As(),
	asLocalTimes: As(),
};
const asMixed     = (array       )        => array;
let
	asNulls    ,
	asStrings    ,
	asTables    ,
	asArrays    ,
	asBooleans    ,
	asFloats    ,
	asIntegers    ,
	asOffsetDateTimes    ,
	asLocalDateTimes    ,
	asLocalDates    ,
	asLocalTimes    ;

/* xOptions.tag */

let processor             = null;
                                            
           
	                                                                                
	                                                                                
	                                                                               
let collection              = [];
let collection_length         = 0;
const collect_on = (tag        , array              , table              , key         )       => {
	const each = Object_create(NULL)                                                                           ;
	each.tag = tag;
	if ( table ) {
		each.table = table;
		each.key = key ;
	}
	if ( array ) {
		each.array = array;
		each.index = array.length;
	}
	collection[collection_length++] = each;
};
const collect_off = ()        => { throw throws(SyntaxError(`xOptions.tag is not enabled, but found tag syntax` + where(' at '))); };
let collect                                                                                                                          = collect_off;
                                                      
const Process = ()          => {
	if ( collection_length ) {
		let index = collection_length;
		const process = processor ;
		const queue = collection;
		collection = [];
		return ()       => {
			do {
				process(queue[--index] );
				queue.length = index;
			}
			while ( index );
		};
	}
	return null;
};

/* use & clear */

const clear = ()       => {
	processor = null;
	collection.length = collection_length = 0;
	zeroDatetime = false;
	useWhatToJoinMultilineString = null;
};

const use = (specificationVersion         , multilineStringJoiner         , useBigInt         , xOptions          )       => {
	
	let mixed         ;
	switch ( specificationVersion ) {
		case 1.0:
			mustScalar = mixed = moreDatetime = sFloat = inlineTable = true;
			zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.5:
			mustScalar = moreDatetime = sFloat = inlineTable = true;
			mixed = zeroDatetime = disallowEmptyKey = false;
			break;
		case 0.4:
			mustScalar = disallowEmptyKey = inlineTable = true;
			mixed = zeroDatetime = moreDatetime = sFloat = false;
			break;
		case 0.3:
			mustScalar = disallowEmptyKey = true;
			mixed = zeroDatetime = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.2:
			zeroDatetime = disallowEmptyKey = true;
			mustScalar = mixed = moreDatetime = sFloat = inlineTable = false;
			break;
		case 0.1:
			zeroDatetime = disallowEmptyKey = true;
			mustScalar = mixed = moreDatetime = sFloat = inlineTable = false;
			break;
		default:
			throw RangeError(`TOML.parse(,specificationVersion)`);
	}
	switchRegExp(specificationVersion);
	
	if ( typeof multilineStringJoiner==='string' ) { useWhatToJoinMultilineString = multilineStringJoiner; }
	else if ( multilineStringJoiner===undefined$1 ) { useWhatToJoinMultilineString = null; }
	else { throw TypeError(`TOML.parse(,,multilineStringJoiner)`); }
	
	if ( useBigInt===undefined$1 || useBigInt===true ) { usingBigInt = true; }
	else if ( useBigInt===false ) { usingBigInt = false; }
	else {
		if ( typeof useBigInt!=='number' ) { throw TypeError(`TOML.parse(,,,useBigInt)`); }
		if ( !isSafeInteger(useBigInt) ) { throw RangeError(`TOML.parse(,,,useBigInt)`); }
		usingBigInt = null;
		useBigInt>=0
			? IntegerMinNumber = -( IntegerMaxNumber = useBigInt )
			: IntegerMaxNumber = -( IntegerMinNumber = useBigInt ) - 1;
	}
	
	if ( xOptions==null ) {
		Table = PlainTable;
		sError = allowLonger = enableNull = allowInlineTableMultilineAndTrailingCommaEvenNoComma = false;
		collect = collect_off;
	}
	else if ( typeof xOptions!=='object' ) {
		throw TypeError(`TOML.parse(,,,${typeof xOptions}`);
	}
	else {
		const { order, longer, exact, null: _null, multi, comment, string, literal, tag, ...unknown } = xOptions;
		const unknownNames = getOwnPropertyNames(unknown);
		if ( unknownNames.length ) { throw TypeError(`TOML.parse(,,,,{ ${unknownNames.join(', ')} })`); }
		Table = order ? OrderedTable : PlainTable;
		allowLonger = !longer;
		sError = !!exact;
		enableNull = !!_null;
		allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
		preserveComment = !!comment;
		disableDigit = !!string;
		preserveLiteral = !!literal;
		if ( tag ) {
			if ( typeof tag!=='function' ) { throw TypeError(`TOML.parse(,,,,xOptions.tag)`); }
			if ( !mixed ) { throw TypeError(`TOML.parse(,,,,xOptions) xOptions.tag needs at least TOML 1.0 to support mixed type array`); }
			processor = tag;
			collect = collect_on;
		}
		else { collect = collect_off; }
	}
	
	mixed
		? asNulls = asStrings = asTables = asArrays = asBooleans = asFloats = asIntegers = asOffsetDateTimes = asLocalDateTimes = asLocalDates = asLocalTimes = asMixed
		: ( { asNulls, asStrings, asTables, asArrays, asBooleans, asFloats, asIntegers, asOffsetDateTimes, asLocalDateTimes, asLocalDates, asLocalTimes } = AS_TYPED );
	
};

const previous                = Symbol('previous')       ;

              
	                                
		                                                  
		                                                  
	                  
  

const x =     (rootStack      )    => {
	let stack        = rootStack;
	let result = stack.next();
	if ( !result.done ) {
		result.value[previous] = stack;
		result = ( stack = result.value ).next();
		for ( ; ; ) {
			if ( result.done ) {
				if ( stack===rootStack ) { break; }
				stack = stack[previous] ;
				result = stack.next(result.value);
			}
			else {
				result.value[previous] = stack;
				result = ( stack = result.value ).next();
			}
		}
	}
	return result.value;
};

const _literal                = Symbol('_literal')       ;

const LiteralObject =                                                             (literal         , value                                   ) => {
	const object = Object$1(value)                           ;
	object[_literal] = literal;
	return object;
};

const arrays = new WeakSet       ();
const arrays_add = /*#__PURE__*/add.bind(arrays);
const isArray = /*#__PURE__*/has.bind(arrays)                                  ;

const OF_TABLES = false;
const STATICALLY = true;
const staticalArrays = new WeakSet       ();
const staticalArrays_add = /*#__PURE__*/add.bind(staticalArrays);
const isStatic = /*#__PURE__*/has.bind(staticalArrays)                             ;

const newArray = (isStatic         )        => {
	const array        = [];
	arrays_add(array);
	isStatic && staticalArrays_add(array);
	return array;
};

const fpc =                      (c   )    => {
	freeze$1(freeze$1(c).prototype);
	return c;
};

const _29_ = /(?:0[1-9]|1\d|2\d)/;
const _30_ = /(?:0[1-9]|[12]\d|30)/;
const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
const _23_ = /(?:[01]\d|2[0-3])/;
const _59_ = /[0-5]\d/;

const YMD = /*#__PURE__*/newRegExp`
	\d\d\d\d-
	(?:
		0
		(?:
			[13578]-${_31_}
			|
			[469]-${_30_}
			|
			2-${_29_}
		)
		|
		1
		(?:
			[02]-${_31_}
			|
			1-${_30_}
		)
	)
`.valueOf();

const HMS = /*#__PURE__*/newRegExp`
	${_23_}:${_59_}:${_59_}
`.valueOf();

const OFFSET$ = /(?:[Zz]|[+-]\d\d:\d\d)$/;

const { exec: Z_exec } = theRegExp           (/(([+-])\d\d):(\d\d)$/);

const { exec: OFFSET_DATETIME_exec } = /*#__PURE__*/newRegExp   `
	^
	${YMD}
	[Tt ]
	${HMS}
	(?:\.\d{1,3}(\d*?)0*)?
	(?:[Zz]|[+-]${_23_}:${_59_})
	$`.valueOf();

const { exec: OFFSET_DATETIME_ZERO_exec } = /*#__PURE__*/newRegExp   `
	^
	${YMD}
	[Tt ]
	${HMS}
	()
	[Zz]
	$`.valueOf();

const { test: IS_LOCAL_DATETIME } = /*#__PURE__*/newRegExp`
	^
	${YMD}
	[Tt ]
	${HMS}
	(?:\.\d+)?
	$`.valueOf();

const { test: IS_LOCAL_DATE } = /*#__PURE__*/newRegExp`
	^
	${YMD}
	$`.valueOf();

const { test: IS_LOCAL_TIME } = /*#__PURE__*/newRegExp`
	^
	${HMS}
	(?:\.\d+)?
	$`.valueOf();

const T = /[ t]/;
const DELIMITER_DOT = /[-T:.]/g;
const DOT_ZERO = /\.?0+$/;
const ZERO = /\.(\d*?)0+$/;
const zeroReplacer = (match        , p1        ) => p1;

const Datetime = /*#__PURE__*/( () => {
	const Datetime = function (            ) {
		return this;
	}                                 ;//expression? :undefined, literal? :undefined, dotValue? :undefined
	//                                > .setTime()
	//                                > .getTime() : Date.parse('T')
	// [Symbol.toPrimitive]('number') > .valueOf()
	//                                > .toISOString()
	const descriptors = Null$1(null)                                         ;
	{
		const descriptor = Null$1(null);
		for ( const key of Reflect_ownKeys(NativeDate.prototype                                         ) ) {
			key==='constructor' ||
			key==='toJSON' ||
			( descriptors[key] = descriptor );
		}
	}
	Datetime.prototype = preventExtensions(Object_create(NativeDate.prototype, descriptors));
	return freeze$1(Datetime);
} )();

                                        
                                      
                                      
                                      
                                      
                                      
                                       
                                     
                                            
                             
                             

const Value = (ISOString        )        => ISOString.replace(ZERO, zeroReplacer).replace(DELIMITER_DOT, '');

const leap = (literal        ) => literal.slice(5, 10)!=='02-29' || +literal.slice(0, 4)%4===0 && literal.slice(2, 4)!=='00';

const DATE             = /*#__PURE__*/defineProperties(new NativeDate(0), /*#__PURE__*/getOwnPropertyDescriptors(NativeDate.prototype));

const OffsetDateTime_ISOString                = Symbol('OffsetDateTime_ISOString')       ;
const OffsetDateTime_value                = Symbol('OffsetDateTime_value')       ;
const OffsetDateTime_use = (that                                     , $         = 0) => {
	DATE.setTime(+that[OffsetDateTime_value] + $);
	return DATE;
};
/*const OffsetDateTime_get = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number) => +that[OffsetDateTime_ISOString].slice(start, end);
const OffsetDateTime_set = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number, value :number) => {
	if ( end ) {
		const string = '' + value;
		const size = end - start;
		if ( string.length>size ) { throw RangeError(); }///
		that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[OffsetDateTime_ISOString].slice(end);
	}
	const time = parse(that[OffsetDateTime_ISOString]);
	return that[OffsetDateTime_value] = ( '' + time ).padStart(15, '0') + that[OffsetDateTime_value].slice(15);///time
};*///
const OffsetDateTime = /*#__PURE__*/fpc(class OffsetDateTime extends Datetime {
	
	[OffsetDateTime_ISOString]        ;
	[OffsetDateTime_value]       ;
	
	         valueOf (                    )        { return this[OffsetDateTime_value]; }
	toISOString (                    )         { return this[OffsetDateTime_ISOString]; }
	
	constructor (literal        ) {
		const { 1: more } = leap(literal) && ( zeroDatetime ? OFFSET_DATETIME_ZERO_exec : OFFSET_DATETIME_exec )(literal) || throws(SyntaxError(`Invalid Offset Date-Time ${literal}` + where(' at ')));
		super();
		this[OffsetDateTime_ISOString] = literal.replace(T, 'T').replace('z', 'Z');
		this[OffsetDateTime_value] = ( '' + parse$2(this[OffsetDateTime_ISOString]) ).padStart(15, '0') + ( more ? '.' + more : '' );
		return this;
	}
	
	getUTCFullYear (                    )           { return OffsetDateTime_use(this).getUTCFullYear(); }
	///get year () :FullYear { return OffsetDateTime_get(this, 0, 4); }
	///set year (value :FullYear) { OffsetDateTime_set(this, 0, 4, value); }
	getUTCMonth (                    )        { return OffsetDateTime_use(this).getUTCMonth(); }
	///get month () { return OffsetDateTime_get(this, 5, 7); }
	///set month (value) { OffsetDateTime_set(this, 5, 7, value); }
	getUTCDate (                    )       { return OffsetDateTime_use(this).getUTCDate(); }
	///get day () :Date { return OffsetDateTime_get(this, 8, 10); }
	///set day (value :Date) { OffsetDateTime_set(this, 8, 10, value); }
	
	getUTCHours (                    )        { return OffsetDateTime_use(this).getUTCHours(); }
	///get hour () :Hours { return OffsetDateTime_get(this, 11, 13); }
	///set hour (value :Hours) { OffsetDateTime_set(this, 11, 13, value); }
	getUTCMinutes (                    )          { return OffsetDateTime_use(this).getUTCMinutes(); }
	///get minute () :Minutes { return OffsetDateTime_get(this, 14, 16); }
	///set minute (value :Minutes) { OffsetDateTime_set(this, 14, 16, value); }
	getUTCSeconds (                    )          { return OffsetDateTime_use(this).getUTCSeconds(); }
	///get second () :Seconds { return OffsetDateTime_get(this, 17, 19); }
	///set second (value :Seconds) { OffsetDateTime_set(this, 17, 19, value); }
	getUTCMilliseconds (                    )               { return OffsetDateTime_use(this).getUTCMilliseconds(); }///
	///get millisecond () :Milliseconds { return +this[OffsetDateTime_value].slice(12, 15); }///
	/*set millisecond (value :Milliseconds) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
		OffsetDateTime_set(this, 0, 0, 0);
	}*///
	///get microsecond () :Milliseconds
	///set microsecond (value :Milliseconds)
	///get nanosecond () :Milliseconds
	///set nanosecond (value :Milliseconds)
	
	getUTCDay (                    )      { return OffsetDateTime_use(this).getUTCDay(); }
	///get dayOfWeek () { return OffsetDateTime_use(this, this.getTimezoneOffset()*60000).getUTCDay() || 7; }
	getTimezoneOffset (                    )                 {
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		return z ? +z[1]*60 + +( z[2] + z[3] ) : 0;
	}
	///get offset () { return this[OffsetDateTime_ISOString].endsWith('Z') ? 'Z' : this[OffsetDateTime_ISOString].slice(-6); }
	/*set offset (value) {
		this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, this[OffsetDateTime_ISOString].endsWith('Z') ? -1 : -6) + value;
		OffsetDateTime_set(this, 0, 0, 0);
	}*///
	getTime (                    )       { return +this[OffsetDateTime_value].slice(0, 15); }///
	/*setTime (this :OffsetDateTime, value :Time) :void {
		value = DATE.setTime(value);
		const z = Z_exec(this[OffsetDateTime_ISOString]);
		DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
		this[OffsetDateTime_ISOString] = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
		this[OffsetDateTime_value] = ( '' + value ).padStart(15, '0');
		///return value;
	}*/
	
});

const LocalDateTime_ISOString                = Symbol('LocalDateTime_ISOString')       ;
const LocalDateTime_value                = Symbol('LocalDateTime_value')       ;
const LocalDateTime_get = (that                                    , start        , end        ) => +that[LocalDateTime_ISOString].slice(start, end);
const LocalDateTime_set = (that                                    , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalDateTime_value] = Value(
		that[LocalDateTime_ISOString] = that[LocalDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDateTime_ISOString].slice(end)
	);
};
const LocalDateTime = /*#__PURE__*/fpc(class LocalDateTime extends Datetime {
	
	[LocalDateTime_ISOString]        ;
	[LocalDateTime_value]       ;
	
	         valueOf (                   )        { return this[LocalDateTime_value]; }
	toISOString (                   )         { return this[LocalDateTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATETIME(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date-Time ${literal}` + where(' at ')));
		super();
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = literal.replace(T, 'T')
		);
		return this;
	}
	
	getFullYear (                   )           { return LocalDateTime_get(this, 0, 4); }
	setFullYear (                     value          )       { LocalDateTime_set(this, 0, 4, value); }
	getMonth (                   )        { return LocalDateTime_get(this, 5, 7) - 1; }
	setMonth (                     value       )       { LocalDateTime_set(this, 5, 7, value + 1); }
	getDate (                   )       { return LocalDateTime_get(this, 8, 10); }
	setDate (                     value      )       { LocalDateTime_set(this, 8, 10, value); }
	
	getHours (                   )        { return LocalDateTime_get(this, 11, 13); }
	setHours (                     value       )       { LocalDateTime_set(this, 11, 13, value); }
	getMinutes (                   )          { return LocalDateTime_get(this, 14, 16); }
	setMinutes (                     value         )       { LocalDateTime_set(this, 14, 16, value); }
	getSeconds (                   )          { return LocalDateTime_get(this, 17, 19); }
	setSeconds (                     value         )       { LocalDateTime_set(this, 17, 19, value); }
	getMilliseconds (                   )               { return +this[LocalDateTime_value].slice(14, 17).padEnd(3, '0'); }///
	setMilliseconds (                     value              )       {
		this[LocalDateTime_value] = Value(
			this[LocalDateTime_ISOString] = this[LocalDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const LocalDate_ISOString                = Symbol('LocalDate_ISOString')       ;
const LocalDate_value                = Symbol('LocalDate_value')       ;
const LocalDate_get = (that                                , start        , end        ) => +that[LocalDate_ISOString].slice(start, end);
const LocalDate_set = (that                                , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalDate_value] = Value(
		that[LocalDate_ISOString] = that[LocalDate_ISOString].slice(0, start) + string.padStart(size, '0') + that[LocalDate_ISOString].slice(end)
	);
};
const LocalDate = /*#__PURE__*/fpc(class LocalDate extends Datetime {
	
	[LocalDate_ISOString]        ;
	[LocalDate_value]       ;
	
	         valueOf (               )        { return this[LocalDate_value]; }
	toISOString (               )         { return this[LocalDate_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_DATE(literal) && leap(literal) || throws(SyntaxError(`Invalid Local Date ${literal}` + where(' at ')));
		super();
		this[LocalDate_value] = Value(
			this[LocalDate_ISOString] = literal
		);
		return this;
	}
	
	getFullYear (               )           { return LocalDate_get(this, 0, 4); }
	setFullYear (                 value          )       { LocalDate_set(this, 0, 4, value); }
	getMonth (               )        { return LocalDate_get(this, 5, 7) - 1; }
	setMonth (                 value       )       { LocalDate_set(this, 5, 7, value + 1); }
	getDate (               )       { return LocalDate_get(this, 8, 10); }
	setDate (                 value      )       { LocalDate_set(this, 8, 10, value); }
	
});

const LocalTime_ISOString                = Symbol('LocalTime_ISOString')       ;
const LocalTime_value                = Symbol('LocalTime_value')       ;
const LocalTime_get = (that                                , start        , end        ) => +that[LocalTime_ISOString].slice(start, end);
const LocalTime_set = (that                                , start        , end        , value        )       => {
	const string = '' + value;
	const size = end - start;
	if ( string.length>size ) { throw RangeError(); }///
	that[LocalTime_value] = Value(
		that[LocalTime_ISOString] = that[LocalTime_ISOString].slice(0, start) + string.padStart(2, '0') + that[LocalTime_ISOString].slice(end)
	);
};
const LocalTime = /*#__PURE__*/fpc(class LocalTime extends Datetime {
	
	[LocalTime_ISOString]        ;
	[LocalTime_value]       ;
	
	         valueOf (               )        { return this[LocalTime_value]; }
	toISOString (               )         { return this[LocalTime_ISOString]; }
	
	constructor (literal        ) {
		IS_LOCAL_TIME(literal) || throws(SyntaxError(`Invalid Local Time ${literal}` + where(' at ')));
		super();
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = literal
		);
		return this;
	}
	
	getHours (               )        { return LocalTime_get(this, 0, 2); }
	setHours (                 value       )       { LocalTime_set(this, 0, 2, value); }
	getMinutes (               )          { return LocalTime_get(this, 3, 5); }
	setMinutes (                 value         )       { LocalTime_set(this, 3, 5, value); }
	getSeconds (               )          { return LocalTime_get(this, 6, 8); }
	setSeconds (                 value         )       { LocalTime_set(this, 6, 8, value); }
	getMilliseconds (               )               { return +this[LocalTime_value].slice(6, 9).padEnd(3, '0'); }///
	setMilliseconds (                 value              )       {
		this[LocalTime_value] = Value(
			this[LocalTime_ISOString] = this[LocalTime_ISOString].slice(0, 8) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' )
		);
	}
	
});

const ESCAPED_IN_SINGLE_LINE = /[^\\]+|\\(?:[\\"btnfr/]|u.{4}|U.{8})/gs;
const ESCAPED_IN_MULTI_LINE = /[^\n\\]+|\n|\\(?:[\t ]*\n[\t\n ]*|[\\"btnfr/]|u.{4}|U.{8})/gs;

const BasicString = (literal        )         => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_SINGLE_LINE) ;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index] ;
		if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode         = parseInt(part.slice(2), 16);
					mustScalar && 0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt(part.slice(2), 16);
					( mustScalar && 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ')));
					parts[index] = fromCodePoint(codePoint);
					break;
				case '/': parts[index] = '/'; break;
			}
		}
	}
	while ( ++index!==length );
	return parts.join('');
};

const MultilineBasicString = (literal        , useWhatToJoinMultilineString        , n        )         => {
	if ( !literal ) { return ''; }
	const parts = literal.match(ESCAPED_IN_MULTI_LINE) ;
	const { length } = parts;
	let index = 0;
	do {
		const part = parts[index] ;
		if ( part==='\n' ) {
			++n;
			parts[index] = useWhatToJoinMultilineString;
		}
		else if ( part[0]==='\\' ) {
			switch ( part[1] ) {
				case '\n':
				case ' ':
				case '\t':
					for ( let i = 0; i = part.indexOf('\n', i) + 1; ) { ++n; }
					parts[index] = '';
					break;
				case '\\': parts[index] = '\\'; break;
				case '"': parts[index] = '"'; break;
				case 'b': parts[index] = '\b'; break;
				case 't': parts[index] = '\t'; break;
				case 'n': parts[index] = '\n'; break;
				case 'f': parts[index] = '\f'; break;
				case 'r': parts[index] = '\r'; break;
				case 'u':
					const charCode         = parseInt(part.slice(2), 16);
					mustScalar && 0xD7FF<charCode && charCode<0xE000
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
					parts[index] = fromCharCode(charCode);
					break;
				case 'U':
					const codePoint         = parseInt(part.slice(2), 16);
					( mustScalar && 0xD7FF<codePoint && codePoint<0xE000 || 0x10FFFF<codePoint )
					&& throws(RangeError(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
					parts[index] = fromCodePoint(codePoint);
					break;
				case '/': parts[index] = '/'; break;
			}
		}
	}
	while ( ++index!==length );
	return parts.join('');
};

const INTEGER_D = /[-+]?(?:0|[1-9][_\d]*)/;
const { test: BAD_D } = /*#__PURE__*/newRegExp`_(?!\d)`.valueOf();
const { test: IS_D_INTEGER } = /*#__PURE__*/newRegExp`^${INTEGER_D}$`.valueOf();
const { test: IS_XOB_INTEGER } = theRegExp(/^0(?:x[\dA-Fa-f][_\dA-Fa-f]*|o[0-7][_0-7]*|b[01][_01]*)$/);
const { test: BAD_XOB } = /*#__PURE__*/newRegExp`_(?![\dA-Fa-f])`.valueOf();
const UNDERSCORES$1 = /_/g;
const UNDERSCORES_SIGN = /_|^[-+]/g;

const IS_INTEGER = (literal        )          => ( IS_D_INTEGER(literal) || /*options.xob && */IS_XOB_INTEGER(literal) ) && !BAD_XOB(literal);

const BigIntInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const bigInt         = literal[0]==='-'
		? -BigInt(literal.replace(UNDERSCORES_SIGN, ''))
		: BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	allowLonger
	||
	-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || -max-1n ) <= long <= ( max = 2n**(64n-1n)-1n || -min-1n )
	||
	throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const NumberInteger = (literal        )         => {
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const number = parseInt(literal.replace(UNDERSCORES$1, ''));
	isSafeInteger(number) || throws(RangeError(`Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` + where(' meet at ')));
	return number;
};

const Integer = (literal        )                  => {
	if ( usingBigInt===true ) { return BigIntInteger(literal); }
	if ( usingBigInt===false ) { return NumberInteger(literal); }
	IS_INTEGER(literal) || throws(SyntaxError(`Invalid Integer ${literal}` + where(' at ')));
	const number         = parseInt(literal.replace(UNDERSCORES$1, ''));
	if ( IntegerMinNumber<=number && number<=IntegerMaxNumber ) { return number; }
	const bigInt         = literal[0]==='-'
		? -BigInt(literal.replace(UNDERSCORES_SIGN, ''))
		: BigInt(literal.replace(UNDERSCORES_SIGN, ''));
	allowLonger
	||
	-9223372036854775808n<=bigInt && bigInt<=9223372036854775807n// ( min = -(2n**(64n-1n)) || -max-1n ) <= long <= ( max = 2n**(64n-1n)-1n || -min-1n )
	||
	throws(RangeError(`Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` + where(' meet at ')));
	return bigInt;
};

const _NaN = -NaN$1;
const _Infinity$1 = -Infinity;
const { test: IS_FLOAT } = /*#__PURE__*/newRegExp`
	^
	${INTEGER_D}
	(?:
		\.\d[_\d]*
		(?:[eE][-+]?\d[_\d]*)?
	|
		[eE][-+]?\d[_\d]*
	)
	$`.valueOf();
const UNDERSCORES = /_/g;
const { test: IS_ZERO } = theRegExp(/^[-+]?0(?:\.0+)?(?:[eE][-+]?0+)?$/);
const { exec: NORMALIZED } = theRegExp   (/^[-0]?(\d*)(?:\.(\d+))?(?:e\+?(-?\d+))?$/);
const { exec: ORIGINAL } = theRegExp   (/^[-+]?0?(\d*)(?:\.(\d*?)0*)?(?:[eE]\+?(-?\d+))?$/);

const Float = (literal        )         => {
	if ( !IS_FLOAT(literal) || BAD_D(literal) ) {
		if ( sFloat ) {
			if ( literal==='inf' || literal==='+inf' ) { return Infinity; }
			if ( literal==='-inf' ) { return _Infinity$1; }
			if ( literal==='nan' || literal==='+nan' ) { return NaN$1; }
			if ( literal==='-nan' ) { return _NaN; }
		}
		throw throws(SyntaxError(`Invalid Float ${literal}` + where(' at ')));
	}
	const withoutUnderscores         = literal.replace(UNDERSCORES, '');
	const number         = +withoutUnderscores;
	if ( sError ) {
		isFinite(number) || throws(RangeError(`Float ${literal} has been as big as inf` + where(' at ')));
		number || IS_ZERO(withoutUnderscores) || throws(RangeError(`Float ${literal} has been as little as ${literal[0]==='-' ? '-' : ''}0` + where(' at ')));
		const { 1: normalized_integer, 2: normalized_fractional = '', 3: normalized_exponent = '' } = NORMALIZED(number       ) ;
		const { 1: original_integer, 2: original_fractional = '', 3: original_exponent = '' } = ORIGINAL(withoutUnderscores) ;
		original_integer + original_fractional===normalized_integer + normalized_fractional
		&&
		original_exponent        - original_fractional.length===normalized_exponent        - normalized_fractional.length
		||
		throws(RangeError(`Float ${literal} has lost its exact and been ${number}` + where(' at ')));
	}
	return number;
};

const prepareTable = (table       , keys               )        => {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++] ;
		if ( key in table ) {
			table = table[key];
			if ( isTable(table) ) {
				isInline(table) && throws(Error(`Trying to define Table under Inline Table` + where(' at ')));
			}
			else if ( isArray(table) ) {
				isStatic(table) && throws(Error(`Trying to append value to Static Array` + where(' at ')));
				table = table[( table          ).length - 1];
			}
			else { throw throws(Error(`Trying to define Table under non-Table value` + where(' at '))); }
		}
		else {
			table = table[key] = new Table(IMPLICITLY);
			while ( index<length ) { table = table[keys[index++] ] = new Table(IMPLICITLY); }
			return table;
		}
	}
	return table;
};

const appendTable = (table       , finalKey        , asArrayItem         , tag        )        => {
	let lastTable       ;
	if ( asArrayItem ) {
		let arrayOfTables              ;
		if ( finalKey in table ) { isArray(arrayOfTables = table[finalKey]) && !isStatic(arrayOfTables) || throws(Error(`Trying to push Table to non-ArrayOfTables value` + where(' at '))); }
		else { arrayOfTables = table[finalKey] = newArray(OF_TABLES); }
		tag && collect(tag, arrayOfTables, table, finalKey);
		arrayOfTables[arrayOfTables.length] = lastTable = new Table(DIRECTLY);
	}
	else {
		if ( finalKey in table ) {
			lastTable = table[finalKey];
			fromPair(lastTable) && throws(Error(`A table defined implicitly via key/value pair can not be accessed to via []` + where(', which at ')));
			directlyIfNot(lastTable) || throws(Error(`Duplicate Table definition` + where(' at ')));
		}
		else { table[finalKey] = lastTable = new Table(DIRECTLY); }
		tag && collect(tag, null, table, finalKey);
	}
	return lastTable;
};

const prepareInlineTable = (table       , keys          )        => {
	const { length } = keys;
	let index         = 0;
	while ( index<length ) {
		const key         = keys[index++] ;
		if ( key in table ) {
			table = table[key];
			isTable(table) || throws(Error(`Trying to assign property through non-Table value` + where(' at ')));
			isInline(table) && throws(Error(`Trying to assign property through static Inline Table` + where(' at ')));
			fromPair(table) || throws(Error(`A table defined implicitly via [] can not be accessed to via key/value pair` + where(', which at ')));
		}
		else {
			table = table[key] = new Table(IMPLICITLY, PAIR);
			while ( index<length ) { table = table[keys[index++] ] = new Table(IMPLICITLY, PAIR); }
			return table;
		}
	}
	return table;
};

const checkLiteralString = (literal        )         => {
	__CONTROL_CHARACTER_EXCLUDE_test(literal) && throws(SyntaxError(`Control characters other than Tab are not permitted in a Literal String` + where(', which was found at ')));
	return literal;
};

const assignLiteralString = ( (table       , finalKey        , literal        )         => {
	if ( !literal.startsWith(`'''`) ) {
		const $ = LITERAL_STRING_exec(literal) ?? throws(SyntaxError(`Bad literal string` + where(' at ')));
		const value = checkLiteralString($[1]);
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, value.length + 2), value) : value;
		return $[2];
	}
	const $ = __MULTI_LINE_LITERAL_STRING_exec(literal.slice(3));
	if ( $ ) {
		const value = checkLiteralString($[1]) + $[2];
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, value.length + 6), value) : value;
		return $[3];
	}
	const start = new mark('Multi-line Literal String', literal.length);
	const leadingNewline = !( literal = literal.slice(3) );
	if ( leadingNewline ) {
		literal = start.must();
		const $ = __MULTI_LINE_LITERAL_STRING_exec(literal);
		if ( $ ) {
			const value = checkLiteralString($[1]) + $[2];
			table[finalKey] = preserveLiteral ? LiteralObject([ `'''`, literal.slice(0, value.length + 3) ], value) : value;
			return $[3];
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap();
	for ( const lines                          = [ checkLiteralString(literal) ]; ; ) {
		const line         = start.must();
		const $ = __MULTI_LINE_LITERAL_STRING_exec(line);
		if ( $ ) {
			lines[lines.length] = checkLiteralString($[1]) + $[2];
			const value = lines.join(useWhatToJoinMultilineString );
			if ( preserveLiteral ) {
				lines[lines.length - 1] += `'''`;
				leadingNewline ? lines.unshift(`'''`) : lines[0] = `'''${literal}`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return $[3];
		}
		lines[lines.length] = checkLiteralString(line);
	}
} )     
	                                                                       
	                                                                      
 ;

const assignBasicString = ( (table       , finalKey        , literal        )         => {
	if ( !literal.startsWith('"""') ) {
		const index = BASIC_STRING_exec_1_endIndex(literal);
		const value = BasicString(literal.slice(1, index));
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, index + 1), value) : value;
		return literal.slice(index + 1).replace(PRE_WHITESPACE, '');
	}
	let length = 3 + MULTI_LINE_BASIC_STRING_exec_0_length(literal.slice(3));
	if ( literal.length!==length ) {
		const $ = literal.slice(3, length);
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		const value = BasicString($) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
		table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, length), value) : value;
		return literal.slice(length).replace(PRE_WHITESPACE, '');
	}
	const start = new mark('Multi-line Basic String', length);
	const skipped        = ( literal = literal.slice(3) ) ? 0 : 1;
	if ( skipped ) {
		literal = start.must();
		let length = MULTI_LINE_BASIC_STRING_exec_0_length(literal);
		if ( literal.length!==length ) {
			const $ = literal.slice(0, length);
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
			const value = MultilineBasicString($, useWhatToJoinMultilineString , skipped) + ( literal.startsWith('"', length += 3) ? literal.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			table[finalKey] = preserveLiteral ? LiteralObject([ '"""', literal.slice(0, length) ], value) : value;
			return literal.slice(length).replace(PRE_WHITESPACE, '');
		}
	}
	useWhatToJoinMultilineString ?? start.nowrap();
	ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal + '\n') || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
	for ( const lines                          = [ literal ]; ; ) {
		const line         = start.must();
		let length = MULTI_LINE_BASIC_STRING_exec_0_length(line);
		if ( line.length!==length ) {
			const $ = line.slice(0, length);
			ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
			const value = MultilineBasicString(lines.join('\n') + '\n' + $, useWhatToJoinMultilineString , skipped) + ( line.startsWith('"', length += 3) ? line.startsWith('"', ++length) ? ( ++length, '""' ) : '"' : '' );
			if ( preserveLiteral ) {
				skipped ? lines.unshift('"""') : lines[0] = `"""${literal}`;
				lines[lines.length] = `${$}"""`;
				table[finalKey] = LiteralObject(lines, value);
			}
			else { table[finalKey] = value; }
			return line.slice(length).replace(PRE_WHITESPACE, '');
		}
		ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line + '\n') || throws(SyntaxError(`Bad multi-line basic string` + where(' at ')));
		lines[lines.length] = line;
	}
} )     
	                                                                       
	                                                                      
 ;

const KEYS = /*#__PURE__*/Null$1        (null);
const commentFor = (key        )         => KEYS[key] ?? ( KEYS[key] = Symbol(key) );
const commentForThis                = Symbol('this')       ;

const { test: includesNewline } = theRegExp(/\r?\n/g);
const getCOMMENT = (table                                            , keyComment        )                     => {
	if ( keyComment in table ) {
		const comment = table[keyComment];
		if ( typeof comment!=='string' ) { throw TypeError(`the value of comment must be a string, while "${comment===null ? 'null' : typeof comment}" type is found`); }
		if ( includesNewline(comment) ) { throw SyntaxError(`the value of comment must be a string and can not include newline`); }
		return ` #${comment}`;///
	}
	return '';
};
const getComment =                    (table                                                                               , key   )                     => key in KEYS ? getCOMMENT(table, KEYS[key] ) : '';

const { test: IS_OFFSET$ } = theRegExp(OFFSET$);
const { test: IS_EMPTY } = theRegExp(/^\[[\t ]*]/);

const parseKeys = (rest        )                                                                => {
	let lineRest         = rest;
	const leadingKeys           = [];
	let lastIndex         = -1;
	for ( ; ; ) {
		lineRest || throws(SyntaxError(`Empty bare key` + where(' at ')));
		if ( lineRest[0]==='"' ) {
			const index         = BASIC_STRING_exec_1_endIndex(lineRest);
			leadingKeys[++lastIndex] = BasicString(lineRest.slice(1, index));
			lineRest = lineRest.slice(index + 1);
		}
		else {
			const isQuoted = lineRest[0]==='\'';
			const key         = ( ( isQuoted ? __LITERAL_KEY_exec : __BARE_KEY_exec )(lineRest) ?? throws(SyntaxError(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + where(' at '))) )[0];
			lineRest = lineRest.slice(key.length);
			leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key;
		}
		if ( IS_DOT_KEY(lineRest) ) { lineRest = lineRest.replace(DOT_KEY, ''); }
		else { break; }
	}
	if ( disableDigit ) {
		const keys = rest.slice(0, -lineRest.length);
		( isAmazing(keys) || enableNull && keys==='null' ) && throws(SyntaxError(`Bad bare key disabled by xOptions.string` + where(' at ')));
	}
	if ( disallowEmptyKey ) {
		let index         = lastIndex;
		do { leadingKeys[index]  || throws(SyntaxError(`Empty key is not allowed before TOML v0.5` + where(', which at '))); }
		while ( index-- );
	}
	const finalKey         = leadingKeys[lastIndex] ;
	leadingKeys.length = lastIndex;
	return { leadingKeys, finalKey, lineRest };
};

const push = (lastArray       , lineRest        )             => {
	if ( lineRest[0]==='<' ) {
		const { 1: tag } = { 2: lineRest } = _VALUE_PAIR_exec(lineRest) ?? throws(SyntaxError(`Bad tag ` + where(' at ')));
		collect(tag, lastArray, null);
		switch ( lineRest && lineRest[0] ) {
			case ',':
			case ']':
			case '':
			case '#':
				lastArray[lastArray.length] = undefined$1;
				return lineRest;
		}
	}
	switch ( lineRest[0] ) {
		case '\'':
			return assignLiteralString(asStrings(lastArray), lastArray.length, lineRest);
		case '"':
			return assignBasicString(asStrings(lastArray), lastArray.length, lineRest);
		case '{':
			inlineTable || throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + where(', which at ')));
			return equalInlineTable(asTables(lastArray), lastArray.length, lineRest);
		case '[':
			return equalStaticArray(asArrays(lastArray), lastArray.length, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) ?? throws(SyntaxError(`Bad atom value` + where(' at ')));
	if ( literal==='true' ) { asBooleans(lastArray)[lastArray.length] = true; }
	else if ( literal==='false' ) { asBooleans(lastArray)[lastArray.length] = false; }
	else if ( enableNull && literal==='null' ) { asNulls(lastArray)[lastArray.length] = null; }
	else if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				asOffsetDateTimes(lastArray)[lastArray.length] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
		}
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
		asLocalDates(lastArray)[lastArray.length] = new LocalDate(literal);
	}
	else {
		literal.includes('.') || literal.includes('n') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x')
			? asFloats(lastArray)[lastArray.length] = preserveLiteral ? LiteralObject(literal, Float(literal)) : Float(literal)
			: asIntegers(lastArray)[lastArray.length] = preserveLiteral ? LiteralObject(literal, Integer(literal)) : Integer(literal)
		;
	}
	return lineRest;
};

const equalStaticArray = function * (            table       , finalKey        , lineRest        )    {
	const staticArray        = table[finalKey] = newArray(STATICALLY);
	if ( IS_EMPTY(lineRest) ) {
		beInline(staticArray, lineRest[1]===']' ? 0 : 3);
		return lineRest.slice(lineRest.indexOf(']')).replace(SYM_WHITESPACE, '');
	}
	const start = new mark('Static Array', lineRest.length);
	let inline               = lineRest.startsWith('[ ') || lineRest.startsWith('[\t') ? 3 : 0;
	lineRest = lineRest.replace(SYM_WHITESPACE, '');
	while ( !lineRest || lineRest[0]==='#' ) {
		inline = null;
		lineRest = start.must().replace(PRE_WHITESPACE, '');
	}
	if ( lineRest[0]===']' ) {
		inline===null || beInline(staticArray, inline);
		return lineRest.replace(SYM_WHITESPACE, '');
	}
	for ( ; ; ) {
		const rest             = push(staticArray, lineRest);
		lineRest = typeof rest==='string' ? rest : yield rest;
		while ( !lineRest || lineRest[0]==='#' ) {
			inline = null;
			lineRest = start.must().replace(PRE_WHITESPACE, '');
		}
		if ( lineRest[0]===',' ) {
			lineRest = lineRest.replace(SYM_WHITESPACE, '');
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = null;
				lineRest = start.must().replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]===']' ) { break; }
		}
		else {
			if ( lineRest[0]===']' ) { break; }
			throw throws(SyntaxError(`Unexpect character in static array item value` + where(', which is found at ')));
		}
	}
	inline===null || beInline(staticArray, inline);
	return lineRest.replace(SYM_WHITESPACE, '');
}     
	                                                                   
	                                                                  
 ;

const equalInlineTable = function * (            table       , finalKey        , lineRest        )    {
	const inlineTable        = table[finalKey] = new Table(DIRECTLY, INLINE);
	if ( allowInlineTableMultilineAndTrailingCommaEvenNoComma ) {
		const start = new mark('Inline Table', lineRest.length);
		lineRest = lineRest.replace(SYM_WHITESPACE, '');
		let inline = true;
		for ( ; ; ) {
			while ( !lineRest || lineRest[0]==='#' ) {
				inline = false;
				lineRest = start.must().replace(PRE_WHITESPACE, '');
			}
			if ( lineRest[0]==='}' ) { break; }
			const forComment             = ForComment(inlineTable, lineRest);
			const rest             = assign(forComment);
			lineRest = typeof rest==='string' ? rest : yield rest;
			if ( lineRest ) {
				if ( lineRest[0]==='#' ) {
					if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = lineRest.slice(1); }
					inline = false;
					do { lineRest = start.must().replace(PRE_WHITESPACE, ''); }
					while ( !lineRest || lineRest[0]==='#' );
				}
			}
			else {
				inline = false;
				do { lineRest = start.must().replace(PRE_WHITESPACE, ''); }
				while ( !lineRest || lineRest[0]==='#' );
			}
			if ( lineRest[0]===',' ) { lineRest = lineRest.replace(SYM_WHITESPACE, ''); }
		}
		inline || beInline(inlineTable, false);
	}
	else {
		lineRest = lineRest.replace(SYM_WHITESPACE, '') || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
		if ( lineRest[0]!=='}' ) {
			for ( ; ; ) {
				lineRest[0]==='#' && throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
				const rest             = assign(ForComment(inlineTable, lineRest));
				lineRest = ( typeof rest==='string' ? rest : yield rest ) || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
				if ( lineRest[0]==='}' ) { break; }
				if ( lineRest[0]===',' ) {
					lineRest = lineRest.replace(SYM_WHITESPACE, '') || throws(SyntaxError(`Inline Table is intended to appear on a single line` + where(', which broken at ')));
					lineRest[0]==='}' && throws(SyntaxError(`The last property of an Inline Table can not have a trailing comma` + where(', which was found at ')));
				}
			}
		}
	}
	return lineRest.replace(SYM_WHITESPACE, '');
}     
	                                                                   
	                                                                  
 ;

                                                                                              
const ForComment = (lastInlineTable       , lineRest        )             => {
	const { leadingKeys, finalKey, tag } = { lineRest } = KEY_VALUE_PAIR_exec_groups(parseKeys(lineRest));
	return { table: prepareInlineTable(lastInlineTable, leadingKeys), finalKey, tag, lineRest };
};
const assign = ({ finalKey, tag, lineRest, table }            )             => {
	finalKey in table && throws(Error(`Duplicate property definition` + where(' at ')));
	if ( tag ) {
		collect(tag, null, table, finalKey);
		switch ( lineRest && lineRest[0] ) {
			case ',':
			case '}':
			case '':
			case '#':
				table[finalKey] = undefined$1;
				return lineRest;
		}
	}
	switch ( lineRest && lineRest[0] ) {
		case '\'':
			return assignLiteralString(table, finalKey, lineRest);
		case '"':
			return assignBasicString(table, finalKey, lineRest);
		case '{':
			inlineTable || throws(SyntaxError(`Inline Table is not allowed before TOML v0.4` + where(', which at ')));
			return equalInlineTable(table, finalKey, lineRest);
		case '[':
			return equalStaticArray(table, finalKey, lineRest);
	}
	const { 1: literal } = { 2: lineRest } = VALUE_REST_exec(lineRest) ?? throws(SyntaxError(`Bad atom value` + where(' at ')));
	if ( literal==='true' ) { table[finalKey] = true; }
	else if ( literal==='false' ) { table[finalKey] = false; }
	else if ( enableNull && literal==='null' ) { table[finalKey] = null; }
	else if ( literal.includes(':') ) {
		if ( literal.includes('-') ) {
			if ( IS_OFFSET$(literal) ) {
				table[finalKey] = new OffsetDateTime(literal);
			}
			else {
				moreDatetime || throws(SyntaxError(`Local Date-Time is not allowed before TOML v0.5` + where(', which at ')));
				table[finalKey] = new LocalDateTime(literal);
			}
		}
		else {
			moreDatetime || throws(SyntaxError(`Local Time is not allowed before TOML v0.5` + where(', which at ')));
			table[finalKey] = new LocalTime(literal);
		}
	}
	else if ( literal.indexOf('-')!==literal.lastIndexOf('-') && literal[0]!=='-' ) {
		moreDatetime || throws(SyntaxError(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
		table[finalKey] = new LocalDate(literal);
	}
	else {
		table[finalKey] = literal.includes('.') || literal.includes('n') || ( literal.includes('e') || literal.includes('E') ) && !literal.startsWith('0x')
			? preserveLiteral ? LiteralObject(literal, Float(literal)) : Float(literal)
			: preserveLiteral ? LiteralObject(literal, Integer(literal)) : Integer(literal)
		;
	}
	return lineRest;
};

const Root = ()        => {
	const rootTable        = new Table;
	let lastSectionTable        = rootTable;
	while ( rest() ) {
		const line         = next().replace(PRE_WHITESPACE, '');
		if ( line ) {
			if ( line[0]==='[' ) {
				const { leadingKeys, finalKey, asArrayItem, tag, lineRest } = TABLE_DEFINITION_exec_groups(line, parseKeys);
				const table        = prepareTable(rootTable, leadingKeys);
				if ( lineRest ) {
					lineRest[0]==='#' || throws(SyntaxError(`Unexpect charachtor after table header` + where(' at ')));
				}
				lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
				preserveComment && lineRest && ( lastSectionTable[commentForThis] = asArrayItem ? lineRest.slice(1) : table[commentFor(finalKey)] = lineRest.slice(1) );
			}
			else if ( line[0]==='#' ) {
				__CONTROL_CHARACTER_EXCLUDE_test(line) && throws(SyntaxError(`Control characters other than Tab are not permitted in comments` + where(', which was found at ')));
			}
			else {
				const forComment             = ForComment(lastSectionTable, line);
				let rest             = assign(forComment);
				typeof rest==='string' || ( rest = x        (rest) );
				if ( rest ) {
					rest[0]==='#' || throws(SyntaxError(`Unexpect charachtor after key/value pair` + where(' at ')));
					if ( preserveComment ) { forComment.table[commentFor(forComment.finalKey)] = rest.slice(1); }
				}
			}
		}
	}
	return rootTable;
};

const ESCAPED = /*#__PURE__*/Null$1        ({
	.../*#__PURE__*/Object_fromEntries(/*#__PURE__*/[ ...Array(0x20) ].map((_, charCode) => [ fromCharCode(charCode), '\\u' + charCode.toString(16).toUpperCase().padStart(4, '0') ])),
	'\b': '\\b',
	'\t': '\\t',
	'\n': '\\n',
	'\f': '\\f',
	'\r': '\\r',
	'"': '\\"',
	'"""': '""\\"',
	'\\': '\\\\',
	'\x7F': '\\u007F',
});

const { test: NEED_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F'\x7F]/);
const BY_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|./gs;
const { test: NEED_ESCAPE } = theRegExp(/^[\x00-\x08\x0A-\x1F"\\\x7F]/);
const singlelineString = (value        )                                => {
	if ( NEED_BASIC(value) ) {
		const parts = value.match(BY_ESCAPE) ;
		let index = parts.length;
		do { if ( NEED_ESCAPE(parts[--index] ) ) { parts[index] = ESCAPED[parts[index] ] ; } }
		while ( index );
		return `"${parts.join('')}"`;
	}
	return `'${value}'`;
};
const singlelineBasicString = (value        )                => {
	if ( value ) {
		const parts = value.match(BY_ESCAPE) ;
		let index = parts.length;
		do { if ( NEED_ESCAPE(parts[--index] ) ) { parts[index] = ESCAPED[parts[index] ] ; } }
		while ( index );
		return `"${parts.join('')}"`;
	}
	return `""`;
};

const { test: NEED_MULTILINE_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F\x7F]|'''/);
const { test: multilineNeedBasic } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]|'''/);
const { test: REAL_MULTILINE_ESCAPE } = theRegExp(/[\x00-\x08\x0A-\x1F\\\x7F]|"""/);
const BY_MULTILINE_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|"""|./gs;
const { test: NEED_MULTILINE_ESCAPE } = theRegExp(/^(?:[\x00-\x08\x0A-\x1F\\\x7F]|""")/);
const escape_multiline = (lines          , lineIndex        ) => {
	const line = lines[lineIndex] ;
	if ( REAL_MULTILINE_ESCAPE(line) ) {
		const parts = line.match(BY_MULTILINE_ESCAPE) ;
		let index = parts.length;
		do { if ( NEED_MULTILINE_ESCAPE(parts[--index] ) ) { parts[index] = ESCAPED[parts[index] ] ; } }
		while ( index );
		lines[lineIndex] = parts.join('');
	}
};

                                                    
const Lines = (lines                   )        => ( lines = [ '', ...lines ]          ).length===1 ? [ '', '' ] : lines         ;

const multilineString = (lines       )                                                                                  => {
	const lastIndex = lines.length - 1;
	let index = lastIndex;
	do { if ( NEED_MULTILINE_BASIC(lines[index] ) ) { break; } }
	while ( --index );
	if ( index ) {
		index = lastIndex;
		escape_multiline(lines, index);
		lines[index] += lines[0] = '"""';
		while ( --index ) { escape_multiline(lines, index); }
	}
	else { lines[lastIndex] += lines[0] = '\'\'\''; }
	return lines                                                                                   ;
};

const multilineBasicString = (lines       )                                         => {
	let index = lines.length - 1;
	escape_multiline(lines, index);
	lines[index] += lines[0] = '"""';
	while ( --index ) { escape_multiline(lines, index); }
	return lines                                          ;
};

const multilineLiteralString = (lines       )                                         => {
	lines[lines.length - 1] += lines[0] = '\'\'\'';
	return lines                                          ;
};

const _Infinity = -Infinity;

const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
const ensureFloat = (literal        ) => INTEGER_LIKE(literal) ? literal + '.0' : literal;

const float64Array = new Float64Array([ NaN$1 ]);
const uint8Array = new Uint8Array(float64Array.buffer);
const NaN_7 = uint8Array[7] ;

const float = NaN_7===new Uint8Array(new Float64Array([ -NaN$1 ]).buffer)[7] 
	? (value        ) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : 'nan'
	: (value        ) => value
		? value===Infinity ? 'inf' : value===_Infinity ? '-inf' : ensureFloat('' + value)
		: value===value ? is(value, 0) ? '0.0' : '-0.0' : ( float64Array[0] = value, uint8Array[7] )===NaN_7 ? 'nan' : '-nan';

const isDate = /*#__PURE__*/isPrototypeOf.bind(DATE$1)                                                ;

const { test: BARE } = theRegExp(/^[\w-]+$/);
const $Key$ = (key        )         => BARE(key) ? key : singlelineString(key);

const FIRST = /[^.]+/;
const literalString = (value        )                => `'${value}'`;
const $Keys = (keys        )         => isAmazing(keys) ? keys.replace(FIRST, literalString) : keys==='null' ? `'null'` : keys;

class TOMLSection extends Array         {
	
	                 document              ;
	
	constructor (document              ) {
		super();
		this.document = document;
		return this;
	}
	
	[Symbol.toPrimitive] () { return this.join(this.document.newline); }
	
	appendNewline () { this[this.length] = ''; }
	        set appendLine (source        ) { this[this.length] = source; }
	        set appendInline (source        ) { this[this.length - 1] += source; }   
	        set appendInlineIf (source        ) { source && ( this[this.length - 1] += source ); }///
	
	* assignBlock                           (documentKeys_                   , sectionKeys_                  , table   , tableKeys                            )    {
		const { document } = this;
		const { newlineUnderHeader, newlineUnderSectionButPair } = document;
		const newlineAfterDotted = sectionKeys_ ? document.newlineUnderPairButDotted : false;
		const newlineAfterPair = sectionKeys_ ? document.newlineUnderDotted : document.newlineUnderPair;
		for ( const tableKey of tableKeys ) {
			const value                 = table[tableKey] ;
			const $key$ = $Key$(tableKey);
			const documentKeys = documentKeys_ + $key$;
			if ( isArray$1(value) ) {
				const { length } = value;
				if ( length ) {
					let firstItem = value[0];
					if ( isSection(firstItem) ) {
						const tableHeader = `[[${documentKeys}]]`         ;
						const documentKeys_ = documentKeys + '.'                ;
						let index = 0;
						let table                 = firstItem;
						for ( ; ; ) {
							const section = document.appendSection();
							section[0] = tableHeader + getCOMMENT(table, commentForThis);
							if ( newlineUnderHeader ) {
								section[1] = '';
								yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
								newlineUnderSectionButPair && section.length!==2 && section.appendNewline();
							}
							else {
								yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
								newlineUnderSectionButPair && section.appendNewline();
							}
							if ( ++index===length ) { break; }
							table = ( value                           )[index] ;
							if ( !isSection(table) ) { throw TypeError(`the first table item marked by Section() means the parent array is an array of tables, which can not include other types or table not marked by Section() any more in the rest items`); }
						}
						continue;
					}
					else { let index = 1; while ( index!==length ) { if ( isSection(value[index++] ) ) { throw TypeError(`if an array is not array of tables, it can not include any table that marked by Section()`); } } }
				}
			}
			else {
				if ( isSection(value) ) {
					const section = document.appendSection();
					section[0] = `[${documentKeys}]${
						document.preferCommentForThis
							? getCOMMENT(value, commentForThis) || getComment(table, tableKey)
							: getComment(table, tableKey) || getCOMMENT(value, commentForThis)
					}`;
					if ( newlineUnderHeader ) {
						section[1] = '';
						yield section.assignBlock(documentKeys + '.'                , ``, value, getOwnPropertyNames(value));
						newlineUnderSectionButPair && section.length!==2 && section.appendNewline();
					}
					else {
						yield section.assignBlock(documentKeys + '.'                , ``, value, getOwnPropertyNames(value));
						newlineUnderSectionButPair && section.appendNewline();
					}
					continue;
				}
			}
			const sectionKeys = sectionKeys_ + $key$;
			this.appendLine = $Keys(sectionKeys) + ' = ';
			const valueKeysIfValueIsDottedTable = this.value('', value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				--this.length;
				yield this.assignBlock(documentKeys + '.'                , sectionKeys + '.'                , value                                   , valueKeysIfValueIsDottedTable);
				newlineAfterDotted && this.appendNewline();
			}
			else {
				this.appendInlineIf = getComment(table, tableKey);
				newlineAfterPair && this.appendNewline();
			}
		}
	}
	
	        value (indent        , value                , returnValueKeysIfValueIsDottedTable         )                  {
		switch ( typeof value ) {
			case 'object':
				if ( value===null ) {
					if ( this.document.nullDisabled ) { throw TypeError(`toml can not stringify "null" type value without truthy options.xNull`); }
					this.appendInline = 'null';
					break;
				}
				const inlineMode = ofInline(value);
				if ( isArray$1(value) ) {
					inlineMode===undefined$1
						? this.staticArray(indent, value)
						: this.singlelineArray(indent, value, this.document.$singlelineArray ?? inlineMode);
					break;
				}
				if ( inlineMode!==undefined$1 ) {
					inlineMode || this.document.multilineTableDisabled
						? this.inlineTable(indent, value                        )
						: this.multilineTable(indent, value                        , this.document.multilineTableComma);
					break;
				}
				if ( isDate(value) ) {
					this.appendInline = value.toISOString().replace('T', this.document.T).replace('Z', this.document.Z);
					break;
				}
				if ( _literal in value ) {
					const literal = ( value                                                                       )[_literal];
					if ( typeof literal==='string' ) { this.appendInline = literal; }
					else if ( isArray$1(literal) ) {
						const { length } = literal;
						if ( length ) {
							this.appendInline = literal[0];
							let index = 1;
							while ( index!==length ) { this.appendLine = literal[index++] ; }
						}
						else { throw TypeError(`literal value is broken`); }
					}
					else { throw TypeError(`literal value is broken`); }
					break;
				}
				if ( isString(value) ) { throw TypeError(`TOML.stringify refuse to handle [object String]`); }
				if ( isNumber(value) ) { throw TypeError(`TOML.stringify refuse to handle [object Number]`); }
				if ( isBigInt(value) ) { throw TypeError(`TOML.stringify refuse to handle [object BigInt]`); }
				if ( isBoolean(value) ) { throw TypeError(`TOML.stringify refuse to handle [object Boolean]`); }
				if ( returnValueKeysIfValueIsDottedTable ) {
					const keys = getOwnPropertyNames(value                        );
					if ( keys.length ) { return keys; }
					this.appendInline = '{ }';
				}
				else {
					this.inlineTable(indent, value                        );
				}
				break;
			case 'bigint':
				this.appendInline = '' + value;
				break;
			case 'number':
				this.appendInline = this.document.asInteger(value) ? is(value, -0) ? '-0' : '' + value : float(value);
				break;
			case 'string':
				this.appendInline = singlelineString(value);
				break;
			case 'boolean':
				this.appendInline = value ? 'true' : 'false';
				break;
			default:
				throw TypeError(`toml can not stringify "${typeof value}" type value`);
		}
		return null;
	}
	
	        singlelineArray (indent        , staticArray                      , inlineMode               ) {
		const { length } = staticArray;
		if ( length ) {
			this.appendInline = inlineMode&0b10 ? '[ ' : '[';
			this.value(indent, staticArray[0] , false);
			let index = 1;
			while ( index!==length ) {
				this.appendInline = ', ';
				this.value(indent, staticArray[index++] , false);
			}
			this.appendInline = inlineMode&0b10 ? ' ]' : ']';
		}
		else { this.appendInline = inlineMode&0b01 ? '[ ]' : '[]'; }
	}
	        staticArray (indent        , staticArray                      ) {
		this.appendInline = '[';
		const indent_ = indent + this.document.indent;
		const { length } = staticArray;
		let index = 0;
		while ( index!==length ) {
			this.appendLine = indent_;
			this.value(indent_, staticArray[index++] , false);
			this.appendInline = ',';
		}
		this.appendLine = indent + ']';
	}
	
	        inlineTable (indent        , inlineTable                      ) {
		const keys = getOwnPropertyNames(inlineTable);
		if ( keys.length ) {
			this.appendInline = '{ ';
			this.assignInline(indent, inlineTable, ``, keys);
			this[this.length - 1] = this[this.length - 1] .slice(0, -2) + ' }';
		}
		else { this.appendInline = '{ }'; }
	}
	        multilineTable (indent        , inlineTable                      , comma         ) {
		this.appendInline = '{';
		this.assignMultiline(indent, inlineTable, ``, getOwnPropertyNames(inlineTable), comma);
		this.appendLine = indent + '}';
	}
	        assignInline                                 (indent        , inlineTable   , keys_                   , keys                            ) {
		for ( const key of keys ) {
			const value                 = inlineTable[key] ;
			const keys = keys_ + $Key$(key);
			const before_value = this.appendInline = $Keys(keys) + ' = ';
			const valueKeysIfValueIsDottedTable = this.value(indent, value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				this[this.length - 1] = this[this.length - 1] .slice(0, -before_value.length);
				this.assignInline(indent, value                        , keys + '.'                , valueKeysIfValueIsDottedTable);
			}
			else { this.appendInline = ', '; }
		}
	}
	        assignMultiline                                 (indent        , inlineTable   , keys_                   , keys                            , comma         ) {
		const indent_ = indent + this.document.indent;
		for ( const key of keys ) {
			const value                 = inlineTable[key] ;
			const keys = keys_ + $Key$(key);
			this.appendLine = indent_ + $Keys(keys) + ' = ';
			const valueKeysIfValueIsDottedTable = this.value(indent_, value, true);
			if ( valueKeysIfValueIsDottedTable ) {
				--this.length;
				this.assignMultiline(indent, value                        , keys + '.'                , valueKeysIfValueIsDottedTable, comma);
			}
			else {
				comma
					? this.appendInline = ',' + getComment(inlineTable, key)
					: this.appendInlineIf = getComment(inlineTable, key);
			}
		}
	}
	
}

const name2code = /*#__PURE__*/Null$1({
	document: 0,
	section: 1,
	header: 2,
	pairs: 3,
	pair: 4,
}         );

const { test: IS_INDENT } = theRegExp(/^[\t ]*$/);

const return_false = () => false;

class TOMLDocument extends Array              {
	
	         get ['constructor'] () { return Array; }
	
	0 = new TOMLSection(this);
	
	         asInteger                                          = return_false;
	         newline                     = '';
	         newlineUnderSection         ;
	         newlineUnderSectionButPair         ;
	         newlineUnderHeader         ;
	         newlineUnderPair         ;
	         newlineUnderPairButDotted         ;
	         newlineUnderDotted         ;
	         indent         = '\t';
	         T                  = 'T';
	         Z            = 'Z';
	         nullDisabled          = true;
	         multilineTableDisabled          = true;
	         multilineTableComma          ;
	         preferCommentForThis          = false;
	         $singlelineArray                ;
	
	constructor (options                  ) {
		
		super();
		
		const integer = options?.integer;
		if ( integer===undefined ) ;
		else if ( integer===MAX_SAFE_INTEGER ) { this.asInteger = isSafeInteger; }
		else if ( typeof integer==='number' ) {
			if ( !isSafeInteger(integer) ) { throw RangeError(`TOML.stringify(,{integer}) can only be a safe integer`); }
			const max = integer>=0 ? integer : -integer - 1;
			const min = integer>=0 ? -integer : integer;
			this.asInteger = (number        ) => isSafeInteger(number) && min<=number && number<=max;
		}
		else { throw TypeError(`TOML.stringify(,{integer}) can only be number`); }
		
		const newline = options?.newline;
		if ( newline===undefined ) ;
		else if ( newline==='\n' || newline==='\r\n' ) { this.newline = newline; }
		else {
			throw typeof newline==='string'
				? SyntaxError(`TOML.stringify(,{newline}) can only be valid TOML newline`)
				: TypeError(`TOML.stringify(,{newline}) can only be string`);
		}
		
		const preferCommentFor = options?.preferCommentFor;
		if ( preferCommentFor===undefined ) ;
		else if ( preferCommentFor==='this' || preferCommentFor==='key' ) { this.preferCommentForThis = preferCommentFor==='this'; }
		else { throw TypeError(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`); }
		
		const around = name2code[options?.newlineAround ?? 'header'] ?? name2code.header;
		this.newlineUnderSection = around>0;
		this.newlineUnderSectionButPair = around===1 || around===2;
		this.newlineUnderHeader = around>1;
		this.newlineUnderPair = around>2;
		this.newlineUnderPairButDotted = around===3;
		this.newlineUnderDotted = around>3;
		
		const indent = options?.indent;
		if ( indent===undefined ) ;
		else if ( typeof indent==='string' ) {
			if ( !IS_INDENT(indent) ) { throw SyntaxError(`TOML.stringify(,{indent}) can only include Tab or Space`); }
			this.indent = indent;
		}
		else if ( typeof indent==='number' ) {
			if ( !isSafeInteger(indent) ) { throw RangeError(`TOML.stringify(,{indent:${indent}}) is out of range`); }
			this.indent = ' '.repeat(indent);
		}
		else { throw TypeError(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`); }
		
		const T = options?.T;
		if ( T===undefined ) ;
		else if ( T===' ' || T==='t' || T==='T' ) { this.T = T; }
		else { throw TypeError(`TOML.stringify(,{T}) can only be "T" or " " or "t"`); }
		
		const Z = options?.Z;
		if ( Z===undefined ) ;
		else if ( Z==='z' || Z==='Z' ) { this.Z = Z; }
		else { throw TypeError(`TOML.stringify(,{Z}) can only be "Z" or "z"`); }
		
		if ( options?.xNull ) { this.nullDisabled = false; }
		
		const xBeforeNewlineInMultilineTable = options?.xBeforeNewlineInMultilineTable;
		if ( xBeforeNewlineInMultilineTable===undefined ) ;
		else if ( xBeforeNewlineInMultilineTable==='' || xBeforeNewlineInMultilineTable===',' ) {
			this.multilineTableDisabled = false;
			this.multilineTableComma = !!xBeforeNewlineInMultilineTable;
		}
		else { throw TypeError(`TOML.stringify(,{xBeforeNewlineInMultilineTable}) can only be "" or ","`); }
		
		const $singlelineArray = options?.forceInlineArraySpacing;
		switch ( $singlelineArray ) {
			case undefined:
				break;
			case 0:
			case 1:
			case 2:
			case 3:
				this.$singlelineArray = $singlelineArray;
				break;
			default:
				throw typeof $singlelineArray==='number'
					? RangeError(`array inline mode must be 0 | 1 | 2 | 3, not including ${$singlelineArray}`)
					: TypeError(`array inline mode must be "number" type, not including ${$singlelineArray===null ? '"null"' : typeof $singlelineArray}`);
		}
		
		return this;
		
	}
	
	appendSection () { return this[this.length] = new TOMLSection(this); }
	
}

const linesFromStringify = new WeakSet                   ();
const beLinesFromStringify = /*#__PURE__*/add.bind(linesFromStringify);
const isLinesFromStringify = /*#__PURE__*/has.bind(linesFromStringify);
const stringify = (rootTable                , options                  )                    => {
	const document = new TOMLDocument(options);
	const section = document[0];
	section[0] = '';
	x      (section.assignBlock(``, ``, rootTable, getOwnPropertyNames(rootTable)));
	document.newlineUnderSectionButPair && section.length!==1 && section.appendNewline();
	document.newlineUnderSection || document[document.length - 1] .appendNewline();
	if ( document.newline ) { return document.join(document.newline); }
	const lines = document.flat();
	beLinesFromStringify(lines);
	return lines;
};
const multiline = /*#__PURE__*/( () => {
	const multiline = (value                                                   , string         ) =>
		typeof value==='string' ? LiteralObject(( multilineNeedBasic(value) ? multilineBasicString : multilineLiteralString )(( '\n' + value ).split('\n')         ), value) :
			isArray$1(value) ? LiteralObject(multilineString(Lines(value)), typeof string==='string' ? string : Null$1(null)) :
				multilineTable(value);
	multiline.basic = (lines                            , string         ) =>
		typeof lines==='string'
			? LiteralObject(multilineBasicString(( '\n' + lines ).split('\n')         ), lines)
			: LiteralObject(multilineBasicString(Lines(lines)), typeof string==='string' ? string : Null$1(null))
	;
	multiline.array = multilineArray;
	freeze$1(multiline);
	return multiline;
} )();
const basic = (value        ) => LiteralObject(singlelineBasicString(value), value);
const literal = (literal                               , ...chars          ) => {
	if ( typeof literal==='string' ) {
		if ( chars.length===1 ) {
			return LiteralObject(literal.includes('\n') ? literal.split('\n')                            : literal, chars[0]                            );
		}
	}
	else {
		let index = chars.length;
		if ( index ) {
			const { raw } = literal;
			literal = raw[index] ;
			while ( index ) { chars[--index] += raw[index] ; }
			literal = chars.join('') + literal;
		}
		else { literal = literal.raw[0] ; }
	}
	return LiteralObject(literal.includes('\n') ? literal.split('\n')                            : literal, Null$1(null));
};

const textDecoder = /*#__PURE__*/new TextDecoder('utf-8', Null$1({ fatal: true, ignoreBOM: false }));
const binary2string = (arrayBufferLike                          )         => {
	if ( isView(arrayBufferLike) ? arrayBufferLike.length!==arrayBufferLike.byteLength : !isArrayBuffer(arrayBufferLike) ) { throw TypeError(`only Uint8Array or ArrayBuffer is acceptable`); }
	try { return textDecoder.decode(arrayBufferLike); }
	catch { throw Error(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.`); }
};
const isBinaryLike = (value        )                                    => 'byteLength' in value;///

const { test: includesNonScalar } = theRegExp(/[\uD800-\uDFFF]/u);
const assertFulScalar = (string        )       => {
	if ( clearRegExp$1(includesNonScalar(string)) ) { throw Error(`A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.`); }
};

let holding          = false;

const parse = (source        , specificationVersion                                   , multilineStringJoiner                                                                                , useBigInt                            , xOptions                   )        => {
	let sourcePath         = '';
	if ( typeof source==='object' && source ) {
		if ( isArray$1(source) ) { throw TypeError(isLinesFromStringify(source) ? `TOML.parse(array from TOML.stringify(,{newline?}))` : `TOML.parse(array)`); }
		else if ( isBinaryLike(source) ) { source = binary2string(source); }
		else {
			sourcePath = source.path;
			if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.path)`); }
			const { data, require: req = typeof require==='function' ? require : undefined$1 } = source;
			if ( req ) {
				const dirname_ = req.resolve?.paths?.('')?.[0]?.replace(/node_modules$/, '');
				if ( dirname_ ) {
					sourcePath = ( req                                          )('path').resolve(dirname_, sourcePath);
					if ( typeof sourcePath!=='string' ) { throw TypeError(`TOML.parse(source.require('path').resolve)`); }
				}
				if ( data===undefined$1 ) {
					const data = ( req                                      )('fs').readFileSync(sourcePath);
					if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
					else { throw TypeError(`TOML.parse(source.require('fs').readFileSync)`); }
				}
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError(`TOML.parse(source.data)`); }
			}
			else {
				if ( data===undefined$1 ) { throw TypeError(`TOML.parse(source.data|source.require)`); }
				else if ( typeof data==='string' ) { assertFulScalar(source = data); }
				else if ( typeof data==='object' && data && isBinaryLike(data) ) { source = binary2string(data); }
				else { throw TypeError(`TOML.parse(source.data)`); }
			}
		}
	}
	else if ( typeof source==='string' ) { assertFulScalar(source); }
	else { throw TypeError(`TOML.parse(source)`); }
	if ( typeof multilineStringJoiner==='object' && multilineStringJoiner ) {
		if ( useBigInt!==undefined$1 || xOptions!==undefined$1 ) { throw TypeError(`options mode ? args mode`); }
		let joiner                    ;
		if ( hasOwn(multilineStringJoiner, 'joiner') ) { joiner = multilineStringJoiner.joiner; }
		if ( hasOwn(multilineStringJoiner, 'bigint') ) { useBigInt = multilineStringJoiner.bigint; }
		if ( hasOwn(multilineStringJoiner, 'x') ) { xOptions = multilineStringJoiner.x; }
		multilineStringJoiner = joiner;
	}
	let rootTable       ;
	let process                 ;
	if ( holding ) { throw Error(`parsing during parsing.`); }
	holding = true;
	try {
		use(specificationVersion, multilineStringJoiner, useBigInt, xOptions);
		todo(source, sourcePath);
		source && source[0]==='\uFEFF' && throws(TypeError(`TOML content (string) should not start with BOM (U+FEFF)` + where(' at ')));
		rootTable = Root();
		process = Process();
	}
	finally {
		done();//clearWeakSets();
		clearRegExp$1();
		clear();
		holding = false;
	}
	process?.();
	return rootTable;
};

const parse$1 = /*#__PURE__*/Object_assign(
	(source        , specificationVersion                                   , multilineStringJoiner         , useBigInt                   , xOptions                   ) =>
		typeof specificationVersion==='number'
			? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions)
			: parse(source, 1.0, specificationVersion          , multilineStringJoiner                                       , useBigInt                    )
	,
	{
		'1.0': (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
		1.0: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions),
		0.5: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions),
		0.4: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions),
		0.3: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions),
		0.2: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions),
		0.1: (source        , multilineStringJoiner         , useBigInt                   , xOptions                   ) => parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions),
	}
);

const _export = /*#__PURE__*/Default({
	version,
	parse: parse$1,
	stringify,
	Section, inline, multiline, basic, literal, commentFor, commentForThis,
	OffsetDateTime, LocalDateTime, LocalDate, LocalTime,
	isInline, isSection,
});

export { LocalDate, LocalDateTime, LocalTime, OffsetDateTime, Section, basic, commentFor, commentForThis, _export as default, inline, isInline, isSection, literal, multiline, parse$1 as parse, stringify, version };

/*¡ j-toml */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiaXRlcmF0b3IudHMiLCIuLi8uLi9qLW9yZGVyaWZ5L3NyYy9leHBvcnQudHMiLCJ0eXBlcy9ub24tYXRvbS50cyIsInR5cGVzL1RhYmxlLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwic3RyaW5naWZ5L3N0cmluZy50cyIsInN0cmluZ2lmeS9mbG9hdC50cyIsInN0cmluZ2lmeS9zZWN0aW9uLnRzIiwic3RyaW5naWZ5L2RvY3VtZW50LnRzIiwic3RyaW5naWZ5Ly50cyIsInBhcnNlLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjMzLjEnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5mdW5jdGlvbiBfX1BVUkVfXyAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7IHJldHVybiAvKiNfX1BVUkVfXyovX19QVVJFX18ocmUpOyB9O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gIVU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9ICFJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/ICFNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/ICFTIDogbnVsbDtcblx0cmV0dXJuIHJlO1xufVxuXG52YXIgUkVfYmluZCA9IGJpbmQgJiYgLyojX19QVVJFX18qL2JpbmQuYmluZChSRSAgICAgICApO1xuXG5mdW5jdGlvbiBDb250ZXh0IChmbGFncyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiB7XG5cdFx0VTogIWluY2x1ZGVzKGZsYWdzLCAndScpLFxuXHRcdEk6ICFpbmNsdWRlcyhmbGFncywgJ2knKSxcblx0XHRNOiAhaW5jbHVkZXMoZmxhZ3MsICdtJyksXG5cdFx0UzogIWluY2x1ZGVzKGZsYWdzLCAncycpLFxuXHRcdGZsYWdzOiBmbGFnc1xuXHR9O1xufVxuXG52YXIgQ09OVEVYVCAgICAgICAgICA9IC8qI19fUFVSRV9fKi9Db250ZXh0KCcnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJveHlcblx0PyAvKiNfX1BVUkVfXyovbmV3IFByb3h5KFJFLCB7XG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChSRSwgdGhpc0FyZywgYXJncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7IHJldHVybiBhcHBseShSRSwgQ09OVEVYVCwgYXJncyk7IH1cblx0XHQsXG5cdFx0Z2V0OiBmdW5jdGlvbiAoUkUsIGZsYWdzICAgICAgICApIHsgcmV0dXJuIFJFX2JpbmQoQ29udGV4dChmbGFncykpOyB9XG5cdFx0LFxuXHRcdGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdCxcblx0XHRwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0fSlcblx0OiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdFJFLmFwcGx5ID0gUkUuYXBwbHk7XG5cdFx0dmFyIG5ld1JlZ0V4cCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KENPTlRFWFQsIGFyZ3VtZW50cyAgICAgICApOyB9ICAgICAgIDtcblx0XHR2YXIgZCA9IDE7XG5cdFx0dmFyIGcgPSBkKjI7XG5cdFx0dmFyIGkgPSBnKjI7XG5cdFx0dmFyIG0gPSBpKjI7XG5cdFx0dmFyIHMgPSBpKjI7XG5cdFx0dmFyIHUgPSBzKjI7XG5cdFx0dmFyIHkgPSB1KjI7XG5cdFx0dmFyIGZsYWdzID0geSoyIC0gMTtcblx0XHR3aGlsZSAoIGZsYWdzLS0gKSB7XG5cdFx0XHQoIGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHRcdG5ld1JlZ0V4cFtjb250ZXh0LmZsYWdzXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyAgICAgICApOyB9O1xuXHRcdFx0fSApKENvbnRleHQoXG5cdFx0XHRcdCggZmxhZ3MgJiBkID8gJycgOiAnZCcgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBnID8gJycgOiAnZycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBpID8gJycgOiAnaScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBtID8gJycgOiAnbScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBzID8gJycgOiAncycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB1ID8gJycgOiAndScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB5ID8gJycgOiAneScgKVxuXHRcdFx0KSk7XG5cdFx0fVxuXHRcdHJldHVybiBmcmVlemUgPyBmcmVlemUobmV3UmVnRXhwKSA6IG5ld1JlZ0V4cDtcblx0fSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0UkVHRVhQLnRlc3QgPSBSRUdFWFAudGVzdDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG4vL2ltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG5leHBvcnQgY29uc3QgdGhyb3dzID0gKGVycm9yICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zLmNsZWFyKCk7IH1cblx0dGhyb3cgZXJyb3I7XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCwsLCxzb3VyY2VQYXRoKWApOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY2xhc3MgbWFyayB7XG5cdCAgICAgICAgICAgICAgICAgbGluZUluZGV4ID0gbGluZUluZGV4O1xuXHQgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHQgICAgICAgICAgICAgICAgIHJlc3RDb2x1bW4gICAgICAgIDtcblx0Y29uc3RydWN0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCByZXN0Q29sdW1uICAgICAgICApIHtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMucmVzdENvbHVtbiA9IHJlc3RDb2x1bW47XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0bXVzdCAoICAgICAgICAgICkgICAgICAgICB7XG5cdFx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7dGhpcy50eXBlfSBpcyBub3QgY2xvc2UgdW50aWwgdGhlIGVuZCBvZiB0aGUgZmlsZWAgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0XHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblx0fVxuXHRub3dyYXAgKCAgICAgICAgICApICAgICAgICB7XG5cdFx0dGhyb3cgdGhyb3dzKEVycm9yKGBUT01MLnBhcnNlKCwsbXVsdGlsaW5lU3RyaW5nSm9pbmVyKSBtdXN0IGJlIHBhc3NlZCwgd2hpbGUgdGhlIHNvdXJjZSBpbmNsdWRpbmcgbXVsdGktbGluZSBzdHJpbmdgICsgd2hlcmUoJywgd2hpY2ggc3RhcnRlZCBmcm9tICcsIHRoaXMubGluZUluZGV4LCBzb3VyY2VMaW5lc1t0aGlzLmxpbmVJbmRleF0gLmxlbmd0aCAtIHRoaXMucmVzdENvbHVtbiArIDEpKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB3aGVyZSA9IChwcmUgICAgICAgICwgcm93SW5kZXggICAgICAgICA9IGxpbmVJbmRleCwgY29sdW1uTnVtYmVyICAgICAgICAgPSAwKSAgICAgICAgID0+IHNvdXJjZUxpbmVzPT09Tk9ORSA/ICcnIDpcblx0c291cmNlUGF0aFxuXHRcdD8gYFxcbiAgICBhdCAoJHtzb3VyY2VQYXRofToke3Jvd0luZGV4ICsgMX06JHtjb2x1bW5OdW1iZXJ9KWBcblx0XHQ6IGAke3ByZX1saW5lICR7cm93SW5kZXggKyAxfTogJHtzb3VyY2VMaW5lc1tyb3dJbmRleF19YDtcblxuZXhwb3J0IGNvbnN0IGRvbmUgPSAoKSAgICAgICA9PiB7XG5cdHNvdXJjZVBhdGggPSAnJztcblx0c291cmNlTGluZXMgPSBOT05FO1xufTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5JztcbmltcG9ydCBPYmplY3RfYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduJztcbmltcG9ydCBPYmplY3RfY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBPYmplY3RfaXMgZnJvbSAnLk9iamVjdC5pcyc7XG5pbXBvcnQgT2JqZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5PYmplY3QuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgT2JqZWN0X2Zyb21FbnRyaWVzIGZyb20gJy5PYmplY3QuZnJvbUVudHJpZXMnO1xuaW1wb3J0IE9iamVjdF9mcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGhhc093biBmcm9tICcuT2JqZWN0Lmhhc093bj89JztcbmltcG9ydCBSZWZsZWN0X2FwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5JztcbmltcG9ydCBSZWZsZWN0X2NvbnN0cnVjdCBmcm9tICcuUmVmbGVjdC5jb25zdHJ1Y3QnO1xuaW1wb3J0IFJlZmxlY3RfZGVmaW5lUHJvcGVydHkgZnJvbSAnLlJlZmxlY3QuZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3RfZGVsZXRlUHJvcGVydHkgZnJvbSAnLlJlZmxlY3QuZGVsZXRlUHJvcGVydHknO1xuaW1wb3J0IFJlZmxlY3Rfb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgdmVyc2lvbiBmcm9tICcuL3ZlcnNpb24/dGV4dCc7XG5leHBvcnQgeyB2ZXJzaW9uIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgS2VlcGVyID0gICAgICgpICAgICAgPT4gW107XG5cbmNvbnN0IG5ld1dlYWtNYXAgPSAoKSA9PiB7XG5cdGNvbnN0IHdlYWtNYXAgPSBuZXcgV2Vha01hcDtcblx0d2Vha01hcC5oYXMgPSB3ZWFrTWFwLmhhcztcblx0d2Vha01hcC5nZXQgPSB3ZWFrTWFwLmdldDtcblx0d2Vha01hcC5zZXQgPSB3ZWFrTWFwLnNldDtcblx0cmV0dXJuIHdlYWtNYXA7XG59O1xuY29uc3QgdGFyZ2V0MmtlZXBlciA9IC8qI19fUFVSRV9fKi9uZXdXZWFrTWFwKCkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5jb25zdCBwcm94eTJ0YXJnZXQgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5jb25zdCB0YXJnZXQycHJveHkgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBFeHRlcm5hbERlc2NyaXB0b3IgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNvdXJjZSAgICkgICAgPT4ge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICA7XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ2VudW1lcmFibGUnKSApIHsgdGFyZ2V0LmVudW1lcmFibGUgPSBzb3VyY2UuZW51bWVyYWJsZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICdjb25maWd1cmFibGUnKSApIHsgdGFyZ2V0LmNvbmZpZ3VyYWJsZSA9IHNvdXJjZS5jb25maWd1cmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAndmFsdWUnKSApIHsgdGFyZ2V0LnZhbHVlID0gc291cmNlLnZhbHVlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3dyaXRhYmxlJykgKSB7IHRhcmdldC53cml0YWJsZSA9IHNvdXJjZS53cml0YWJsZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICdnZXQnKSApIHsgdGFyZ2V0LmdldCA9IHNvdXJjZS5nZXQ7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnc2V0JykgKSB7IHRhcmdldC5zZXQgPSBzb3VyY2Uuc2V0OyB9XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBoYW5kbGVycyAgICAgICAgICAgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7XG5cdGRlZmluZVByb3BlcnR5OiAgICAgICAgICAgICAgICAgKHRhcmdldCAgICAgICAgICAgICAgICAgICAsIGtleSAgICwgZGVzY3JpcHRvciAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBoYXNPd24odGFyZ2V0LCBrZXkpICkge1xuXHRcdFx0cmV0dXJuIFJlZmxlY3RfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgZGVzY3JpcHRvcikpO1xuXHRcdH1cblx0XHRpZiAoIFJlZmxlY3RfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgZGVzY3JpcHRvcikpICkge1xuXHRcdFx0Y29uc3Qga2VlcGVyID0gdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSA7XG5cdFx0XHRrZWVwZXJba2VlcGVyLmxlbmd0aF0gPSBrZXk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRkZWxldGVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICApICAgICAgICAgID0+IHtcblx0XHRpZiAoIFJlZmxlY3RfZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpICkge1xuXHRcdFx0Y29uc3Qga2VlcGVyID0gdGFyZ2V0MmtlZXBlci5nZXQodGFyZ2V0KSA7XG5cdFx0XHRjb25zdCBpbmRleCA9IGtlZXBlci5pbmRleE9mKGtleSk7XG5cdFx0XHRpbmRleDwwIHx8IC0ta2VlcGVyLmNvcHlXaXRoaW4oaW5kZXgsIGluZGV4ICsgMSkubGVuZ3RoO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0b3duS2V5czogICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICApID0+IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICAgLFxuXHRjb25zdHJ1Y3Q6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICAgLCBhcmdzICAgLCBuZXdUYXJnZXQgICAgICkgICAgPT4gb3JkZXJpZnkoUmVmbGVjdF9jb25zdHJ1Y3QodGFyZ2V0LCBhcmdzLCBuZXdUYXJnZXQpKSxcblx0YXBwbHk6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRoaXNBcmcgICAsIGFyZ3MgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfYXBwbHkodGFyZ2V0LCB0aGlzQXJnLCBhcmdzKSksXG59KTtcblxuY29uc3QgbmV3UHJveHkgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgLCBrZWVwZXIgICAgICAgICAgICkgICAgPT4ge1xuXHR0YXJnZXQya2VlcGVyLnNldCh0YXJnZXQsIGtlZXBlcik7XG5cdGNvbnN0IHByb3h5ID0gbmV3IFByb3h5ICAgKHRhcmdldCwgaGFuZGxlcnMpO1xuXHRwcm94eTJ0YXJnZXQuc2V0KHByb3h5LCB0YXJnZXQpO1xuXHRyZXR1cm4gcHJveHk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNPcmRlcmVkID0gKG9iamVjdCAgICAgICAgKSAgICAgICAgICA9PiBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCk7XG5leHBvcnQgY29uc3QgaXMgPSAob2JqZWN0MSAgICAgICAgLCBvYmplY3QyICAgICAgICApICAgICAgICAgID0+IE9iamVjdF9pcyhcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QxKSB8fCBvYmplY3QxLFxuXHRwcm94eTJ0YXJnZXQuZ2V0KG9iamVjdDIpIHx8IG9iamVjdDIsXG4pO1xuXG5leHBvcnQgY29uc3Qgb3JkZXJpZnkgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgPT4ge1xuXHRpZiAoIHByb3h5MnRhcmdldC5oYXMob2JqZWN0KSApIHsgcmV0dXJuIG9iamVjdDsgfVxuXHRsZXQgcHJveHkgPSB0YXJnZXQycHJveHkuZ2V0KG9iamVjdCkgICAgICAgICAgICAgICAgIDtcblx0aWYgKCBwcm94eSApIHsgcmV0dXJuIHByb3h5OyB9XG5cdHByb3h5ID0gbmV3UHJveHkob2JqZWN0LCBPYmplY3RfYXNzaWduKEtlZXBlciAgICAgICAgICAoKSwgUmVmbGVjdF9vd25LZXlzKG9iamVjdCkpKTtcblx0dGFyZ2V0MnByb3h5LnNldChvYmplY3QsIHByb3h5KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IHsgY3JlYXRlIH0gPSB7XG5cdGNyZWF0ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvdG8gICAgICAgICAgLCAuLi5kZXNjcmlwdG9yTWFwcyAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG5cdFx0Y29uc3Qga2VlcGVyID0gS2VlcGVyICAgICAgICAgICAoKTtcblx0XHRpZiAoIGRlc2NyaXB0b3JNYXBzLmxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGRlc2NyaXB0b3JNYXAgICAgID0gT2JqZWN0X2Fzc2lnbihuZXdQcm94eShPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgLCBrZWVwZXIpLCAuLi5kZXNjcmlwdG9yTWFwcyk7XG5cdFx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRcdGRlc2NyaXB0b3JNYXBba2V5XSA9IEV4dGVybmFsRGVzY3JpcHRvcihkZXNjcmlwdG9yTWFwW2tleV0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld1Byb3h5KE9iamVjdF9jcmVhdGUocHJvdG8sIGRlc2NyaXB0b3JNYXApICAgICAgICwga2VlcGVyICAgICAgICk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IHsgZGVmaW5lUHJvcGVydGllcyB9ID0ge1xuXHRkZWZpbmVQcm9wZXJ0aWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgLCBkZXNjcmlwdG9yTWFwICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0ZGVzY3JpcHRvck1hcCA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgZGVzY3JpcHRvck1hcCwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdFx0bGV0IGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRcdGRlc2NyaXB0b3JNYXBba2V5XSA9IEV4dGVybmFsRGVzY3JpcHRvcihkZXNjcmlwdG9yTWFwW2tleV0pO1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0X2RlZmluZVByb3BlcnRpZXMob3JkZXJpZnkob2JqZWN0KSwgZGVzY3JpcHRvck1hcCk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9ICAgICAgICAgICAgICAgICAgICAob2JqZWN0ICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Y29uc3Qga2VlcGVyID0gT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKTtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0bGV0IGluZGV4ID0gMDtcblx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdGRlc2NyaXB0b3JNYXBba2V5XSA9IE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwgT2JqZWN0X2dldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSkgKTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoZGVzY3JpcHRvck1hcCwga2VlcGVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBOdWxsID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gdGhyb3dDb25zdHJ1Y3RpbmcgKCkgICAgICAgIHsgdGhyb3cgVHlwZUVycm9yKGBTdXBlciBjb25zdHJ1Y3RvciBOdWxsIGNhbm5vdCBiZSBpbnZva2VkIHdpdGggJ25ldydgKTsgfVxuXHRmdW5jdGlvbiB0aHJvd0FwcGx5aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRob3V0ICduZXcnYCk7IH1cblx0Y29uc3QgTnVsbGlmeSA9IChjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA9PiB7XG5cdFx0ZGVsZXRlIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcjtcblx0XHRPYmplY3RfZnJlZXplKGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG5cdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHR9O1xuXHRmdW5jdGlvbiBOdWxsICggICAgICAgICAgIGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0cmV0dXJuIG5ldy50YXJnZXRcblx0XHRcdD8gbmV3LnRhcmdldD09PU51bGxcblx0XHRcdFx0PyAvKiNfX1BVUkVfXyovdGhyb3dDb25zdHJ1Y3RpbmcoKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi9uZXdQcm94eSh0aGlzLCBLZWVwZXIgICAgICgpKVxuXHRcdFx0OiB0eXBlb2YgY29uc3RydWN0b3I9PT0nZnVuY3Rpb24nXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL051bGxpZnkoY29uc3RydWN0b3IpXG5cdFx0XHRcdDogLyojX19QVVJFX18qL3Rocm93QXBwbHlpbmcoKTtcblx0fVxuXHQvL0B0cy1pZ25vcmVcblx0TnVsbC5wcm90b3R5cGUgPSBudWxsO1xuXHRPYmplY3RfZGVmaW5lUHJvcGVydHkoTnVsbCwgJ25hbWUnLCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIHsgdmFsdWU6ICcnLCBjb25maWd1cmFibGU6IGZhbHNlIH0pKTtcblx0Ly9kZWxldGUgTnVsbC5sZW5ndGg7XG5cdE9iamVjdF9mcmVlemUoTnVsbCk7XG5cdHJldHVybiBOdWxsO1xufSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuY29uc3QgREVGQVVMVCA9IC8qI19fUFVSRV9fKi9PYmplY3RfYXNzaWduKGNsYXNzIGV4dGVuZHMgbnVsbCB7IHdyaXRhYmxlICgpIHt9IGVudW1lcmFibGUgKCkge30gY29uZmlndXJhYmxlICgpIHt9IH0ucHJvdG90eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHtcblx0Y29uc3RydWN0b3I6IHVuZGVmaW5lZCxcblx0d3JpdGFibGU6IHRydWUsXG5cdGVudW1lcmFibGU6IHRydWUsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbn0pO1xuZXhwb3J0IGNvbnN0IGZyb21FbnRyaWVzID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbnRyaWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHByb3RvICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2Zyb21FbnRyaWVzKGVudHJpZXMpO1xuXHRjb25zdCBrZWVwZXIgICAgICAgICAgICA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgKCksIFJlZmxlY3Rfb3duS2V5cyh0YXJnZXQpKTtcblx0aWYgKCBwcm90bz09PXVuZGVmaW5lZCApIHsgcmV0dXJuIG5ld1Byb3h5KHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgLCBrZWVwZXIpOyB9XG5cdGlmICggcHJvdG89PT1udWxsICkgeyByZXR1cm4gbmV3UHJveHkoT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKHByb3RvKSwgdGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgLCBrZWVwZXIpOyB9XG5cdGNvbnN0IGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHQoIGRlc2NyaXB0b3JNYXBba2V5XSA9IE9iamVjdF9jcmVhdGUoREVGQVVMVCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS52YWx1ZSA9IHRhcmdldFtrZXldO1xuXHR9XG5cdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAgICAgICAgICAgICAgICAgLCBrZWVwZXIpO1xufTtcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL0RlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRpc09yZGVyZWQsXG5cdGlzLFxuXHRvcmRlcmlmeSxcblx0Y3JlYXRlLFxuXHRkZWZpbmVQcm9wZXJ0aWVzLFxuXHROdWxsLFxuXHRmcm9tRW50cmllcyxcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxcbn0pO1xuIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy5XZWFrTWFwJztcbmltcG9ydCBzZXRfaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IHNldF9hZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5pbXBvcnQgc2V0X2RlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBtYXBfaGFzIGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IG1hcF9nZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLmdldCc7XG5pbXBvcnQgbWFwX3NldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcbmltcG9ydCBtYXBfZGVsIGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5kZWxldGUnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuY29uc3QgSU5MSU5FUyA9IG5ldyBXZWFrTWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCk7XG5jb25zdCBTRUNUSU9OUyA9IG5ldyBXZWFrU2V0ICAgICAgICAgICAgICAgICgpO1xuXG5jb25zdCBkZUlubGluZSA9IC8qI19fUFVSRV9fKi9tYXBfZGVsLmJpbmQoSU5MSU5FUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5jb25zdCBkZVNlY3Rpb24gPSAvKiNfX1BVUkVfXyovc2V0X2RlbC5iaW5kKFNFQ1RJT05TKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgaXNJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2hhcy5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3Qgb2ZJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2dldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBiZUlubGluZSA9IC8qI19fUFVSRV9fKi9tYXBfc2V0LmJpbmQoSU5MSU5FUykgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuZXhwb3J0IGNvbnN0IGlubGluZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgLCBtb2RlICAgICAgICAgICAgICAgICwgbG9vcGluZyAgICAgICAgICkgICAgPT4ge1xuXHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdGlmICggbG9vcGluZyApIHsgbW9kZSA9IDM7IH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICggbW9kZT09PXVuZGVmaW5lZCApIHsgbW9kZSA9IDM7IH1cblx0XHRcdGVsc2UgaWYgKCBtb2RlIT09MCAmJiBtb2RlIT09MSAmJiBtb2RlIT09MiAmJiBtb2RlIT09MyApIHtcblx0XHRcdFx0dGhyb3cgdHlwZW9mIG1vZGU9PT0nbnVtYmVyJ1xuXHRcdFx0XHRcdD8gUmFuZ2VFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSAwIHwgMSB8IDIgfCAzLCBub3QgaW5jbHVkaW5nICR7bW9kZX1gKVxuXHRcdFx0XHRcdDogVHlwZUVycm9yKGBhcnJheSBpbmxpbmUgbW9kZSBtdXN0IGJlIFwibnVtYmVyXCIgdHlwZSwgbm90IGluY2x1ZGluZyAke21vZGU9PT1udWxsID8gJ1wibnVsbFwiJyA6IHR5cGVvZiBtb2RlfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRiZUlubGluZSh2YWx1ZSwgbW9kZSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0YmVJbmxpbmUodmFsdWUsIHRydWUpO1xuXHRcdGRlU2VjdGlvbih2YWx1ZSk7XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVUYWJsZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICkgICAgPT4ge1xuXHRiZUlubGluZSh2YWx1ZSwgZmFsc2UpO1xuXHRkZVNlY3Rpb24odmFsdWUpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuZXhwb3J0IGNvbnN0IG11bHRpbGluZUFycmF5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0ZGVJbmxpbmUodmFsdWUpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9oYXMuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgYmVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9hZGQuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IFNlY3Rpb24gPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFibGUgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHRhYmxlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBhcnJheSBjYW4gbm90IGJlIHNlY3Rpb24sIG1heWJlIHlvdSB3YW50IHRvIHVzZSBpdCBvbiB0aGUgdGFibGVzIGluIGl0YCk7IH1cblx0YmVTZWN0aW9uKHRhYmxlKTtcblx0ZGVJbmxpbmUodGFibGUpO1xuXHRyZXR1cm4gdGFibGU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5pbXBvcnQgZGVsIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5kZWxldGUnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyBOdWxsIGFzIG9yZGVyaWZ5X051bGwgfSBmcm9tICdAbHRkL2otb3JkZXJpZnknO1xuXG5pbXBvcnQgeyBiZUlubGluZSwgYmVTZWN0aW9uIH0gZnJvbSAnLi9ub24tYXRvbSc7XG5cbmV4cG9ydCB7IGlzSW5saW5lIH0gZnJvbSAnLi9ub24tYXRvbSc7XG5leHBvcnQgY29uc3QgSU5MSU5FID0gdHJ1ZTtcblxuY29uc3QgdGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCB0YWJsZXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHRhYmxlcyk7XG5leHBvcnQgY29uc3QgaXNUYWJsZSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZCh0YWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuY29uc3QgaW1wbGljaXRUYWJsZXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IGltcGxpY2l0VGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChpbXBsaWNpdFRhYmxlcyk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19kZWwgPSAvKiNfX1BVUkVfXyovZGVsLmJpbmQoaW1wbGljaXRUYWJsZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgZGlyZWN0bHlJZk5vdCA9ICh0YWJsZSAgICAgICApICAgICAgICAgID0+IHtcblx0aWYgKCBpbXBsaWNpdFRhYmxlc19kZWwodGFibGUpICkge1xuXHRcdGJlU2VjdGlvbih0YWJsZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydCBjb25zdCBESVJFQ1RMWSA9IHRydWU7XG5leHBvcnQgY29uc3QgSU1QTElDSVRMWSA9IGZhbHNlO1xuXG5jb25zdCBwYWlycyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgcGFpcnNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKHBhaXJzKTtcbmV4cG9ydCBjb25zdCBmcm9tUGFpciA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChwYWlycykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBQQUlSID0gdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFBsYWluVGFibGUgPSAvKiNfX1BVUkVfXyovTnVsbChjbGFzcyBUYWJsZSBleHRlbmRzIE51bGwgICAgICB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdGNvbnN0cnVjdG9yIChpc0RpcmVjdCAgICAgICAgICAsIGlzSW5saW5lJGZyb21QYWlyICAgICAgICAgICkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGFibGVzX2FkZCh0aGlzKTtcblx0XHRpc0RpcmVjdFxuXHRcdFx0PyBpc0lubGluZSRmcm9tUGFpciA/IGJlSW5saW5lKHRoaXMsIHRydWUpIDogYmVTZWN0aW9uKHRoaXMpXG5cdFx0XHQ6ICggaXNJbmxpbmUkZnJvbVBhaXIgPyBwYWlyc19hZGQgOiBpbXBsaWNpdFRhYmxlc19hZGQgKSh0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBPcmRlcmVkVGFibGUgPSAvKiNfX1BVUkVfXyovTnVsbChjbGFzcyBUYWJsZSBleHRlbmRzIG9yZGVyaWZ5X051bGwgICAgICB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdGNvbnN0cnVjdG9yIChpc0RpcmVjdCAgICAgICAgICAsIGlzSW5saW5lJGZyb21QYWlyICAgICAgICAgICkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGFibGVzX2FkZCh0aGlzKTtcblx0XHRpc0RpcmVjdFxuXHRcdFx0PyBpc0lubGluZSRmcm9tUGFpciA/IGJlSW5saW5lKHRoaXMsIHRydWUpIDogYmVTZWN0aW9uKHRoaXMpXG5cdFx0XHQ6ICggaXNJbmxpbmUkZnJvbVBhaXIgPyBwYWlyc19hZGQgOiBpbXBsaWNpdFRhYmxlc19hZGQgKSh0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2AudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBWQUxVRV9SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IExJVEVSQUxfU1RSSU5HX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5jb25zdCB7IGV4ZWM6IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuZXhwb3J0XG5sZXQgX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cbmV4cG9ydCBjb25zdCBTWU1fV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYC52YWx1ZU9mKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCB7IGV4ZWM6IEtFWV9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgIGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogX1ZBTFVFX1BBSVJfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IGV4ZWM6IFRBR19SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJdK3xcXFxcLj98XCIoPyFcIlwiKVwiPy9zeSk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCA9IChfICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAvKk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HLmxhc3RJbmRleCA9ICovMDtcblx0d2hpbGUgKCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy50ZXN0KF8pICkgeyBsYXN0SW5kZXggPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0cmV0dXJuIGxhc3RJbmRleDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBUYWIgXFw8d3M+bmV3bGluZVxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIG5vdCBcXDx3cz5uZXdsaW5lXG5sZXQgX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpOy8vLyBvcD9cblxuY29uc3QgQkFTSUNfU1RSSU5HX1RBQl9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmxldCBfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAxO1xuXHR3aGlsZSAoIF9fQkFTSUNfU1RSSU5HLnRlc3QobGluZSkgKSB7IGxhc3RJbmRleCA9IF9fQkFTSUNfU1RSSU5HLmxhc3RJbmRleDsgfVxuXHRsYXN0SW5kZXghPT1saW5lLmxlbmd0aCAmJiBsaW5lW2xhc3RJbmRleF09PT0nXCInIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5leHBvcnRcbmNvbnN0IHsgdGVzdDogSVNfRE9UX0tFWSB9ID0gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLi8pO1xuZXhwb3J0XG5jb25zdCBET1RfS0VZID0gL15bIFxcdF0qXFwuWyBcXHRdKi87XG5jb25zdCB7IGV4ZWM6IEJBUkVfS0VZX1NUUklDVCB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKy8pO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9GUkVFIH0gPSB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKTtcbmV4cG9ydFxubGV0IF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5jb25zdCB7IGV4ZWM6IExJVEVSQUxfS0VZX19fXyB9ID0gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9ERUwgfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXSonLyk7XG5leHBvcnRcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChsaW5lUmVzdCAgICAgICAgLCBwYXJzZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgYXNBcnJheUl0ZW0gICAgICAgICAgPSBsaW5lUmVzdFsxXT09PSdbJztcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXkgfSA9IHsgbGluZVJlc3QgfSA9IHBhcnNlS2V5cyhsaW5lUmVzdCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSddJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdCggbGluZVJlc3QubGVuZ3RoPjEgPyBsaW5lUmVzdFsxXT09PSddJz09PWFzQXJyYXlJdGVtIDogIWFzQXJyYXlJdGVtICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShhc0FycmF5SXRlbSA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSc8JyApIHsgKCB7IDE6IHRhZywgMjogbGluZVJlc3QgfSA9IFRBR19SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzID0gKHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgYnV0IG1pc3NpbmcgYXQgJykpKTtcblx0dGFnIHx8IGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdIT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCB7IHRlc3Q6IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pO1xuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZdLyk7XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBOVU0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRiWzAxXVtfMDFdKlxuXHRcdHxcblx0XHRcdG9bMC03XVtfMC03XSpcblx0XHR8XG5cdFx0XHR4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qXG5cdFx0fFxuXHRcdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdFx0KVxuXHR8XG5cdFx0WzEtOV1bX1xcZF0qXG5cdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdHxcblx0XHRpbmZcblx0fFxuXHRcdG5hblxuXHQpXG5gLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfQU1BWklORyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0Xig/OlxuXHRcdC0/JHtOVU19XG5cdFx0KD86LSR7TlVNfSkqXG5cdHxcblx0XHR0cnVlXG5cdHxcblx0XHRmYWxzZVxuXHQpJFxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IEJBRF9EWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmV4cG9ydCBjb25zdCBpc0FtYXppbmcgPSAoa2V5cyAgICAgICAgKSAgICAgICAgICA9PiBJU19BTUFaSU5HKGtleXMpICYmICFCQURfRFhPQihrZXlzKTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBCaWdJbnQgZnJvbSAnLkJpZ0ludCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IHNldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuc2V0JztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eU5hbWVzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHsgUGxhaW5UYWJsZSwgT3JkZXJlZFRhYmxlIH0gZnJvbSAnLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMgZnJvbSAnLi9yZWdleHBzJztcblxuZXhwb3J0IGxldCBtdXN0U2NhbGFyICAgICAgICAgID0gdHJ1ZTtcblxuLyogb3B0aW9ucyAqL1xuXG5leHBvcnQgbGV0IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgICAgICAgICAgICAgICAgPSBudWxsO1xuZXhwb3J0IGxldCB1c2luZ0JpZ0ludCAgICAgICAgICAgICAgICAgPSB0cnVlO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWluTnVtYmVyICAgICAgICAgPSAwO1xuZXhwb3J0IGxldCBJbnRlZ2VyTWF4TnVtYmVyICAgICAgICAgPSAwO1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG4gIFxuZXhwb3J0IGxldCBwcmVzZXJ2ZUxpdGVyYWwgICAgICAgICA7XG5leHBvcnQgbGV0IHplcm9EYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgaW5saW5lVGFibGUgICAgICAgICA7XG5leHBvcnQgbGV0IG1vcmVEYXRldGltZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWxsb3dFbXB0eUtleSAgICAgICAgIDtcbi8vZXhwb3J0IGNvbnN0IHhvYiA6Ym9vbGVhbiA9IHRydWU7XG5leHBvcnQgbGV0IHNFcnJvciAgICAgICAgIDtcbmV4cG9ydCBsZXQgc0Zsb2F0ICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGxldCBUYWJsZSAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dMb25nZXIgICAgICAgICA7XG5leHBvcnQgbGV0IGVuYWJsZU51bGwgICAgICAgICA7XG5leHBvcnQgbGV0IGFsbG93SW5saW5lVGFibGVNdWx0aWxpbmVBbmRUcmFpbGluZ0NvbW1hRXZlbk5vQ29tbWEgICAgICAgICA7XG5leHBvcnQgbGV0IHByZXNlcnZlQ29tbWVudCAgICAgICAgIDtcbmV4cG9ydCBsZXQgZGlzYWJsZURpZ2l0ICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlcyA9IG5ldyBXZWFrTWFwICAgICAgICAgICAoKTtcbmNvbnN0IGFycmF5VHlwZXNfZ2V0ID0gLyojX19QVVJFX18qL2dldC5iaW5kKGFycmF5VHlwZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmNvbnN0IGFycmF5VHlwZXNfc2V0ID0gLyojX19QVVJFX18qL3NldC5iaW5kKGFycmF5VHlwZXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEFzID0gKCkgICAgID0+IHtcblx0Y29uc3QgYXMgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4ge1xuXHRcdGNvbnN0IGdvdCA9IGFycmF5VHlwZXNfZ2V0KGFycmF5KTtcblx0XHRnb3Rcblx0XHRcdD8gZ290PT09YXMgfHwgaXRlcmF0b3IudGhyb3dzKFR5cGVFcnJvcihgVHlwZXMgaW4gQXJyYXkgbXVzdCBiZSBzYW1lYCArIGl0ZXJhdG9yLndoZXJlKCcuIENoZWNrICcpKSlcblx0XHRcdDogYXJyYXlUeXBlc19zZXQoYXJyYXksIGFzKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cdHJldHVybiBhcztcbn07XG5jb25zdCBBU19UWVBFRCA9IHtcblx0YXNOdWxsczogQXMoKSxcblx0YXNTdHJpbmdzOiBBcygpLFxuXHRhc1RhYmxlczogQXMoKSxcblx0YXNBcnJheXM6IEFzKCksXG5cdGFzQm9vbGVhbnM6IEFzKCksXG5cdGFzRmxvYXRzOiBBcygpLFxuXHRhc0ludGVnZXJzOiBBcygpLFxuXHRhc09mZnNldERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVUaW1lczogQXMoKSxcblx0YXNMb2NhbERhdGVzOiBBcygpLFxuXHRhc0xvY2FsVGltZXM6IEFzKCksXG59O1xuY29uc3QgYXNNaXhlZCAgICAgPSAoYXJyYXkgICAgICAgKSAgICAgICAgPT4gYXJyYXk7XG5leHBvcnQgbGV0XG5cdGFzTnVsbHMgICAgLFxuXHRhc1N0cmluZ3MgICAgLFxuXHRhc1RhYmxlcyAgICAsXG5cdGFzQXJyYXlzICAgICxcblx0YXNCb29sZWFucyAgICAsXG5cdGFzRmxvYXRzICAgICxcblx0YXNJbnRlZ2VycyAgICAsXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVUaW1lcyAgICAsXG5cdGFzTG9jYWxEYXRlcyAgICAsXG5cdGFzTG9jYWxUaW1lcyAgICA7XG5cbi8qIHhPcHRpb25zLnRhZyAqL1xuXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgY29sbGVjdGlvbiAgICAgICAgICAgICAgPSBbXTtcbmxldCBjb2xsZWN0aW9uX2xlbmd0aCAgICAgICAgID0gMDtcbmNvbnN0IGNvbGxlY3Rfb24gPSAodGFnICAgICAgICAsIGFycmF5ICAgICAgICAgICAgICAsIHRhYmxlICAgICAgICAgICAgICAsIGtleSAgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBlYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRlYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRlYWNoLnRhYmxlID0gdGFibGU7XG5cdFx0ZWFjaC5rZXkgPSBrZXkgO1xuXHR9XG5cdGlmICggYXJyYXkgKSB7XG5cdFx0ZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdGVhY2guaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cdH1cblx0Y29sbGVjdGlvbltjb2xsZWN0aW9uX2xlbmd0aCsrXSA9IGVhY2g7XG59O1xuY29uc3QgY29sbGVjdF9vZmYgPSAoKSAgICAgICAgPT4geyB0aHJvdyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYHhPcHRpb25zLnRhZyBpcyBub3QgZW5hYmxlZCwgYnV0IGZvdW5kIHRhZyBzeW50YXhgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9O1xuZXhwb3J0IGxldCBjb2xsZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNvbGxlY3Rfb2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgY29uc3QgUHJvY2VzcyA9ICgpICAgICAgICAgID0+IHtcblx0aWYgKCBjb2xsZWN0aW9uX2xlbmd0aCApIHtcblx0XHRsZXQgaW5kZXggPSBjb2xsZWN0aW9uX2xlbmd0aDtcblx0XHRjb25zdCBwcm9jZXNzID0gcHJvY2Vzc29yIDtcblx0XHRjb25zdCBxdWV1ZSA9IGNvbGxlY3Rpb247XG5cdFx0Y29sbGVjdGlvbiA9IFtdO1xuXHRcdHJldHVybiAoKSAgICAgICA9PiB7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdHByb2Nlc3MocXVldWVbLS1pbmRleF0gKTtcblx0XHRcdFx0cXVldWUubGVuZ3RoID0gaW5kZXg7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAoIGluZGV4ICk7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpICAgICAgID0+IHtcblx0cHJvY2Vzc29yID0gbnVsbDtcblx0Y29sbGVjdGlvbi5sZW5ndGggPSBjb2xsZWN0aW9uX2xlbmd0aCA9IDA7XG5cdHplcm9EYXRldGltZSA9IGZhbHNlO1xuXHR1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdGxldCBtaXhlZCAgICAgICAgIDtcblx0c3dpdGNoICggc3BlY2lmaWNhdGlvblZlcnNpb24gKSB7XG5cdFx0Y2FzZSAxLjA6XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdG11c3RTY2FsYXIgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC40OlxuXHRcdFx0bXVzdFNjYWxhciA9IGRpc2FsbG93RW1wdHlLZXkgPSBpbmxpbmVUYWJsZSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjM6XG5cdFx0XHRtdXN0U2NhbGFyID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtaXhlZCA9IHplcm9EYXRldGltZSA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMjpcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSB0cnVlO1xuXHRcdFx0bXVzdFNjYWxhciA9IG1peGVkID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4xOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IFJhbmdlRXJyb3IoYFRPTUwucGFyc2UoLHNwZWNpZmljYXRpb25WZXJzaW9uKWApO1xuXHR9XG5cdHJlZ2V4cHMuc3dpdGNoUmVnRXhwKHNwZWNpZmljYXRpb25WZXJzaW9uKTtcblx0XG5cdGlmICggdHlwZW9mIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PSdzdHJpbmcnICkgeyB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyOyB9XG5cdGVsc2UgaWYgKCBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT11bmRlZmluZWQgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBudWxsOyB9XG5cdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoLCxtdWx0aWxpbmVTdHJpbmdKb2luZXIpYCk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgsLCx1c2VCaWdJbnQpYCk7IH1cblx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKHVzZUJpZ0ludCkgKSB7IHRocm93IFJhbmdlRXJyb3IoYFRPTUwucGFyc2UoLCwsdXNlQmlnSW50KWApOyB9XG5cdFx0dXNpbmdCaWdJbnQgPSBudWxsO1xuXHRcdHVzZUJpZ0ludD49MFxuXHRcdFx0PyBJbnRlZ2VyTWluTnVtYmVyID0gLSggSW50ZWdlck1heE51bWJlciA9IHVzZUJpZ0ludCApXG5cdFx0XHQ6IEludGVnZXJNYXhOdW1iZXIgPSAtKCBJbnRlZ2VyTWluTnVtYmVyID0gdXNlQmlnSW50ICkgLSAxO1xuXHR9XG5cdFxuXHRpZiAoIHhPcHRpb25zPT1udWxsICkge1xuXHRcdFRhYmxlID0gUGxhaW5UYWJsZTtcblx0XHRzRXJyb3IgPSBhbGxvd0xvbmdlciA9IGVuYWJsZU51bGwgPSBhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gZmFsc2U7XG5cdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb2ZmO1xuXHR9XG5cdGVsc2UgaWYgKCB0eXBlb2YgeE9wdGlvbnMhPT0nb2JqZWN0JyApIHtcblx0XHR0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoLCwsJHt0eXBlb2YgeE9wdGlvbnN9YCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Y29uc3QgeyBvcmRlciwgbG9uZ2VyLCBleGFjdCwgbnVsbDogX251bGwsIG11bHRpLCBjb21tZW50LCBzdHJpbmcsIGxpdGVyYWwsIHRhZywgLi4udW5rbm93biB9ID0geE9wdGlvbnM7XG5cdFx0Y29uc3QgdW5rbm93bk5hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyh1bmtub3duKTtcblx0XHRpZiAoIHVua25vd25OYW1lcy5sZW5ndGggKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgsLCwseyAke3Vua25vd25OYW1lcy5qb2luKCcsICcpfSB9KWApOyB9XG5cdFx0VGFibGUgPSBvcmRlciA/IE9yZGVyZWRUYWJsZSA6IFBsYWluVGFibGU7XG5cdFx0YWxsb3dMb25nZXIgPSAhbG9uZ2VyO1xuXHRcdHNFcnJvciA9ICEhZXhhY3Q7XG5cdFx0ZW5hYmxlTnVsbCA9ICEhX251bGw7XG5cdFx0YWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9ICEhbXVsdGk7XG5cdFx0cHJlc2VydmVDb21tZW50ID0gISFjb21tZW50O1xuXHRcdGRpc2FibGVEaWdpdCA9ICEhc3RyaW5nO1xuXHRcdHByZXNlcnZlTGl0ZXJhbCA9ICEhbGl0ZXJhbDtcblx0XHRpZiAoIHRhZyApIHtcblx0XHRcdGlmICggdHlwZW9mIHRhZyE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgsLCwseE9wdGlvbnMudGFnKWApOyB9XG5cdFx0XHRpZiAoICFtaXhlZCApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCwsLCx4T3B0aW9ucykgeE9wdGlvbnMudGFnIG5lZWRzIGF0IGxlYXN0IFRPTUwgMS4wIHRvIHN1cHBvcnQgbWl4ZWQgdHlwZSBhcnJheWApOyB9XG5cdFx0XHRwcm9jZXNzb3IgPSB0YWc7XG5cdFx0XHRjb2xsZWN0ID0gY29sbGVjdF9vbjtcblx0XHR9XG5cdFx0ZWxzZSB7IGNvbGxlY3QgPSBjb2xsZWN0X29mZjsgfVxuXHR9XG5cdFxuXHRtaXhlZFxuXHRcdD8gYXNOdWxscyA9IGFzU3RyaW5ncyA9IGFzVGFibGVzID0gYXNBcnJheXMgPSBhc0Jvb2xlYW5zID0gYXNGbG9hdHMgPSBhc0ludGVnZXJzID0gYXNPZmZzZXREYXRlVGltZXMgPSBhc0xvY2FsRGF0ZVRpbWVzID0gYXNMb2NhbERhdGVzID0gYXNMb2NhbFRpbWVzID0gYXNNaXhlZFxuXHRcdDogKCB7IGFzTnVsbHMsIGFzU3RyaW5ncywgYXNUYWJsZXMsIGFzQXJyYXlzLCBhc0Jvb2xlYW5zLCBhc0Zsb2F0cywgYXNJbnRlZ2VycywgYXNPZmZzZXREYXRlVGltZXMsIGFzTG9jYWxEYXRlVGltZXMsIGFzTG9jYWxEYXRlcywgYXNMb2NhbFRpbWVzIH0gPSBBU19UWVBFRCApO1xuXHRcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcblxuY29uc3QgcHJldmlvdXMgICAgICAgICAgICAgICAgPSBTeW1ib2woJ3ByZXZpb3VzJykgICAgICAgO1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG4gIFxuXG5leHBvcnQgY29uc3QgeCA9ICAgICAocm9vdFN0YWNrICAgICAgKSAgICA9PiB7XG5cdGxldCBzdGFjayAgICAgICAgPSByb290U3RhY2s7XG5cdGxldCByZXN1bHQgPSBzdGFjay5uZXh0KCk7XG5cdGlmICggIXJlc3VsdC5kb25lICkge1xuXHRcdHJlc3VsdC52YWx1ZVtwcmV2aW91c10gPSBzdGFjaztcblx0XHRyZXN1bHQgPSAoIHN0YWNrID0gcmVzdWx0LnZhbHVlICkubmV4dCgpO1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdGlmICggcmVzdWx0LmRvbmUgKSB7XG5cdFx0XHRcdGlmICggc3RhY2s9PT1yb290U3RhY2sgKSB7IGJyZWFrOyB9XG5cdFx0XHRcdHN0YWNrID0gc3RhY2tbcHJldmlvdXNdIDtcblx0XHRcdFx0cmVzdWx0ID0gc3RhY2submV4dChyZXN1bHQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZVtwcmV2aW91c10gPSBzdGFjaztcblx0XHRcdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdC52YWx1ZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgXG5cdCAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgXG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IE9iamVjdCBmcm9tICcuT2JqZWN0JztcblxuZXhwb3J0IGNvbnN0IF9saXRlcmFsICAgICAgICAgICAgICAgID0gU3ltYm9sKCdfbGl0ZXJhbCcpICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IExpdGVyYWxPYmplY3QgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGl0ZXJhbCAgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRjb25zdCBvYmplY3QgPSBPYmplY3QodmFsdWUpICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRvYmplY3RbX2xpdGVyYWxdID0gbGl0ZXJhbDtcblx0cmV0dXJuIG9iamVjdDtcbn07XG4iLCJpbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgaGFzIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5oYXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuYWRkJztcblxuY29uc3QgYXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBhcnJheXNfYWRkID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNBcnJheSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChhcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IE9GX1RBQkxFUyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFNUQVRJQ0FMTFkgPSB0cnVlO1xuY29uc3Qgc3RhdGljYWxBcnJheXMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChzdGF0aWNhbEFycmF5cyk7XG5leHBvcnQgY29uc3QgaXNTdGF0aWMgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoc3RhdGljYWxBcnJheXMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBuZXdBcnJheSA9IChpc1N0YXRpYyAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgYXJyYXkgICAgICAgID0gW107XG5cdGFycmF5c19hZGQoYXJyYXkpO1xuXHRpc1N0YXRpYyAmJiBzdGF0aWNhbEFycmF5c19hZGQoYXJyYXkpO1xuXHRyZXR1cm4gYXJyYXk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgXG4gXG4iLCJpbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBOYXRpdmVEYXRlIGZyb20gJy5EYXRlJztcbmltcG9ydCBwYXJzZSBmcm9tICcuRGF0ZS5wYXJzZSc7XG5pbXBvcnQgb3duS2V5cyBmcm9tICcuUmVmbGVjdC5vd25LZXlzJztcbi8vL2ltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGUnO1xuaW1wb3J0IHByZXZlbnRFeHRlbnNpb25zIGZyb20gJy5PYmplY3QucHJldmVudEV4dGVuc2lvbnMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMnO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0aWVzIGZyb20gJy5udWxsLmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyBuZXdSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuXG5jb25zdCBmcGMgPSAgICAgICAgICAgICAgICAgICAgICAoYyAgICkgICAgPT4ge1xuXHRmcmVlemUoZnJlZXplKGMpLnByb3RvdHlwZSk7XG5cdHJldHVybiBjO1xufTtcblxuY29uc3QgXzI5XyA9IC8oPzowWzEtOV18MVxcZHwyXFxkKS87XG5jb25zdCBfMzBfID0gLyg/OjBbMS05XXxbMTJdXFxkfDMwKS87XG5jb25zdCBfMzFfID0gLyg/OjBbMS05XXxbMTJdXFxkfDNbMDFdKS87XG5jb25zdCBfMjNfID0gLyg/OlswMV1cXGR8MlswLTNdKS87XG5jb25zdCBfNTlfID0gL1swLTVdXFxkLztcblxuY29uc3QgWU1EID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XFxkXFxkXFxkXFxkLVxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRbMTM1NzhdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdFs0NjldLSR7XzMwX31cblx0XHRcdHxcblx0XHRcdDItJHtfMjlffVxuXHRcdClcblx0XHR8XG5cdFx0MVxuXHRcdCg/OlxuXHRcdFx0WzAyXS0ke18zMV99XG5cdFx0XHR8XG5cdFx0XHQxLSR7XzMwX31cblx0XHQpXG5cdClcbmAudmFsdWVPZigpO1xuXG5jb25zdCBITVMgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHQke18yM199OiR7XzU5X306JHtfNTlffVxuYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCBPRkZTRVQkID0gLyg/Oltael18WystXVxcZFxcZDpcXGRcXGQpJC87XG5cbmNvbnN0IHsgZXhlYzogWl9leGVjIH0gPSB0aGVSZWdFeHAgICAgICAgICAgICgvKChbKy1dKVxcZFxcZCk6KFxcZFxcZCkkLyk7XG5cbmNvbnN0IHsgZXhlYzogT0ZGU0VUX0RBVEVUSU1FX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAgICBgXG5cdF5cblx0JHtZTUR9XG5cdFtUdCBdXG5cdCR7SE1TfVxuXHQoPzpcXC5cXGR7MSwzfShcXGQqPykwKik/XG5cdCg/Oltael18WystXSR7XzIzX306JHtfNTlffSlcblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IGV4ZWM6IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAgICBgXG5cdF5cblx0JHtZTUR9XG5cdFtUdCBdXG5cdCR7SE1TfVxuXHQoKVxuXHRbWnpdXG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9EQVRFVElNRSB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfREFURSB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX1RJTUUgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtITVN9XG5cdCg/OlxcLlxcZCspP1xuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IFQgPSAvWyB0XS87XG5jb25zdCBERUxJTUlURVJfRE9UID0gL1stVDouXS9nO1xuY29uc3QgRE9UX1pFUk8gPSAvXFwuPzArJC87XG5jb25zdCBaRVJPID0gL1xcLihcXGQqPykwKyQvO1xuY29uc3QgemVyb1JlcGxhY2VyID0gKG1hdGNoICAgICAgICAsIHAxICAgICAgICApID0+IHAxO1xuXG5jb25zdCBEYXRldGltZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgRGF0ZXRpbWUgPSBmdW5jdGlvbiAoICAgICAgICAgICAgKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Ly9leHByZXNzaW9uPyA6dW5kZWZpbmVkLCBsaXRlcmFsPyA6dW5kZWZpbmVkLCBkb3RWYWx1ZT8gOnVuZGVmaW5lZFxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAuc2V0VGltZSgpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5nZXRUaW1lKCkgOiBEYXRlLnBhcnNlKCdUJylcblx0Ly8gW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ251bWJlcicpID4gLnZhbHVlT2YoKVxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPiAudG9JU09TdHJpbmcoKVxuXHRjb25zdCBkZXNjcmlwdG9ycyA9IE51bGwobnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0e1xuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBOdWxsKG51bGwpO1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBvd25LZXlzKE5hdGl2ZURhdGUucHJvdG90eXBlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICkge1xuXHRcdFx0a2V5PT09J2NvbnN0cnVjdG9yJyB8fFxuXHRcdFx0a2V5PT09J3RvSlNPTicgfHxcblx0XHRcdCggZGVzY3JpcHRvcnNba2V5XSA9IGRlc2NyaXB0b3IgKTtcblx0XHR9XG5cdH1cblx0RGF0ZXRpbWUucHJvdG90eXBlID0gcHJldmVudEV4dGVuc2lvbnMoY3JlYXRlKE5hdGl2ZURhdGUucHJvdG90eXBlLCBkZXNjcmlwdG9ycykpO1xuXHRyZXR1cm4gZnJlZXplKERhdGV0aW1lKTtcbn0gKSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5jb25zdCBWYWx1ZSA9IChJU09TdHJpbmcgICAgICAgICkgICAgICAgID0+IElTT1N0cmluZy5yZXBsYWNlKFpFUk8sIHplcm9SZXBsYWNlcikucmVwbGFjZShERUxJTUlURVJfRE9ULCAnJyk7XG5cbmNvbnN0IGxlYXAgPSAobGl0ZXJhbCAgICAgICAgKSA9PiBsaXRlcmFsLnNsaWNlKDUsIDEwKSE9PScwMi0yOScgfHwgK2xpdGVyYWwuc2xpY2UoMCwgNCklND09PTAgJiYgbGl0ZXJhbC5zbGljZSgyLCA0KSE9PScwMCc7XG5cbmNvbnN0IERBVEUgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhuZXcgTmF0aXZlRGF0ZSgwKSwgLyojX19QVVJFX18qL2dldE93blByb3BlcnR5RGVzY3JpcHRvcnMoTmF0aXZlRGF0ZS5wcm90b3R5cGUpKTtcblxuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV91c2UgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICQgICAgICAgICA9IDApID0+IHtcblx0REFURS5zZXRUaW1lKCt0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSArICQpO1xuXHRyZXR1cm4gREFURTtcbn07XG4vKmNvbnN0IE9mZnNldERhdGVUaW1lX2dldCA9ICh0aGF0IDpJbnN0YW5jZVR5cGU8dHlwZW9mIE9mZnNldERhdGVUaW1lPiwgc3RhcnQgOm51bWJlciwgZW5kIDpudW1iZXIpID0+ICt0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBPZmZzZXREYXRlVGltZV9zZXQgPSAodGhhdCA6SW5zdGFuY2VUeXBlPHR5cGVvZiBPZmZzZXREYXRlVGltZT4sIHN0YXJ0IDpudW1iZXIsIGVuZCA6bnVtYmVyLCB2YWx1ZSA6bnVtYmVyKSA9PiB7XG5cdGlmICggZW5kICkge1xuXHRcdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdFx0Y29uc3Qgc2l6ZSA9IGVuZCAtIHN0YXJ0O1xuXHRcdGlmICggc3RyaW5nLmxlbmd0aD5zaXplICkgeyB0aHJvdyBSYW5nZUVycm9yKCk7IH0vLy9cblx0XHR0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgc3RyaW5nLnBhZFN0YXJ0KHNpemUsICcwJykgKyB0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKTtcblx0fVxuXHRjb25zdCB0aW1lID0gcGFyc2UodGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0cmV0dXJuIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gKCAnJyArIHRpbWUgKS5wYWRTdGFydCgxNSwgJzAnKSArIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE1KTsvLy90aW1lXG59OyovLy9cbmV4cG9ydCBjb25zdCBPZmZzZXREYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgT2Zmc2V0RGF0ZVRpbWUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdGNvbnN0IHsgMTogbW9yZSB9ID0gbGVhcChsaXRlcmFsKSAmJiAoIG9wdGlvbnMuemVyb0RhdGV0aW1lID8gT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyA6IE9GRlNFVF9EQVRFVElNRV9leGVjICkobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoVCwgJ1QnKS5yZXBsYWNlKCd6JywgJ1onKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSA9ICggJycgKyBwYXJzZSh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pICkucGFkU3RhcnQoMTUsICcwJykgKyAoIG1vcmUgPyAnLicgKyBtb3JlIDogJycgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0VVRDRnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0Z1bGxZZWFyKCk7IH1cblx0Ly8vZ2V0IHllYXIgKCkgOkZ1bGxZZWFyIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHQvLy9zZXQgeWVhciAodmFsdWUgOkZ1bGxZZWFyKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTW9udGggKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01vbnRoKCk7IH1cblx0Ly8vZ2V0IG1vbnRoICgpIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KTsgfVxuXHQvLy9zZXQgbW9udGggKHZhbHVlKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSk7IH1cblx0Z2V0VVRDRGF0ZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXRlKCk7IH1cblx0Ly8vZ2V0IGRheSAoKSA6RGF0ZSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdC8vL3NldCBkYXkgKHZhbHVlIDpEYXRlKSB7IE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxuXHRnZXRVVENIb3VycyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDSG91cnMoKTsgfVxuXHQvLy9nZXQgaG91ciAoKSA6SG91cnMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0Ly8vc2V0IGhvdXIgKHZhbHVlIDpIb3VycykgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTEsIDEzLCB2YWx1ZSk7IH1cblx0Z2V0VVRDTWludXRlcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNaW51dGVzKCk7IH1cblx0Ly8vZ2V0IG1pbnV0ZSAoKSA6TWludXRlcyB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTQsIDE2KTsgfVxuXHQvLy9zZXQgbWludXRlICh2YWx1ZSA6TWludXRlcykgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0VVRDU2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENTZWNvbmRzKCk7IH1cblx0Ly8vZ2V0IHNlY29uZCAoKSA6U2Vjb25kcyB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHQvLy9zZXQgc2Vjb25kICh2YWx1ZSA6U2Vjb25kcykgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMTcsIDE5LCB2YWx1ZSk7IH1cblx0Z2V0VVRDTWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7IH0vLy9cblx0Ly8vZ2V0IG1pbGxpc2Vjb25kICgpIDpNaWxsaXNlY29uZHMgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDEyLCAxNSk7IH0vLy9cblx0LypzZXQgbWlsbGlzZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnICkgKyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNlYXJjaChPRkZTRVQkKSk7XG5cdFx0T2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDApO1xuXHR9Ki8vL1xuXHQvLy9nZXQgbWljcm9zZWNvbmQgKCkgOk1pbGxpc2Vjb25kc1xuXHQvLy9zZXQgbWljcm9zZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpXG5cdC8vL2dldCBuYW5vc2Vjb25kICgpIDpNaWxsaXNlY29uZHNcblx0Ly8vc2V0IG5hbm9zZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpXG5cdFxuXHRnZXRVVENEYXkgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENEYXkoKTsgfVxuXHQvLy9nZXQgZGF5T2ZXZWVrICgpIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzLCB0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkqNjAwMDApLmdldFVUQ0RheSgpIHx8IDc7IH1cblx0Z2V0VGltZXpvbmVPZmZzZXQgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IHogPSBaX2V4ZWModGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddKTtcblx0XHRyZXR1cm4geiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDA7XG5cdH1cblx0Ly8vZ2V0IG9mZnNldCAoKSB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uZW5kc1dpdGgoJ1onKSA/ICdaJyA6IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgtNik7IH1cblx0LypzZXQgb2Zmc2V0ICh2YWx1ZSkge1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uZW5kc1dpdGgoJ1onKSA/IC0xIDogLTYpICsgdmFsdWU7XG5cdFx0T2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDApO1xuXHR9Ki8vL1xuXHRnZXRUaW1lICggICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gK3RoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDAsIDE1KTsgfS8vL1xuXHQvKnNldFRpbWUgKHRoaXMgOk9mZnNldERhdGVUaW1lLCB2YWx1ZSA6VGltZSkgOnZvaWQge1xuXHRcdHZhbHVlID0gREFURS5zZXRUaW1lKHZhbHVlKTtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0REFURS5zZXRUaW1lKHZhbHVlICsgKCB6ID8gK3pbMV0qNjAgKyArKCB6WzJdICsgelszXSApIDogMCApKjYwMDAwKTtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB6ID8gREFURS50b0lTT1N0cmluZygpLnNsaWNlKDAsIC0xKSArIHpbMF0gOiBEQVRFLnRvSVNPU3RyaW5nKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV92YWx1ZV0gPSAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgxNSwgJzAnKTtcblx0XHQvLy9yZXR1cm4gdmFsdWU7XG5cdH0qL1xuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVUaW1lX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX3ZhbHVlJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURVRJTUUobGl0ZXJhbCkgJiYgbGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSBsaXRlcmFsLnJlcGxhY2UoVCwgJ1QnKVxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEZ1bGxZZWFyICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0c2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCA1LCA3KSAtIDE7IH1cblx0c2V0TW9udGggKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCA1LCA3LCB2YWx1ZSArIDEpOyB9XG5cdGdldERhdGUgKCAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCA4LCAxMCwgdmFsdWUpOyB9XG5cdFxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDExLCAxMyk7IH1cblx0c2V0SG91cnMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxMSwgMTMsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAxNCwgMTYpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUpOyB9XG5cdGdldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTcsIDE5LCB2YWx1ZSk7IH1cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgIHsgcmV0dXJuICt0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE0LCAxNykucGFkRW5kKDMsICcwJyk7IH0vLy9cblx0c2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0dGhpc1tMb2NhbERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCAxOSkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKVxuXHRcdCk7XG5cdH1cblx0XG59KTtcblxuY29uc3QgTG9jYWxEYXRlX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlX0lTT1N0cmluZycpICAgICAgIDtcbmNvbnN0IExvY2FsRGF0ZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlX3ZhbHVlJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlX2dldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgKSA9PiArdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZV9zZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGFydCAgICAgICAgLCBlbmQgICAgICAgICwgdmFsdWUgICAgICAgICkgICAgICAgPT4ge1xuXHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRjb25zdCBzaXplID0gZW5kIC0gc3RhcnQ7XG5cdGlmICggc3RyaW5nLmxlbmd0aD5zaXplICkgeyB0aHJvdyBSYW5nZUVycm9yKCk7IH0vLy9cblx0dGhhdFtMb2NhbERhdGVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXSA9IHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoMCwgc3RhcnQpICsgc3RyaW5nLnBhZFN0YXJ0KHNpemUsICcwJykgKyB0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlID0gLyojX19QVVJFX18qL2ZwYyhjbGFzcyBMb2NhbERhdGUgZXh0ZW5kcyBEYXRldGltZSB7XG5cdFxuXHRbTG9jYWxEYXRlX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZV92YWx1ZV0gICAgICAgO1xuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXTsgfVxuXHRcblx0Y29uc3RydWN0b3IgKGxpdGVyYWwgICAgICAgICkge1xuXHRcdElTX0xPQ0FMX0RBVEUobGl0ZXJhbCkgJiYgbGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHQgICAgICAgICB2YWx1ZU9mICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsVGltZV92YWx1ZV07IH1cblx0dG9JU09TdHJpbmcgKCAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfVElNRShsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRIb3VycyAoICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxUaW1lX2dldCh0aGlzLCAwLCAyKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICApICAgICAgIHsgTG9jYWxUaW1lX3NldCh0aGlzLCAwLCAyLCB2YWx1ZSk7IH1cblx0Z2V0TWludXRlcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDMsIDUpOyB9XG5cdHNldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxUaW1lX3NldCh0aGlzLCAzLCA1LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDYsIDgpOyB9XG5cdHNldFNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxUaW1lX3NldCh0aGlzLCA2LCA4LCB2YWx1ZSk7IH1cblx0Z2V0TWlsbGlzZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxUaW1lX3ZhbHVlXS5zbGljZSg2LCA5KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgICAgICkgICAgICAge1xuXHRcdHRoaXNbTG9jYWxUaW1lX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgOCkgKyAoIHZhbHVlID8gKCAnLicgKyAoICcnICsgdmFsdWUgKS5wYWRTdGFydCgzLCAnMCcpICkucmVwbGFjZShET1RfWkVSTywgJycpIDogJycgKVxuXHRcdCk7XG5cdH1cblx0XG59KTtcbiIsImltcG9ydCBSYW5nZUVycm9yIGZyb20gJy5SYW5nZUVycm9yJztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGZyb21DaGFyQ29kZSBmcm9tICcuU3RyaW5nLmZyb21DaGFyQ29kZSc7XG5pbXBvcnQgZnJvbUNvZGVQb2ludCBmcm9tICcuU3RyaW5nLmZyb21Db2RlUG9pbnQnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG5jb25zdCBFU0NBUEVEX0lOX1NJTkdMRV9MSU5FID0gL1teXFxcXF0rfFxcXFwoPzpbXFxcXFwiYnRuZnIvXXx1Lns0fXxVLns4fSkvZ3M7XG5jb25zdCBFU0NBUEVEX0lOX01VTFRJX0xJTkUgPSAvW15cXG5cXFxcXSt8XFxufFxcXFwoPzpbXFx0IF0qXFxuW1xcdFxcbiBdKnxbXFxcXFwiYnRuZnIvXXx1Lns0fXxVLns4fSkvZ3M7XG5cbmV4cG9ydCBjb25zdCBCYXNpY1N0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsICkgeyByZXR1cm4gJyc7IH1cblx0Y29uc3QgcGFydHMgPSBsaXRlcmFsLm1hdGNoKEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUpIDtcblx0Y29uc3QgeyBsZW5ndGggfSA9IHBhcnRzO1xuXHRsZXQgaW5kZXggPSAwO1xuXHRkbyB7XG5cdFx0Y29uc3QgcGFydCA9IHBhcnRzW2luZGV4XSA7XG5cdFx0aWYgKCBwYXJ0WzBdPT09J1xcXFwnICkge1xuXHRcdFx0c3dpdGNoICggcGFydFsxXSApIHtcblx0XHRcdFx0Y2FzZSAnXFxcXCc6IHBhcnRzW2luZGV4XSA9ICdcXFxcJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1wiJzogcGFydHNbaW5kZXhdID0gJ1wiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2InOiBwYXJ0c1tpbmRleF0gPSAnXFxiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3QnOiBwYXJ0c1tpbmRleF0gPSAnXFx0JzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ24nOiBwYXJ0c1tpbmRleF0gPSAnXFxuJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2YnOiBwYXJ0c1tpbmRleF0gPSAnXFxmJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3InOiBwYXJ0c1tpbmRleF0gPSAnXFxyJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3UnOlxuXHRcdFx0XHRcdGNvbnN0IGNoYXJDb2RlICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0b3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjaGFyQ29kZSAmJiBjaGFyQ29kZTwweEUwMDBcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdVJzpcblx0XHRcdFx0XHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQoIG9wdGlvbnMubXVzdFNjYWxhciAmJiAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJy8nOiBwYXJ0c1tpbmRleF0gPSAnLyc7IGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR3aGlsZSAoICsraW5kZXghPT1sZW5ndGggKTtcblx0cmV0dXJuIHBhcnRzLmpvaW4oJycpO1xufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICwgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAgICAgICAgLCBuICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsICkgeyByZXR1cm4gJyc7IH1cblx0Y29uc3QgcGFydHMgPSBsaXRlcmFsLm1hdGNoKEVTQ0FQRURfSU5fTVVMVElfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnQ9PT0nXFxuJyApIHtcblx0XHRcdCsrbjtcblx0XHRcdHBhcnRzW2luZGV4XSA9IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmc7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBwYXJ0WzBdPT09J1xcXFwnICkge1xuXHRcdFx0c3dpdGNoICggcGFydFsxXSApIHtcblx0XHRcdFx0Y2FzZSAnXFxuJzpcblx0XHRcdFx0Y2FzZSAnICc6XG5cdFx0XHRcdGNhc2UgJ1xcdCc6XG5cdFx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpID0gcGFydC5pbmRleE9mKCdcXG4nLCBpKSArIDE7ICkgeyArK247IH1cblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSAnJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnXFxcXCc6IHBhcnRzW2luZGV4XSA9ICdcXFxcJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1wiJzogcGFydHNbaW5kZXhdID0gJ1wiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2InOiBwYXJ0c1tpbmRleF0gPSAnXFxiJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3QnOiBwYXJ0c1tpbmRleF0gPSAnXFx0JzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ24nOiBwYXJ0c1tpbmRleF0gPSAnXFxuJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2YnOiBwYXJ0c1tpbmRleF0gPSAnXFxmJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3InOiBwYXJ0c1tpbmRleF0gPSAnXFxyJzsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3UnOlxuXHRcdFx0XHRcdGNvbnN0IGNoYXJDb2RlICAgICAgICAgPSBwYXJzZUludChwYXJ0LnNsaWNlKDIpLCAxNik7XG5cdFx0XHRcdFx0b3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjaGFyQ29kZSAmJiBjaGFyQ29kZTwweEUwMDBcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJywgaXRlcmF0b3IubGluZUluZGV4ICsgbikpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ2hhckNvZGUoY2hhckNvZGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdVJzpcblx0XHRcdFx0XHRjb25zdCBjb2RlUG9pbnQgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHQoIG9wdGlvbnMubXVzdFNjYWxhciAmJiAweEQ3RkY8Y29kZVBvaW50ICYmIGNvZGVQb2ludDwweEUwMDAgfHwgMHgxMEZGRkY8Y29kZVBvaW50IClcblx0XHRcdFx0XHQmJiBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW52YWxpZCBVbmljb2RlIFNjYWxhciAke3BhcnR9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJywgaXRlcmF0b3IubGluZUluZGV4ICsgbikpKTtcblx0XHRcdFx0XHRwYXJ0c1tpbmRleF0gPSBmcm9tQ29kZVBvaW50KGNvZGVQb2ludCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJy8nOiBwYXJ0c1tpbmRleF0gPSAnLyc7IGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR3aGlsZSAoICsraW5kZXghPT1sZW5ndGggKTtcblx0cmV0dXJuIHBhcnRzLmpvaW4oJycpO1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50JztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1bX1xcZF0qKS87XG5leHBvcnQgY29uc3QgeyB0ZXN0OiBCQURfRCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hXFxkKWAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBJU19EX0lOVEVHRVIgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfWE9CX0lOVEVHRVIgfSA9IHRoZVJlZ0V4cCgvXjAoPzp4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qfG9bMC03XVtfMC03XSp8YlswMV1bXzAxXSopJC8pO1xuY29uc3QgeyB0ZXN0OiBCQURfWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBJU19JTlRFR0VSID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgPT4gKCBJU19EX0lOVEVHRVIobGl0ZXJhbCkgfHwgLypvcHRpb25zLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbCk7XG5cbmNvbnN0IEJpZ0ludEludGVnZXIgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXJcblx0fHxcblx0LTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IC1tYXgtMW4gKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IC1taW4tMW4gKVxuXHR8fFxuXHRpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciA9IHBhcnNlSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT10cnVlICkgeyByZXR1cm4gQmlnSW50SW50ZWdlcihsaXRlcmFsKTsgfVxuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSBwYXJzZUludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKSk7XG5cdGlmICggb3B0aW9ucy5JbnRlZ2VyTWluTnVtYmVyPD1udW1iZXIgJiYgbnVtYmVyPD1vcHRpb25zLkludGVnZXJNYXhOdW1iZXIgKSB7IHJldHVybiBudW1iZXI7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXJcblx0fHxcblx0LTkyMjMzNzIwMzY4NTQ3NzU4MDhuPD1iaWdJbnQgJiYgYmlnSW50PD05MjIzMzcyMDM2ODU0Nzc1ODA3bi8vICggbWluID0gLSgybioqKDY0bi0xbikpIHx8IC1tYXgtMW4gKSA8PSBsb25nIDw9ICggbWF4ID0gMm4qKig2NG4tMW4pLTFuIHx8IC1taW4tMW4gKVxuXHR8fFxuXHRpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgaXNGaW5pdGUgZnJvbSAnLmlzRmluaXRlJztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcbmltcG9ydCB7IElOVEVHRVJfRCwgQkFEX0QgfSBmcm9tICcuL0ludGVnZXInO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG5jb25zdCBfTmFOID0gLU5hTjtcbmNvbnN0IF9JbmZpbml0eSA9IC1JbmZpbml0eTtcbmNvbnN0IHsgdGVzdDogSVNfRkxPQVQgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF5cblx0JHtJTlRFR0VSX0R9XG5cdCg/OlxuXHRcdFxcLlxcZFtfXFxkXSpcblx0XHQoPzpbZUVdWy0rXT9cXGRbX1xcZF0qKT9cblx0fFxuXHRcdFtlRV1bLStdP1xcZFtfXFxkXSpcblx0KVxuXHQkYC52YWx1ZU9mKCk7XG5jb25zdCBVTkRFUlNDT1JFUyA9IC9fL2c7XG5jb25zdCB7IHRlc3Q6IElTX1pFUk8gfSA9IHRoZVJlZ0V4cCgvXlstK10/MCg/OlxcLjArKT8oPzpbZUVdWy0rXT8wKyk/JC8pO1xuY29uc3QgeyBleGVjOiBOT1JNQUxJWkVEIH0gPSB0aGVSZWdFeHAgICAoL15bLTBdPyhcXGQqKSg/OlxcLihcXGQrKSk/KD86ZVxcKz8oLT9cXGQrKSk/JC8pO1xuY29uc3QgeyBleGVjOiBPUklHSU5BTCB9ID0gdGhlUmVnRXhwICAgKC9eWy0rXT8wPyhcXGQqKSg/OlxcLihcXGQqPykwKik/KD86W2VFXVxcKz8oLT9cXGQrKSk/JC8pO1xuXG5leHBvcnQgY29uc3QgRmxvYXQgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhSVNfRkxPQVQobGl0ZXJhbCkgfHwgQkFEX0QobGl0ZXJhbCkgKSB7XG5cdFx0aWYgKCBvcHRpb25zLnNGbG9hdCApIHtcblx0XHRcdGlmICggbGl0ZXJhbD09PSdpbmYnIHx8IGxpdGVyYWw9PT0nK2luZicgKSB7IHJldHVybiBJbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09Jy1pbmYnICkgeyByZXR1cm4gX0luZmluaXR5OyB9XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0nbmFuJyB8fCBsaXRlcmFsPT09JytuYW4nICkgeyByZXR1cm4gTmFOOyB9XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0nLW5hbicgKSB7IHJldHVybiBfTmFOOyB9XG5cdFx0fVxuXHRcdHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBGbG9hdCAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRjb25zdCB3aXRob3V0VW5kZXJzY29yZXMgICAgICAgICA9IGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpO1xuXHRjb25zdCBudW1iZXIgICAgICAgICA9ICt3aXRob3V0VW5kZXJzY29yZXM7XG5cdGlmICggb3B0aW9ucy5zRXJyb3IgKSB7XG5cdFx0aXNGaW5pdGUobnVtYmVyKSB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgYmVlbiBhcyBiaWcgYXMgaW5mYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRudW1iZXIgfHwgSVNfWkVSTyh3aXRob3V0VW5kZXJzY29yZXMpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBiZWVuIGFzIGxpdHRsZSBhcyAke2xpdGVyYWxbMF09PT0nLScgPyAnLScgOiAnJ30wYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB7IDE6IG5vcm1hbGl6ZWRfaW50ZWdlciwgMjogbm9ybWFsaXplZF9mcmFjdGlvbmFsID0gJycsIDM6IG5vcm1hbGl6ZWRfZXhwb25lbnQgPSAnJyB9ID0gTk9STUFMSVpFRChudW1iZXIgICAgICAgKSA7XG5cdFx0Y29uc3QgeyAxOiBvcmlnaW5hbF9pbnRlZ2VyLCAyOiBvcmlnaW5hbF9mcmFjdGlvbmFsID0gJycsIDM6IG9yaWdpbmFsX2V4cG9uZW50ID0gJycgfSA9IE9SSUdJTkFMKHdpdGhvdXRVbmRlcnNjb3JlcykgO1xuXHRcdG9yaWdpbmFsX2ludGVnZXIgKyBvcmlnaW5hbF9mcmFjdGlvbmFsPT09bm9ybWFsaXplZF9pbnRlZ2VyICsgbm9ybWFsaXplZF9mcmFjdGlvbmFsXG5cdFx0JiZcblx0XHRvcmlnaW5hbF9leHBvbmVudCAgICAgICAgLSBvcmlnaW5hbF9mcmFjdGlvbmFsLmxlbmd0aD09PW5vcm1hbGl6ZWRfZXhwb25lbnQgICAgICAgIC0gbm9ybWFsaXplZF9mcmFjdGlvbmFsLmxlbmd0aFxuXHRcdHx8XG5cdFx0aXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGxvc3QgaXRzIGV4YWN0IGFuZCBiZWVuICR7bnVtYmVyfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0cmV0dXJuIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyByZWdleHBzIGZyb20gJy4uL3JlZ2V4cHMnO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgbmV3QXJyYXksIE9GX1RBQkxFUywgaXNBcnJheSwgaXNTdGF0aWMgfSBmcm9tICcuLi90eXBlcy9BcnJheSc7XG5pbXBvcnQgeyBESVJFQ1RMWSwgSU1QTElDSVRMWSwgUEFJUiwgaXNUYWJsZSwgaXNJbmxpbmUsIGRpcmVjdGx5SWZOb3QsIGZyb21QYWlyIH0gZnJvbSAnLi4vdHlwZXMvVGFibGUnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nLCBNdWx0aWxpbmVCYXNpY1N0cmluZyB9IGZyb20gJy4uL3R5cGVzL1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aWYgKCBpc1RhYmxlKHRhYmxlKSApIHtcblx0XHRcdFx0aXNJbmxpbmUodGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBJbmxpbmUgVGFibGVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGlzQXJyYXkodGFibGUpICkge1xuXHRcdFx0XHRpc1N0YXRpYyh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXBwZW5kIHZhbHVlIHRvIFN0YXRpYyBBcnJheWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRcdHRhYmxlID0gdGFibGVbKCB0YWJsZSAgICAgICAgICApLmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRocm93IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGRlZmluZSBUYWJsZSB1bmRlciBub24tVGFibGUgdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpOyB9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSk7XG5cdFx0XHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHsgdGFibGUgPSB0YWJsZVtrZXlzW2luZGV4KytdIF0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZKTsgfVxuXHRcdFx0cmV0dXJuIHRhYmxlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFibGU7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwZW5kVGFibGUgPSAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBhc0FycmF5SXRlbSAgICAgICAgICwgdGFnICAgICAgICApICAgICAgICA9PiB7XG5cdGxldCBsYXN0VGFibGUgICAgICAgO1xuXHRpZiAoIGFzQXJyYXlJdGVtICkge1xuXHRcdGxldCBhcnJheU9mVGFibGVzICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBmaW5hbEtleSBpbiB0YWJsZSApIHsgaXNBcnJheShhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldKSAmJiAhaXNTdGF0aWMoYXJyYXlPZlRhYmxlcykgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gcHVzaCBUYWJsZSB0byBub24tQXJyYXlPZlRhYmxlcyB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHRlbHNlIHsgYXJyYXlPZlRhYmxlcyA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ld0FycmF5KE9GX1RBQkxFUyk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucy5jb2xsZWN0KHRhZywgYXJyYXlPZlRhYmxlcywgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRhcnJheU9mVGFibGVzW2FycmF5T2ZUYWJsZXMubGVuZ3RoXSA9IGxhc3RUYWJsZSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkge1xuXHRcdFx0bGFzdFRhYmxlID0gdGFibGVbZmluYWxLZXldO1xuXHRcdFx0ZnJvbVBhaXIobGFzdFRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBrZXkvdmFsdWUgcGFpciBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBbXWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0ZGlyZWN0bHlJZk5vdChsYXN0VGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgRHVwbGljYXRlIFRhYmxlIGRlZmluaXRpb25gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFkpOyB9XG5cdFx0dGFnICYmIG9wdGlvbnMuY29sbGVjdCh0YWcsIG51bGwsIHRhYmxlLCBmaW5hbEtleSk7XG5cdH1cblx0cmV0dXJuIGxhc3RUYWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5saW5lVGFibGUgPSAodGFibGUgICAgICAgLCBrZXlzICAgICAgICAgICkgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXM7XG5cdGxldCBpbmRleCAgICAgICAgID0gMDtcblx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ICAgICAgICAgPSBrZXlzW2luZGV4KytdIDtcblx0XHRpZiAoIGtleSBpbiB0YWJsZSApIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XTtcblx0XHRcdGlzVGFibGUodGFibGUpIHx8IGl0ZXJhdG9yLnRocm93cyhFcnJvcihgVHJ5aW5nIHRvIGFzc2lnbiBwcm9wZXJ0eSB0aHJvdWdoIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggc3RhdGljIElubGluZSBUYWJsZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRmcm9tUGFpcih0YWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBBIHRhYmxlIGRlZmluZWQgaW1wbGljaXRseSB2aWEgW10gY2FuIG5vdCBiZSBhY2Nlc3NlZCB0byB2aWEga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZLCBQQUlSKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGNoZWNrTGl0ZXJhbFN0cmluZyA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRyZWdleHBzLl9fQ09OVFJPTF9DSEFSQUNURVJfRVhDTFVERV90ZXN0KGxpdGVyYWwpICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQ29udHJvbCBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gVGFiIGFyZSBub3QgcGVybWl0dGVkIGluIGEgTGl0ZXJhbCBTdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdHJldHVybiBsaXRlcmFsO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkxpdGVyYWxTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwuc3RhcnRzV2l0aChgJycnYCkgKSB7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBsaXRlcmFsIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgMiksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiAkWzJdO1xuXHR9XG5cdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwuc2xpY2UoMykpO1xuXHRpZiAoICQgKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDYpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gJFszXTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdNdWx0aS1saW5lIExpdGVyYWwgU3RyaW5nJywgbGl0ZXJhbC5sZW5ndGgpO1xuXHRjb25zdCBsZWFkaW5nTmV3bGluZSA9ICEoIGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpICk7XG5cdGlmICggbGVhZGluZ05ld2xpbmUgKSB7XG5cdFx0bGl0ZXJhbCA9IHN0YXJ0Lm11c3QoKTtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyhsaXRlcmFsKTtcblx0XHRpZiAoICQgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QoWyBgJycnYCwgbGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyAzKSBdLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0fVxuXHRvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPz8gc3RhcnQubm93cmFwKCk7XG5cdGZvciAoIGNvbnN0IGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgY2hlY2tMaXRlcmFsU3RyaW5nKGxpdGVyYWwpIF07IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gc3RhcnQubXVzdCgpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpbmUpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBjaGVja0xpdGVyYWxTdHJpbmcoJFsxXSkgKyAkWzJdO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBsaW5lcy5qb2luKG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyApO1xuXHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCApIHtcblx0XHRcdFx0bGluZXNbbGluZXMubGVuZ3RoIC0gMV0gKz0gYCcnJ2A7XG5cdFx0XHRcdGxlYWRpbmdOZXdsaW5lID8gbGluZXMudW5zaGlmdChgJycnYCkgOiBsaW5lc1swXSA9IGAnJycke2xpdGVyYWx9YDtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gTGl0ZXJhbE9iamVjdChsaW5lcywgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHZhbHVlOyB9XG5cdFx0XHRyZXR1cm4gJFszXTtcblx0XHR9XG5cdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGNoZWNrTGl0ZXJhbFN0cmluZyhsaW5lKTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJhc2ljU3RyaW5nID0gKCAodGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoICFsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiXCJcIicpICkge1xuXHRcdGNvbnN0IGluZGV4ID0gcmVnZXhwcy5CQVNJQ19TVFJJTkdfZXhlY18xX2VuZEluZGV4KGxpdGVyYWwpO1xuXHRcdGNvbnN0IHZhbHVlID0gQmFzaWNTdHJpbmcobGl0ZXJhbC5zbGljZSgxLCBpbmRleCkpO1xuXHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLnNsaWNlKDAsIGluZGV4ICsgMSksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGluZGV4ICsgMSkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0bGV0IGxlbmd0aCA9IDMgKyByZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgobGl0ZXJhbC5zbGljZSgzKSk7XG5cdGlmICggbGl0ZXJhbC5sZW5ndGghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3QgJCA9IGxpdGVyYWwuc2xpY2UoMywgbGVuZ3RoKTtcblx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB2YWx1ZSA9IEJhc2ljU3RyaW5nKCQpICsgKCBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgbGVuZ3RoICs9IDMpID8gbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsICsrbGVuZ3RoKSA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnICk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdNdWx0aS1saW5lIEJhc2ljIFN0cmluZycsIGxlbmd0aCk7XG5cdGNvbnN0IHNraXBwZWQgICAgICAgID0gKCBsaXRlcmFsID0gbGl0ZXJhbC5zbGljZSgzKSApID8gMCA6IDE7XG5cdGlmICggc2tpcHBlZCApIHtcblx0XHRsaXRlcmFsID0gc3RhcnQubXVzdCgpO1xuXHRcdGxldCBsZW5ndGggPSByZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgobGl0ZXJhbCk7XG5cdFx0aWYgKCBsaXRlcmFsLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0ICQgPSBsaXRlcmFsLnNsaWNlKDAsIGxlbmd0aCk7XG5cdFx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gTXVsdGlsaW5lQmFzaWNTdHJpbmcoJCwgb3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICwgc2tpcHBlZCkgKyAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChbICdcIlwiXCInLCBsaXRlcmFsLnNsaWNlKDAsIGxlbmd0aCkgXSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0fVxuXHRvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPz8gc3RhcnQubm93cmFwKCk7XG5cdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QobGl0ZXJhbCArICdcXG4nKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGZvciAoIGNvbnN0IGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICA9IFsgbGl0ZXJhbCBdOyA7ICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IHN0YXJ0Lm11c3QoKTtcblx0XHRsZXQgbGVuZ3RoID0gcmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoKGxpbmUpO1xuXHRcdGlmICggbGluZS5sZW5ndGghPT1sZW5ndGggKSB7XG5cdFx0XHRjb25zdCAkID0gbGluZS5zbGljZSgwLCBsZW5ndGgpO1xuXHRcdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCgkKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBtdWx0aS1saW5lIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IE11bHRpbGluZUJhc2ljU3RyaW5nKGxpbmVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyAkLCBvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgLCBza2lwcGVkKSArICggbGluZS5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpbmUuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdFx0aWYgKCBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCApIHtcblx0XHRcdFx0c2tpcHBlZCA/IGxpbmVzLnVuc2hpZnQoJ1wiXCJcIicpIDogbGluZXNbMF0gPSBgXCJcIlwiJHtsaXRlcmFsfWA7XG5cdFx0XHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBgJHskfVwiXCJcImA7XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IExpdGVyYWxPYmplY3QobGluZXMsIHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSB2YWx1ZTsgfVxuXHRcdFx0cmV0dXJuIGxpbmUuc2xpY2UobGVuZ3RoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHR9XG5cdFx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaW5lICsgJ1xcbicpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gbGluZTtcblx0fVxufSApICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuY29uc3QgS0VZUyA9IC8qI19fUFVSRV9fKi9OdWxsICAgICAgICAobnVsbCk7XG5leHBvcnQgY29uc3QgY29tbWVudEZvciA9IChrZXkgICAgICAgICkgICAgICAgICA9PiBLRVlTW2tleV0gPz8gKCBLRVlTW2tleV0gPSBTeW1ib2woa2V5KSApO1xuZXhwb3J0IGNvbnN0IGNvbW1lbnRGb3JUaGlzICAgICAgICAgICAgICAgID0gU3ltYm9sKCd0aGlzJykgICAgICAgO1xuXG5jb25zdCB7IHRlc3Q6IGluY2x1ZGVzTmV3bGluZSB9ID0gdGhlUmVnRXhwKC9cXHI/XFxuL2cpO1xuZXhwb3J0IGNvbnN0IGdldENPTU1FTlQgPSAodGFibGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2V5Q29tbWVudCAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0aWYgKCBrZXlDb21tZW50IGluIHRhYmxlICkge1xuXHRcdGNvbnN0IGNvbW1lbnQgPSB0YWJsZVtrZXlDb21tZW50XTtcblx0XHRpZiAoIHR5cGVvZiBjb21tZW50IT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcihgdGhlIHZhbHVlIG9mIGNvbW1lbnQgbXVzdCBiZSBhIHN0cmluZywgd2hpbGUgXCIke2NvbW1lbnQ9PT1udWxsID8gJ251bGwnIDogdHlwZW9mIGNvbW1lbnR9XCIgdHlwZSBpcyBmb3VuZGApOyB9XG5cdFx0aWYgKCBpbmNsdWRlc05ld2xpbmUoY29tbWVudCkgKSB7IHRocm93IFN5bnRheEVycm9yKGB0aGUgdmFsdWUgb2YgY29tbWVudCBtdXN0IGJlIGEgc3RyaW5nIGFuZCBjYW4gbm90IGluY2x1ZGUgbmV3bGluZWApOyB9XG5cdFx0cmV0dXJuIGAgIyR7Y29tbWVudH1gOy8vL1xuXHR9XG5cdHJldHVybiAnJztcbn07XG5leHBvcnQgY29uc3QgZ2V0Q29tbWVudCA9ICAgICAgICAgICAgICAgICAgICAodGFibGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXkgICApICAgICAgICAgICAgICAgICAgICAgPT4ga2V5IGluIEtFWVMgPyBnZXRDT01NRU5UKHRhYmxlLCBLRVlTW2tleV0gKSA6ICcnO1xuIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgeyB4IH0gZnJvbSAnLi4vai1sZXhlcic7Ly8vIGV4dGVybmFsXG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCB7IExpdGVyYWxPYmplY3QgfSBmcm9tICcuLi90eXBlcy9hdG9tJztcbmltcG9ydCB7IElOTElORSwgRElSRUNUTFkgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgU1RBVElDQUxMWSB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSwgT0ZGU0VUJCB9IGZyb20gJy4uL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IEJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcbmltcG9ydCB7IEludGVnZXIgfSBmcm9tICcuLi90eXBlcy9JbnRlZ2VyJztcbmltcG9ydCB7IEZsb2F0IH0gZnJvbSAnLi4vdHlwZXMvRmxvYXQnO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMgZnJvbSAnLi4vcmVnZXhwcyc7XG5pbXBvcnQgeyBhcHBlbmRUYWJsZSwgcHJlcGFyZVRhYmxlLCBwcmVwYXJlSW5saW5lVGFibGUsIGFzc2lnbkxpdGVyYWxTdHJpbmcsIGFzc2lnbkJhc2ljU3RyaW5nIH0gZnJvbSAnLi9vbi10aGUtc3BvdCc7XG5cbmltcG9ydCB7IGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzIH0gZnJvbSAnLi4vdHlwZXMvY29tbWVudCc7XG5pbXBvcnQgeyBiZUlubGluZSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcblxuY29uc3QgeyB0ZXN0OiBJU19PRkZTRVQkIH0gPSB0aGVSZWdFeHAoT0ZGU0VUJCk7XG5jb25zdCB7IHRlc3Q6IElTX0VNUFRZIH0gPSB0aGVSZWdFeHAoL15cXFtbXFx0IF0qXS8pO1xuXG5jb25zdCBwYXJzZUtleXMgPSAocmVzdCAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGxldCBsaW5lUmVzdCAgICAgICAgID0gcmVzdDtcblx0Y29uc3QgbGVhZGluZ0tleXMgICAgICAgICAgID0gW107XG5cdGxldCBsYXN0SW5kZXggICAgICAgICA9IC0xO1xuXHRmb3IgKCA7IDsgKSB7XG5cdFx0bGluZVJlc3QgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBFbXB0eSBiYXJlIGtleWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXT09PSdcIicgKSB7XG5cdFx0XHRjb25zdCBpbmRleCAgICAgICAgID0gcmVnZXhwcy5CQVNJQ19TVFJJTkdfZXhlY18xX2VuZEluZGV4KGxpbmVSZXN0KTtcblx0XHRcdGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IEJhc2ljU3RyaW5nKGxpbmVSZXN0LnNsaWNlKDEsIGluZGV4KSk7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGluZGV4ICsgMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNRdW90ZWQgPSBsaW5lUmVzdFswXT09PSdcXCcnO1xuXHRcdFx0Y29uc3Qga2V5ICAgICAgICAgPSAoICggaXNRdW90ZWQgPyByZWdleHBzLl9fTElURVJBTF9LRVlfZXhlYyA6IHJlZ2V4cHMuX19CQVJFX0tFWV9leGVjICkobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkICR7aXNRdW90ZWQgPyAnbGl0ZXJhbCBzdHJpbmcnIDogJ2JhcmUnfSBrZXlgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpIClbMF07XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnNsaWNlKGtleS5sZW5ndGgpO1xuXHRcdFx0bGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gaXNRdW90ZWQgPyBrZXkuc2xpY2UoMSwgLTEpIDoga2V5O1xuXHRcdH1cblx0XHRpZiAoIHJlZ2V4cHMuSVNfRE9UX0tFWShsaW5lUmVzdCkgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLkRPVF9LRVksICcnKTsgfVxuXHRcdGVsc2UgeyBicmVhazsgfVxuXHR9XG5cdGlmICggb3B0aW9ucy5kaXNhYmxlRGlnaXQgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IHJlc3Quc2xpY2UoMCwgLWxpbmVSZXN0Lmxlbmd0aCk7XG5cdFx0KCByZWdleHBzLmlzQW1hemluZyhrZXlzKSB8fCBvcHRpb25zLmVuYWJsZU51bGwgJiYga2V5cz09PSdudWxsJyApICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhcmUga2V5IGRpc2FibGVkIGJ5IHhPcHRpb25zLnN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0aWYgKCBvcHRpb25zLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7XG5cdFx0ZG8geyBsZWFkaW5nS2V5c1tpbmRleF0gIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTsgfVxuXHRcdHdoaWxlICggaW5kZXgtLSApO1xuXHR9XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsYXN0SW5kZXhdIDtcblx0bGVhZGluZ0tleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuXHRyZXR1cm4geyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCBwdXNoID0gKGxhc3RBcnJheSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0aWYgKCBsaW5lUmVzdFswXT09PSc8JyApIHtcblx0XHRjb25zdCB7IDE6IHRhZyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWcgYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRvcHRpb25zLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKG9wdGlvbnMuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUob3B0aW9ucy5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zLmFzQXJyYXlzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSA/PyBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBsaXRlcmFsPT09J3RydWUnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IGZhbHNlOyB9XG5cdGVsc2UgaWYgKCBvcHRpb25zLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyApIHsgb3B0aW9ucy5hc051bGxzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBudWxsOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdG9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdG9wdGlvbnMuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdG9wdGlvbnMuYXNMb2NhbERhdGVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCduJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKVxuXHRcdFx0PyBvcHRpb25zLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgRmxvYXQobGl0ZXJhbCkpIDogRmxvYXQobGl0ZXJhbClcblx0XHRcdDogb3B0aW9ucy5hc0ludGVnZXJzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgSW50ZWdlcihsaXRlcmFsKSkgOiBJbnRlZ2VyKGxpdGVyYWwpXG5cdFx0O1xuXHR9XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmNvbnN0IGVxdWFsU3RhdGljQXJyYXkgPSBmdW5jdGlvbiAqICggICAgICAgICAgICB0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgIHtcblx0Y29uc3Qgc3RhdGljQXJyYXkgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoU1RBVElDQUxMWSk7XG5cdGlmICggSVNfRU1QVFkobGluZVJlc3QpICkge1xuXHRcdGJlSW5saW5lKHN0YXRpY0FycmF5LCBsaW5lUmVzdFsxXT09PSddJyA/IDAgOiAzKTtcblx0XHRyZXR1cm4gbGluZVJlc3Quc2xpY2UobGluZVJlc3QuaW5kZXhPZignXScpKS5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdTdGF0aWMgQXJyYXknLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRsZXQgaW5saW5lICAgICAgICAgICAgICAgPSBsaW5lUmVzdC5zdGFydHNXaXRoKCdbICcpIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ1tcXHQnKSA/IDMgOiAwO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7XG5cdFx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0XHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBwdXNoKHN0YXRpY0FycmF5LCBsaW5lUmVzdCk7XG5cdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IG51bGw7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdFx0dGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgaW4gc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0XHR9XG5cdH1cblx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBlcXVhbElubGluZVRhYmxlID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZLCBJTkxJTkUpO1xuXHRpZiAoIG9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSApIHtcblx0XHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdJbmxpbmUgVGFibGUnLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0bGV0IGlubGluZSA9IHRydWU7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihmb3JDb21tZW50KTtcblx0XHRcdGxpbmVSZXN0ID0gdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0O1xuXHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0fVxuXHRcdGlubGluZSB8fCBiZUlubGluZShpbmxpbmVUYWJsZSwgZmFsc2UpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXSE9PSd9JyApIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3RbMF09PT0nIycgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpKTtcblx0XHRcdFx0bGluZVJlc3QgPSAoIHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdCApIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBUaGUgbGFzdCBwcm9wZXJ0eSBvZiBhbiBJbmxpbmUgVGFibGUgY2FuIG5vdCBoYXZlIGEgdHJhaWxpbmcgY29tbWFgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBGb3JDb21tZW50ID0gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIHRhZyB9ID0geyBsaW5lUmVzdCB9ID0gcmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyhwYXJzZUtleXMobGluZVJlc3QpKTtcblx0cmV0dXJuIHsgdGFibGU6IHByZXBhcmVJbmxpbmVUYWJsZShsYXN0SW5saW5lVGFibGUsIGxlYWRpbmdLZXlzKSwgZmluYWxLZXksIHRhZywgbGluZVJlc3QgfTtcbn07XG5jb25zdCBhc3NpZ24gPSAoeyBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCwgdGFibGUgfSAgICAgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRmaW5hbEtleSBpbiB0YWJsZSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBwcm9wZXJ0eSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucy5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnfSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucy5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRyZXR1cm4gZXF1YWxJbmxpbmVUYWJsZSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpID8/IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyB0YWJsZVtmaW5hbEtleV0gPSBmYWxzZTsgfVxuXHRlbHNlIGlmICggb3B0aW9ucy5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IG51bGw7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnbicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4Jylcblx0XHRcdD8gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEZsb2F0KGxpdGVyYWwpKSA6IEZsb2F0KGxpdGVyYWwpXG5cdFx0XHQ6IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBJbnRlZ2VyKGxpdGVyYWwpKSA6IEludGVnZXIobGl0ZXJhbClcblx0XHQ7XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgICAgICAgID0+IHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG5ldyBvcHRpb25zLlRhYmxlO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yLm5leHQoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmUgKSB7XG5cdFx0XHRpZiAoIGxpbmVbMF09PT0nWycgKSB7XG5cdFx0XHRcdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9ID0gcmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUsIHBhcnNlS2V5cyk7XG5cdFx0XHRcdGNvbnN0IHRhYmxlICAgICAgICA9IHByZXBhcmVUYWJsZShyb290VGFibGUsIGxlYWRpbmdLZXlzKTtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0U2VjdGlvblRhYmxlID0gYXBwZW5kVGFibGUodGFibGUsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnKTtcblx0XHRcdFx0b3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgJiYgbGluZVJlc3QgJiYgKCBsYXN0U2VjdGlvblRhYmxlW2NvbW1lbnRGb3JUaGlzXSA9IGFzQXJyYXlJdGVtID8gbGluZVJlc3Quc2xpY2UoMSkgOiB0YWJsZVtjb21tZW50Rm9yKGZpbmFsS2V5KV0gPSBsaW5lUmVzdC5zbGljZSgxKSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGxpbmVbMF09PT0nIycgKSB7XG5cdFx0XHRcdHJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gY29tbWVudHNgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQobGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHRcdGxldCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKGZvckNvbW1lbnQpO1xuXHRcdFx0XHR0eXBlb2YgcmVzdD09PSdzdHJpbmcnIHx8ICggcmVzdCA9IHggICAgICAgIChyZXN0KSApO1xuXHRcdFx0XHRpZiAoIHJlc3QgKSB7XG5cdFx0XHRcdFx0cmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgKSB7IGZvckNvbW1lbnQudGFibGVbY29tbWVudEZvcihmb3JDb21tZW50LmZpbmFsS2V5KV0gPSByZXN0LnNsaWNlKDEpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEVTQ0FQRUQgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKHtcblx0Li4uLyojX19QVVJFX18qL2Zyb21FbnRyaWVzKC8qI19fUFVSRV9fKi9bIC4uLkFycmF5KDB4MjApIF0ubWFwKChfLCBjaGFyQ29kZSkgPT4gWyBmcm9tQ2hhckNvZGUoY2hhckNvZGUpLCAnXFxcXHUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoNCwgJzAnKSBdKSksXG5cdCdcXGInOiAnXFxcXGInLFxuXHQnXFx0JzogJ1xcXFx0Jyxcblx0J1xcbic6ICdcXFxcbicsXG5cdCdcXGYnOiAnXFxcXGYnLFxuXHQnXFxyJzogJ1xcXFxyJyxcblx0J1wiJzogJ1xcXFxcIicsXG5cdCdcIlwiXCInOiAnXCJcIlxcXFxcIicsXG5cdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0J1xceDdGJzogJ1xcXFx1MDA3RicsXG59KTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGJ1xceDdGXS8pO1xuY29uc3QgQllfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXltcXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdLyk7XG5leHBvcnQgY29uc3Qgc2luZ2xlbGluZVN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIE5FRURfQkFTSUModmFsdWUpICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYCcke3ZhbHVlfSdgO1xufTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lQmFzaWNTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYFwiXCJgO1xufTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9CQVNJQyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxceDdGXXwnJycvKTtcbmV4cG9ydCBjb25zdCB7IHRlc3Q6IG11bHRpbGluZU5lZWRCYXNpYyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXXwnJycvKTtcbmNvbnN0IHsgdGVzdDogUkVBTF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIvKTtcbmNvbnN0IEJZX01VTFRJTElORV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3xcIlwiXCJ8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL14oPzpbXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxcXFxcXHg3Rl18XCJcIlwiKS8pO1xuY29uc3QgZXNjYXBlX211bHRpbGluZSA9IChsaW5lcyAgICAgICAgICAsIGxpbmVJbmRleCAgICAgICAgKSA9PiB7XG5cdGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdIDtcblx0aWYgKCBSRUFMX01VTFRJTElORV9FU0NBUEUobGluZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSBsaW5lLm1hdGNoKEJZX01VTFRJTElORV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfTVVMVElMSU5FX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdGxpbmVzW2xpbmVJbmRleF0gPSBwYXJ0cy5qb2luKCcnKTtcblx0fVxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IExpbmVzID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+ICggbGluZXMgPSBbICcnLCAuLi5saW5lcyBdICAgICAgICAgICkubGVuZ3RoPT09MSA/IFsgJycsICcnIF0gOiBsaW5lcyAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZVN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgbGFzdEluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0bGV0IGluZGV4ID0gbGFzdEluZGV4O1xuXHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfQkFTSUMobGluZXNbaW5kZXhdICkgKSB7IGJyZWFrOyB9IH1cblx0d2hpbGUgKCAtLWluZGV4ICk7XG5cdGlmICggaW5kZXggKSB7XG5cdFx0aW5kZXggPSBsYXN0SW5kZXg7XG5cdFx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRcdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHRcdHdoaWxlICggLS1pbmRleCApIHsgZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpOyB9XG5cdH1cblx0ZWxzZXsgbGluZXNbbGFzdEluZGV4XSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnOyB9XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRsaW5lc1tpbmRleF0gKz0gbGluZXNbMF0gPSAnXCJcIlwiJztcblx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuIiwiaW1wb3J0IEZsb2F0NjRBcnJheSBmcm9tICcuRmxvYXQ2NEFycmF5JztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy5VaW50OEFycmF5JztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IF9JbmZpbml0eSA9IC1JbmZpbml0eTtcblxuY29uc3QgeyB0ZXN0OiBJTlRFR0VSX0xJS0UgfSA9IHRoZVJlZ0V4cCgvXi0/XFxkKyQvKTtcbmNvbnN0IGVuc3VyZUZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgPT4gSU5URUdFUl9MSUtFKGxpdGVyYWwpID8gbGl0ZXJhbCArICcuMCcgOiBsaXRlcmFsO1xuXG5jb25zdCBmbG9hdDY0QXJyYXkgPSBuZXcgRmxvYXQ2NEFycmF5KFsgTmFOIF0pO1xuY29uc3QgdWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGZsb2F0NjRBcnJheS5idWZmZXIpO1xuY29uc3QgTmFOXzcgPSB1aW50OEFycmF5WzddIDtcblxuZXhwb3J0IGNvbnN0IGZsb2F0ID0gTmFOXzc9PT1uZXcgVWludDhBcnJheShuZXcgRmxvYXQ2NEFycmF5KFsgLU5hTiBdKS5idWZmZXIpWzddIFxuXHQ/ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHRcdD8gdmFsdWU9PT1JbmZpbml0eSA/ICdpbmYnIDogdmFsdWU9PT1fSW5maW5pdHkgPyAnLWluZicgOiBlbnN1cmVGbG9hdCgnJyArIHZhbHVlKVxuXHRcdDogdmFsdWU9PT12YWx1ZSA/IGlzKHZhbHVlLCAwKSA/ICcwLjAnIDogJy0wLjAnIDogJ25hbidcblx0OiAodmFsdWUgICAgICAgICkgPT4gdmFsdWVcblx0XHQ/IHZhbHVlPT09SW5maW5pdHkgPyAnaW5mJyA6IHZhbHVlPT09X0luZmluaXR5ID8gJy1pbmYnIDogZW5zdXJlRmxvYXQoJycgKyB2YWx1ZSlcblx0XHQ6IHZhbHVlPT09dmFsdWUgPyBpcyh2YWx1ZSwgMCkgPyAnMC4wJyA6ICctMC4wJyA6ICggZmxvYXQ2NEFycmF5WzBdID0gdmFsdWUsIHVpbnQ4QXJyYXlbN10gKT09PU5hTl83ID8gJ25hbicgOiAnLW5hbic7XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IERBVEUgZnJvbSAnLkRhdGUucHJvdG90eXBlJztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLmNsYXNzLmlzU3RyaW5nJztcbmltcG9ydCBpc051bWJlciBmcm9tICcuY2xhc3MuaXNOdW1iZXInO1xuaW1wb3J0IGlzQmlnSW50IGZyb20gJy5jbGFzcy5pc0JpZ0ludCc7XG5pbXBvcnQgaXNCb29sZWFuIGZyb20gJy5jbGFzcy5pc0Jvb2xlYW4nO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcblxuaW1wb3J0IHsgY29tbWVudEZvclRoaXMsIGdldENPTU1FTlQsIGdldENvbW1lbnQgfSBmcm9tICcuLi90eXBlcy9jb21tZW50JztcbmltcG9ydCB7IHNpbmdsZWxpbmVTdHJpbmcgfSBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgeyBmbG9hdCB9IGZyb20gJy4vZmxvYXQnO1xuaW1wb3J0IHsgaXNTZWN0aW9uLCBvZklubGluZSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IF9saXRlcmFsIH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5cbmNvbnN0IGlzRGF0ZSA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoREFURSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IHsgdGVzdDogQkFSRSB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKyQvKTtcbmNvbnN0ICRLZXkkID0gKGtleSAgICAgICAgKSAgICAgICAgID0+IEJBUkUoa2V5KSA/IGtleSA6IHNpbmdsZWxpbmVTdHJpbmcoa2V5KTtcblxuY29uc3QgRklSU1QgPSAvW14uXSsvO1xuY29uc3QgbGl0ZXJhbFN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICA9PiBgJyR7dmFsdWV9J2A7XG5jb25zdCAkS2V5cyA9IChrZXlzICAgICAgICApICAgICAgICAgPT4gcmVnZXhwcy5pc0FtYXppbmcoa2V5cykgPyBrZXlzLnJlcGxhY2UoRklSU1QsIGxpdGVyYWxTdHJpbmcpIDoga2V5cz09PSdudWxsJyA/IGAnbnVsbCdgIDoga2V5cztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVE9NTFNlY3Rpb24gZXh0ZW5kcyBBcnJheSAgICAgICAgIHtcblx0XG5cdCAgICAgICAgICAgICAgICAgZG9jdW1lbnQgICAgICAgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChkb2N1bWVudCAgICAgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdFtTeW1ib2wudG9QcmltaXRpdmVdICgpIHsgcmV0dXJuIHRoaXMuam9pbih0aGlzLmRvY3VtZW50Lm5ld2xpbmUpOyB9XG5cdFxuXHRhcHBlbmROZXdsaW5lICgpIHsgdGhpc1t0aGlzLmxlbmd0aF0gPSAnJzsgfVxuXHQgICAgICAgIHNldCBhcHBlbmRMaW5lIChzb3VyY2UgICAgICAgICkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9IHNvdXJjZTsgfVxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGggLSAxXSArPSBzb3VyY2U7IH0gICBcblx0ICAgICAgICBzZXQgYXBwZW5kSW5saW5lSWYgKHNvdXJjZSAgICAgICAgKSB7IHNvdXJjZSAmJiAoIHRoaXNbdGhpcy5sZW5ndGggLSAxXSArPSBzb3VyY2UgKTsgfS8vL1xuXHRcblx0KiBhc3NpZ25CbG9jayAgICAgICAgICAgICAgICAgICAgICAgICAgIChkb2N1bWVudEtleXNfICAgICAgICAgICAgICAgICAgICwgc2VjdGlvbktleXNfICAgICAgICAgICAgICAgICAgLCB0YWJsZSAgICwgdGFibGVLZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAge1xuXHRcdGNvbnN0IHsgZG9jdW1lbnQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgeyBuZXdsaW5lVW5kZXJIZWFkZXIsIG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyIH0gPSBkb2N1bWVudDtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJEb3R0ZWQgPSBzZWN0aW9uS2V5c18gPyBkb2N1bWVudC5uZXdsaW5lVW5kZXJQYWlyQnV0RG90dGVkIDogZmFsc2U7XG5cdFx0Y29uc3QgbmV3bGluZUFmdGVyUGFpciA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlckRvdHRlZCA6IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXI7XG5cdFx0Zm9yICggY29uc3QgdGFibGVLZXkgb2YgdGFibGVLZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gdGFibGVbdGFibGVLZXldIDtcblx0XHRcdGNvbnN0ICRrZXkkID0gJEtleSQodGFibGVLZXkpO1xuXHRcdFx0Y29uc3QgZG9jdW1lbnRLZXlzID0gZG9jdW1lbnRLZXlzXyArICRrZXkkO1xuXHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IHZhbHVlO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRsZXQgZmlyc3RJdGVtID0gdmFsdWVbMF07XG5cdFx0XHRcdFx0aWYgKCBpc1NlY3Rpb24oZmlyc3RJdGVtKSApIHtcblx0XHRcdFx0XHRcdGNvbnN0IHRhYmxlSGVhZGVyID0gYFtbJHtkb2N1bWVudEtleXN9XV1gICAgICAgICAgO1xuXHRcdFx0XHRcdFx0Y29uc3QgZG9jdW1lbnRLZXlzXyA9IGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICA7XG5cdFx0XHRcdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0bGV0IHRhYmxlICAgICAgICAgICAgICAgICA9IGZpcnN0SXRlbTtcblx0XHRcdFx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmFwcGVuZFNlY3Rpb24oKTtcblx0XHRcdFx0XHRcdFx0c2VjdGlvblswXSA9IHRhYmxlSGVhZGVyICsgZ2V0Q09NTUVOVCh0YWJsZSwgY29tbWVudEZvclRoaXMpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIG5ld2xpbmVVbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRcdFx0XHRzZWN0aW9uWzFdID0gJyc7XG5cdFx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoICsraW5kZXg9PT1sZW5ndGggKSB7IGJyZWFrOyB9XG5cdFx0XHRcdFx0XHRcdHRhYmxlID0gKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgIClbaW5kZXhdIDtcblx0XHRcdFx0XHRcdFx0aWYgKCAhaXNTZWN0aW9uKHRhYmxlKSApIHsgdGhyb3cgVHlwZUVycm9yKGB0aGUgZmlyc3QgdGFibGUgaXRlbSBtYXJrZWQgYnkgU2VjdGlvbigpIG1lYW5zIHRoZSBwYXJlbnQgYXJyYXkgaXMgYW4gYXJyYXkgb2YgdGFibGVzLCB3aGljaCBjYW4gbm90IGluY2x1ZGUgb3RoZXIgdHlwZXMgb3IgdGFibGUgbm90IG1hcmtlZCBieSBTZWN0aW9uKCkgYW55IG1vcmUgaW4gdGhlIHJlc3QgaXRlbXNgKTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgeyBsZXQgaW5kZXggPSAxOyB3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkgeyBpZiAoIGlzU2VjdGlvbih2YWx1ZVtpbmRleCsrXSApICkgeyB0aHJvdyBUeXBlRXJyb3IoYGlmIGFuIGFycmF5IGlzIG5vdCBhcnJheSBvZiB0YWJsZXMsIGl0IGNhbiBub3QgaW5jbHVkZSBhbnkgdGFibGUgdGhhdCBtYXJrZWQgYnkgU2VjdGlvbigpYCk7IH0gfSB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGlzU2VjdGlvbih2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmFwcGVuZFNlY3Rpb24oKTtcblx0XHRcdFx0XHRzZWN0aW9uWzBdID0gYFske2RvY3VtZW50S2V5c31dJHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LnByZWZlckNvbW1lbnRGb3JUaGlzXG5cdFx0XHRcdFx0XHRcdD8gZ2V0Q09NTUVOVCh2YWx1ZSwgY29tbWVudEZvclRoaXMpIHx8IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KVxuXHRcdFx0XHRcdFx0XHQ6IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KSB8fCBnZXRDT01NRU5UKHZhbHVlLCBjb21tZW50Rm9yVGhpcylcblx0XHRcdFx0XHR9YDtcblx0XHRcdFx0XHRpZiAoIG5ld2xpbmVVbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgYGAsIHZhbHVlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKSk7XG5cdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgc2VjdGlvbktleXMgPSBzZWN0aW9uS2V5c18gKyAka2V5JDtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9ICRLZXlzKHNlY3Rpb25LZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKCcnLCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHQtLXRoaXMubGVuZ3RoO1xuXHRcdFx0XHR5aWVsZCB0aGlzLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHNlY3Rpb25LZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJEb3R0ZWQgJiYgdGhpcy5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmVJZiA9IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KTtcblx0XHRcdFx0bmV3bGluZUFmdGVyUGFpciAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdCAgICAgICAgdmFsdWUgKGluZGVudCAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAsIHJldHVyblZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICAgICAgICAgKSAgICAgICAgICAgICAgICAgIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRpZiAoIHZhbHVlPT09bnVsbCApIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMuZG9jdW1lbnQubnVsbERpc2FibGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRvbWwgY2FuIG5vdCBzdHJpbmdpZnkgXCJudWxsXCIgdHlwZSB2YWx1ZSB3aXRob3V0IHRydXRoeSBvcHRpb25zLnhOdWxsYCk7IH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICdudWxsJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBpbmxpbmVNb2RlID0gb2ZJbmxpbmUodmFsdWUpO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGlubGluZU1vZGU9PT11bmRlZmluZWRcblx0XHRcdFx0XHRcdD8gdGhpcy5zdGF0aWNBcnJheShpbmRlbnQsIHZhbHVlKVxuXHRcdFx0XHRcdFx0OiB0aGlzLnNpbmdsZWxpbmVBcnJheShpbmRlbnQsIHZhbHVlLCB0aGlzLmRvY3VtZW50LiRzaW5nbGVsaW5lQXJyYXkgPz8gaW5saW5lTW9kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpbmxpbmVNb2RlIT09dW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGlubGluZU1vZGUgfHwgdGhpcy5kb2N1bWVudC5tdWx0aWxpbmVUYWJsZURpc2FibGVkXG5cdFx0XHRcdFx0XHQ/IHRoaXMuaW5saW5lVGFibGUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgIClcblx0XHRcdFx0XHRcdDogdGhpcy5tdWx0aWxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzLmRvY3VtZW50Lm11bHRpbGluZVRhYmxlQ29tbWEpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaXNEYXRlKHZhbHVlKSApIHtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHZhbHVlLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgnVCcsIHRoaXMuZG9jdW1lbnQuVCkucmVwbGFjZSgnWicsIHRoaXMuZG9jdW1lbnQuWik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBfbGl0ZXJhbCBpbiB2YWx1ZSApIHtcblx0XHRcdFx0XHRjb25zdCBsaXRlcmFsID0gKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVtfbGl0ZXJhbF07XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgbGl0ZXJhbD09PSdzdHJpbmcnICkgeyB0aGlzLmFwcGVuZElubGluZSA9IGxpdGVyYWw7IH1cblx0XHRcdFx0XHRlbHNlIGlmICggaXNBcnJheShsaXRlcmFsKSApIHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBsaXRlcmFsO1xuXHRcdFx0XHRcdFx0aWYgKCBsZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gbGl0ZXJhbFswXTtcblx0XHRcdFx0XHRcdFx0bGV0IGluZGV4ID0gMTtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHsgdGhpcy5hcHBlbmRMaW5lID0gbGl0ZXJhbFtpbmRleCsrXSA7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYGxpdGVyYWwgdmFsdWUgaXMgYnJva2VuYCk7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgbGl0ZXJhbCB2YWx1ZSBpcyBicm9rZW5gKTsgfVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggaXNTdHJpbmcodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBTdHJpbmddYCk7IH1cblx0XHRcdFx0aWYgKCBpc051bWJlcih2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IE51bWJlcl1gKTsgfVxuXHRcdFx0XHRpZiAoIGlzQmlnSW50KHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgQmlnSW50XWApOyB9XG5cdFx0XHRcdGlmICggaXNCb29sZWFuKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgQm9vbGVhbl1gKTsgfVxuXHRcdFx0XHRpZiAoIHJldHVyblZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHRcdGNvbnN0IGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XHRpZiAoIGtleXMubGVuZ3RoICkgeyByZXR1cm4ga2V5czsgfVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2JpZ2ludCc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJycgKyB2YWx1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHRoaXMuZG9jdW1lbnQuYXNJbnRlZ2VyKHZhbHVlKSA/IGlzKHZhbHVlLCAtMCkgPyAnLTAnIDogJycgKyB2YWx1ZSA6IGZsb2F0KHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHNpbmdsZWxpbmVTdHJpbmcodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9IHZhbHVlID8gJ3RydWUnIDogJ2ZhbHNlJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBUeXBlRXJyb3IoYHRvbWwgY2FuIG5vdCBzdHJpbmdpZnkgXCIke3R5cGVvZiB2YWx1ZX1cIiB0eXBlIHZhbHVlYCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdFxuXHQgICAgICAgIHNpbmdsZWxpbmVBcnJheSAoaW5kZW50ICAgICAgICAsIHN0YXRpY0FycmF5ICAgICAgICAgICAgICAgICAgICAgICwgaW5saW5lTW9kZSAgICAgICAgICAgICAgICkge1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBzdGF0aWNBcnJheTtcblx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gaW5saW5lTW9kZSYwYjEwID8gJ1sgJyA6ICdbJztcblx0XHRcdHRoaXMudmFsdWUoaW5kZW50LCBzdGF0aWNBcnJheVswXSAsIGZhbHNlKTtcblx0XHRcdGxldCBpbmRleCA9IDE7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcsICc7XG5cdFx0XHRcdHRoaXMudmFsdWUoaW5kZW50LCBzdGF0aWNBcnJheVtpbmRleCsrXSAsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gaW5saW5lTW9kZSYwYjEwID8gJyBdJyA6ICddJztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gaW5saW5lTW9kZSYwYjAxID8gJ1sgXScgOiAnW10nOyB9XG5cdH1cblx0ICAgICAgICBzdGF0aWNBcnJheSAoaW5kZW50ICAgICAgICAsIHN0YXRpY0FycmF5ICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ1snO1xuXHRcdGNvbnN0IGluZGVudF8gPSBpbmRlbnQgKyB0aGlzLmRvY3VtZW50LmluZGVudDtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0gc3RhdGljQXJyYXk7XG5cdFx0bGV0IGluZGV4ID0gMDtcblx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50Xztcblx0XHRcdHRoaXMudmFsdWUoaW5kZW50Xywgc3RhdGljQXJyYXlbaW5kZXgrK10gLCBmYWxzZSk7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICcsJztcblx0XHR9XG5cdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50ICsgJ10nO1xuXHR9XG5cdFxuXHQgICAgICAgIGlubGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoaW5saW5lVGFibGUpO1xuXHRcdGlmICgga2V5cy5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7ICc7XG5cdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIGlubGluZVRhYmxlLCBgYCwga2V5cyk7XG5cdFx0XHR0aGlzW3RoaXMubGVuZ3RoIC0gMV0gPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gLnNsaWNlKDAsIC0yKSArICcgfSc7XG5cdFx0fVxuXHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICd7IH0nOyB9XG5cdH1cblx0ICAgICAgICBtdWx0aWxpbmVUYWJsZSAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgICAgICAgICAgICAgICAgICAgICwgY29tbWEgICAgICAgICApIHtcblx0XHR0aGlzLmFwcGVuZElubGluZSA9ICd7Jztcblx0XHR0aGlzLmFzc2lnbk11bHRpbGluZShpbmRlbnQsIGlubGluZVRhYmxlLCBgYCwgZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSksIGNvbW1hKTtcblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnfSc7XG5cdH1cblx0ICAgICAgICBhc3NpZ25JbmxpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgLCBrZXlzXyAgICAgICAgICAgICAgICAgICAsIGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIGtleXMgKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSAgICAgICAgICAgICAgICAgPSBpbmxpbmVUYWJsZVtrZXldIDtcblx0XHRcdGNvbnN0IGtleXMgPSBrZXlzXyArICRLZXkkKGtleSk7XG5cdFx0XHRjb25zdCBiZWZvcmVfdmFsdWUgPSB0aGlzLmFwcGVuZElubGluZSA9ICRLZXlzKGtleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoaW5kZW50LCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoIC0gMV0gPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gLnNsaWNlKDAsIC1iZWZvcmVfdmFsdWUubGVuZ3RoKTtcblx0XHRcdFx0dGhpcy5hc3NpZ25JbmxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgeyB0aGlzLmFwcGVuZElubGluZSA9ICcsICc7IH1cblx0XHR9XG5cdH1cblx0ICAgICAgICBhc3NpZ25NdWx0aWxpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5kZW50ICAgICAgICAsIGlubGluZVRhYmxlICAgLCBrZXlzXyAgICAgICAgICAgICAgICAgICAsIGtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICkge1xuXHRcdGNvbnN0IGluZGVudF8gPSBpbmRlbnQgKyB0aGlzLmRvY3VtZW50LmluZGVudDtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudF8gKyAkS2V5cyhrZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKGluZGVudF8sIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdC0tdGhpcy5sZW5ndGg7XG5cdFx0XHRcdHRoaXMuYXNzaWduTXVsdGlsaW5lKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIGtleXMgKyAnLicgICAgICAgICAgICAgICAgLCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSwgY29tbWEpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbW1hXG5cdFx0XHRcdFx0PyB0aGlzLmFwcGVuZElubGluZSA9ICcsJyArIGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSlcblx0XHRcdFx0XHQ6IHRoaXMuYXBwZW5kSW5saW5lSWYgPSBnZXRDb21tZW50KGlubGluZVRhYmxlLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgQXJyYXkgZnJvbSAnLkFycmF5JztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgTUFYX1NBRkVfSU5URUdFUiBmcm9tICcuTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVInO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0IFRPTUxTZWN0aW9uIGZyb20gJy4vc2VjdGlvbic7XG5cbmNvbnN0IG5hbWUyY29kZSA9IC8qI19fUFVSRV9fKi9OdWxsKHtcblx0ZG9jdW1lbnQ6IDAsXG5cdHNlY3Rpb246IDEsXG5cdGhlYWRlcjogMixcblx0cGFpcnM6IDMsXG5cdHBhaXI6IDQsXG59ICAgICAgICAgKTtcblxuY29uc3QgeyB0ZXN0OiBJU19JTkRFTlQgfSA9IHRoZVJlZ0V4cCgvXltcXHQgXSokLyk7XG5cbmNvbnN0IHJldHVybl9mYWxzZSA9ICgpID0+IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUT01MRG9jdW1lbnQgZXh0ZW5kcyBBcnJheSAgICAgICAgICAgICAge1xuXHRcblx0ICAgICAgICAgZ2V0IFsnY29uc3RydWN0b3InXSAoKSB7IHJldHVybiBBcnJheTsgfVxuXHRcblx0MCA9IG5ldyBUT01MU2VjdGlvbih0aGlzKTtcblx0XG5cdCAgICAgICAgIGFzSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gcmV0dXJuX2ZhbHNlO1xuXHQgICAgICAgICBuZXdsaW5lICAgICAgICAgICAgICAgICAgICAgPSAnJztcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbiAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgICAgICAgICA7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlckhlYWRlciAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpciAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCAgICAgICAgIDtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyRG90dGVkICAgICAgICAgO1xuXHQgICAgICAgICBpbmRlbnQgICAgICAgICA9ICdcXHQnO1xuXHQgICAgICAgICBUICAgICAgICAgICAgICAgICAgPSAnVCc7XG5cdCAgICAgICAgIFogICAgICAgICAgICA9ICdaJztcblx0ICAgICAgICAgbnVsbERpc2FibGVkICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbXVsdGlsaW5lVGFibGVEaXNhYmxlZCAgICAgICAgICA9IHRydWU7XG5cdCAgICAgICAgIG11bHRpbGluZVRhYmxlQ29tbWEgICAgICAgICAgO1xuXHQgICAgICAgICBwcmVmZXJDb21tZW50Rm9yVGhpcyAgICAgICAgICA9IGZhbHNlO1xuXHQgICAgICAgICAkc2luZ2xlbGluZUFycmF5ICAgICAgICAgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0XG5cdFx0c3VwZXIoKTtcblx0XHRcblx0XHRjb25zdCBpbnRlZ2VyID0gb3B0aW9ucz8uaW50ZWdlcjtcblx0XHRpZiAoIGludGVnZXI9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBpbnRlZ2VyPT09TUFYX1NBRkVfSU5URUdFUiApIHsgdGhpcy5hc0ludGVnZXIgPSBpc1NhZmVJbnRlZ2VyOyB9XG5cdFx0ZWxzZSBpZiAoIHR5cGVvZiBpbnRlZ2VyPT09J251bWJlcicgKSB7XG5cdFx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKGludGVnZXIpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2ludGVnZXJ9KSBjYW4gb25seSBiZSBhIHNhZmUgaW50ZWdlcmApOyB9XG5cdFx0XHRjb25zdCBtYXggPSBpbnRlZ2VyPj0wID8gaW50ZWdlciA6IC1pbnRlZ2VyIC0gMTtcblx0XHRcdGNvbnN0IG1pbiA9IGludGVnZXI+PTAgPyAtaW50ZWdlciA6IGludGVnZXI7XG5cdFx0XHR0aGlzLmFzSW50ZWdlciA9IChudW1iZXIgICAgICAgICkgPT4gaXNTYWZlSW50ZWdlcihudW1iZXIpICYmIG1pbjw9bnVtYmVyICYmIG51bWJlcjw9bWF4O1xuXHRcdH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse2ludGVnZXJ9KSBjYW4gb25seSBiZSBudW1iZXJgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IG5ld2xpbmUgPSBvcHRpb25zPy5uZXdsaW5lO1xuXHRcdGlmICggbmV3bGluZT09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIG5ld2xpbmU9PT0nXFxuJyB8fCBuZXdsaW5lPT09J1xcclxcbicgKSB7IHRoaXMubmV3bGluZSA9IG5ld2xpbmU7IH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IHR5cGVvZiBuZXdsaW5lPT09J3N0cmluZydcblx0XHRcdFx0PyBTeW50YXhFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lfSkgY2FuIG9ubHkgYmUgdmFsaWQgVE9NTCBuZXdsaW5lYClcblx0XHRcdFx0OiBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZX0pIGNhbiBvbmx5IGJlIHN0cmluZ2ApO1xuXHRcdH1cblx0XHRcblx0XHRjb25zdCBwcmVmZXJDb21tZW50Rm9yID0gb3B0aW9ucz8ucHJlZmVyQ29tbWVudEZvcjtcblx0XHRpZiAoIHByZWZlckNvbW1lbnRGb3I9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBwcmVmZXJDb21tZW50Rm9yPT09J3RoaXMnIHx8IHByZWZlckNvbW1lbnRGb3I9PT0na2V5JyApIHsgdGhpcy5wcmVmZXJDb21tZW50Rm9yVGhpcyA9IHByZWZlckNvbW1lbnRGb3I9PT0ndGhpcyc7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse3ByZWZlckNvbW1lbnRGb3IpIGNhbiBvbmx5IGJlICdrZXknIG9yICd0aGlzJ2ApOyB9XG5cdFx0XG5cdFx0Y29uc3QgYXJvdW5kID0gbmFtZTJjb2RlW29wdGlvbnM/Lm5ld2xpbmVBcm91bmQgPz8gJ2hlYWRlciddID8/IG5hbWUyY29kZS5oZWFkZXI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJTZWN0aW9uID0gYXJvdW5kPjA7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciA9IGFyb3VuZD09PTEgfHwgYXJvdW5kPT09Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlckhlYWRlciA9IGFyb3VuZD4xO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyUGFpciA9IGFyb3VuZD4yO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyUGFpckJ1dERvdHRlZCA9IGFyb3VuZD09PTM7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJEb3R0ZWQgPSBhcm91bmQ+Mztcblx0XHRcblx0XHRjb25zdCBpbmRlbnQgPSBvcHRpb25zPy5pbmRlbnQ7XG5cdFx0aWYgKCBpbmRlbnQ9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW5kZW50PT09J3N0cmluZycgKSB7XG5cdFx0XHRpZiAoICFJU19JTkRFTlQoaW5kZW50KSApIHsgdGhyb3cgU3ludGF4RXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50fSkgY2FuIG9ubHkgaW5jbHVkZSBUYWIgb3IgU3BhY2VgKTsgfVxuXHRcdFx0dGhpcy5pbmRlbnQgPSBpbmRlbnQ7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW5kZW50PT09J251bWJlcicgKSB7XG5cdFx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKGluZGVudCkgKSB7IHRocm93IFJhbmdlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50OiR7aW5kZW50fX0pIGlzIG91dCBvZiByYW5nZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9ICcgJy5yZXBlYXQoaW5kZW50KTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gbm90IGJlIFwiJHt0eXBlb2YgaW5kZW50fVwiIHR5cGVgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IFQgPSBvcHRpb25zPy5UO1xuXHRcdGlmICggVD09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIFQ9PT0nICcgfHwgVD09PSd0JyB8fCBUPT09J1QnICkgeyB0aGlzLlQgPSBUOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtUfSkgY2FuIG9ubHkgYmUgXCJUXCIgb3IgXCIgXCIgb3IgXCJ0XCJgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IFogPSBvcHRpb25zPy5aO1xuXHRcdGlmICggWj09PXVuZGVmaW5lZCApIHt9XG5cdFx0ZWxzZSBpZiAoIFo9PT0neicgfHwgWj09PSdaJyApIHsgdGhpcy5aID0gWjsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7Wn0pIGNhbiBvbmx5IGJlIFwiWlwiIG9yIFwielwiYCk7IH1cblx0XHRcblx0XHRpZiAoIG9wdGlvbnM/LnhOdWxsICkgeyB0aGlzLm51bGxEaXNhYmxlZCA9IGZhbHNlOyB9XG5cdFx0XG5cdFx0Y29uc3QgeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlID0gb3B0aW9ucz8ueEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlO1xuXHRcdGlmICggeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09JycgfHwgeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09JywnICkge1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZURpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlQ29tbWEgPSAhIXhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHt4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGV9KSBjYW4gb25seSBiZSBcIlwiIG9yIFwiLFwiYCk7IH1cblx0XHRcblx0XHRjb25zdCAkc2luZ2xlbGluZUFycmF5ID0gb3B0aW9ucz8uZm9yY2VJbmxpbmVBcnJheVNwYWNpbmc7XG5cdFx0c3dpdGNoICggJHNpbmdsZWxpbmVBcnJheSApIHtcblx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMDpcblx0XHRcdGNhc2UgMTpcblx0XHRcdGNhc2UgMjpcblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0dGhpcy4kc2luZ2xlbGluZUFycmF5ID0gJHNpbmdsZWxpbmVBcnJheTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyB0eXBlb2YgJHNpbmdsZWxpbmVBcnJheT09PSdudW1iZXInXG5cdFx0XHRcdFx0PyBSYW5nZUVycm9yKGBhcnJheSBpbmxpbmUgbW9kZSBtdXN0IGJlIDAgfCAxIHwgMiB8IDMsIG5vdCBpbmNsdWRpbmcgJHskc2luZ2xlbGluZUFycmF5fWApXG5cdFx0XHRcdFx0OiBUeXBlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgXCJudW1iZXJcIiB0eXBlLCBub3QgaW5jbHVkaW5nICR7JHNpbmdsZWxpbmVBcnJheT09PW51bGwgPyAnXCJudWxsXCInIDogdHlwZW9mICRzaW5nbGVsaW5lQXJyYXl9YCk7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiB0aGlzO1xuXHRcdFxuXHR9XG5cdFxuXHRhcHBlbmRTZWN0aW9uICgpIHsgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGhdID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpOyB9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemUnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXknO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuXG5pbXBvcnQgeyB4IH0gZnJvbSAnLi4vai1sZXhlcic7Ly8vIGV4dGVybmFsXG5cbmltcG9ydCBUT01MRG9jdW1lbnQgZnJvbSAnLi9kb2N1bWVudCc7XG5jb25zdCBsaW5lc0Zyb21TdHJpbmdpZnkgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAgICAoKTtcbmNvbnN0IGJlTGluZXNGcm9tU3RyaW5naWZ5ID0gLyojX19QVVJFX18qL2FkZC5iaW5kKGxpbmVzRnJvbVN0cmluZ2lmeSk7XG5leHBvcnQgY29uc3QgaXNMaW5lc0Zyb21TdHJpbmdpZnkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQobGluZXNGcm9tU3RyaW5naWZ5KTtcbmV4cG9ydCBkZWZhdWx0IChyb290VGFibGUgICAgICAgICAgICAgICAgLCBvcHRpb25zICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCBkb2N1bWVudCA9IG5ldyBUT01MRG9jdW1lbnQob3B0aW9ucyk7XG5cdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudFswXTtcblx0c2VjdGlvblswXSA9ICcnO1xuXHR4ICAgICAgKHNlY3Rpb24uYXNzaWduQmxvY2soYGAsIGBgLCByb290VGFibGUsIGdldE93blByb3BlcnR5TmFtZXMocm9vdFRhYmxlKSkpO1xuXHRkb2N1bWVudC5uZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTEgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdGRvY3VtZW50Lm5ld2xpbmVVbmRlclNlY3Rpb24gfHwgZG9jdW1lbnRbZG9jdW1lbnQubGVuZ3RoIC0gMV0gLmFwcGVuZE5ld2xpbmUoKTtcblx0aWYgKCBkb2N1bWVudC5uZXdsaW5lICkgeyByZXR1cm4gZG9jdW1lbnQuam9pbihkb2N1bWVudC5uZXdsaW5lKTsgfVxuXHRjb25zdCBsaW5lcyA9IGRvY3VtZW50LmZsYXQoKTtcblx0YmVMaW5lc0Zyb21TdHJpbmdpZnkobGluZXMpO1xuXHRyZXR1cm4gbGluZXM7XG59O1xuXG5leHBvcnQgeyBpbmxpbmUsIFNlY3Rpb24gfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5leHBvcnQgeyBfbGl0ZXJhbCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgbXVsdGlsaW5lVGFibGUsIG11bHRpbGluZUFycmF5IH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgc2luZ2xlbGluZUJhc2ljU3RyaW5nLCBMaW5lcywgbXVsdGlsaW5lU3RyaW5nLCBtdWx0aWxpbmVCYXNpY1N0cmluZywgbXVsdGlsaW5lTGl0ZXJhbFN0cmluZywgbXVsdGlsaW5lTmVlZEJhc2ljIH0gZnJvbSAnLi9zdHJpbmcnO1xuZXhwb3J0IGNvbnN0IG11bHRpbGluZSA9IC8qI19fUFVSRV9fKi8oICgpID0+IHtcblx0Y29uc3QgbXVsdGlsaW5lID0gKHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdHJpbmcgICAgICAgICApID0+XG5cdFx0dHlwZW9mIHZhbHVlPT09J3N0cmluZycgPyBMaXRlcmFsT2JqZWN0KCggbXVsdGlsaW5lTmVlZEJhc2ljKHZhbHVlKSA/IG11bHRpbGluZUJhc2ljU3RyaW5nIDogbXVsdGlsaW5lTGl0ZXJhbFN0cmluZyApKCggJ1xcbicgKyB2YWx1ZSApLnNwbGl0KCdcXG4nKSAgICAgICAgICksIHZhbHVlKSA6XG5cdFx0XHRpc0FycmF5KHZhbHVlKSA/IExpdGVyYWxPYmplY3QobXVsdGlsaW5lU3RyaW5nKExpbmVzKHZhbHVlKSksIHR5cGVvZiBzdHJpbmc9PT0nc3RyaW5nJyA/IHN0cmluZyA6IE51bGwobnVsbCkpIDpcblx0XHRcdFx0bXVsdGlsaW5lVGFibGUodmFsdWUpO1xuXHRtdWx0aWxpbmUuYmFzaWMgPSAobGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdHJpbmcgICAgICAgICApID0+XG5cdFx0dHlwZW9mIGxpbmVzPT09J3N0cmluZydcblx0XHRcdD8gTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVCYXNpY1N0cmluZygoICdcXG4nICsgbGluZXMgKS5zcGxpdCgnXFxuJykgICAgICAgICApLCBsaW5lcylcblx0XHRcdDogTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVCYXNpY1N0cmluZyhMaW5lcyhsaW5lcykpLCB0eXBlb2Ygc3RyaW5nPT09J3N0cmluZycgPyBzdHJpbmcgOiBOdWxsKG51bGwpKVxuXHQ7XG5cdG11bHRpbGluZS5hcnJheSA9IG11bHRpbGluZUFycmF5O1xuXHRmcmVlemUobXVsdGlsaW5lKTtcblx0cmV0dXJuIG11bHRpbGluZTtcbn0gKSgpO1xuZXhwb3J0IGNvbnN0IGJhc2ljID0gKHZhbHVlICAgICAgICApID0+IExpdGVyYWxPYmplY3Qoc2luZ2xlbGluZUJhc2ljU3RyaW5nKHZhbHVlKSwgdmFsdWUpO1xuZXhwb3J0IGNvbnN0IGxpdGVyYWwgPSAobGl0ZXJhbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIC4uLmNoYXJzICAgICAgICAgICkgPT4ge1xuXHRpZiAoIHR5cGVvZiBsaXRlcmFsPT09J3N0cmluZycgKSB7XG5cdFx0aWYgKCBjaGFycy5sZW5ndGg9PT0xICkge1xuXHRcdFx0cmV0dXJuIExpdGVyYWxPYmplY3QobGl0ZXJhbC5pbmNsdWRlcygnXFxuJykgPyBsaXRlcmFsLnNwbGl0KCdcXG4nKSAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxpdGVyYWwsIGNoYXJzWzBdICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdGxldCBpbmRleCA9IGNoYXJzLmxlbmd0aDtcblx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0Y29uc3QgeyByYXcgfSA9IGxpdGVyYWw7XG5cdFx0XHRsaXRlcmFsID0gcmF3W2luZGV4XSA7XG5cdFx0XHR3aGlsZSAoIGluZGV4ICkgeyBjaGFyc1stLWluZGV4XSArPSByYXdbaW5kZXhdIDsgfVxuXHRcdFx0bGl0ZXJhbCA9IGNoYXJzLmpvaW4oJycpICsgbGl0ZXJhbDtcblx0XHR9XG5cdFx0ZWxzZSB7IGxpdGVyYWwgPSBsaXRlcmFsLnJhd1swXSA7IH1cblx0fVxuXHRyZXR1cm4gTGl0ZXJhbE9iamVjdChsaXRlcmFsLmluY2x1ZGVzKCdcXG4nKSA/IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbGl0ZXJhbCwgTnVsbChudWxsKSk7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBpc1ZpZXcgZnJvbSAnLkFycmF5QnVmZmVyLmlzVmlldyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgYXNzaWduIGZyb20gJy5PYmplY3QuYXNzaWduJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE51bGwgZnJvbSAnLm51bGwnO1xuaW1wb3J0IGlzQXJyYXlCdWZmZXIgZnJvbSAnLmNsYXNzLmlzQXJyYXlCdWZmZXInO1xuaW1wb3J0IFRleHREZWNvZGVyIGZyb20gJy5UZXh0RGVjb2Rlcic7XG5cbmltcG9ydCB7IGNsZWFyUmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcbmltcG9ydCBSb290IGZyb20gJy4vbGV2ZWwtbG9vcCc7XG5pbXBvcnQgeyBpc0xpbmVzRnJvbVN0cmluZ2lmeSB9IGZyb20gJy4uL3N0cmluZ2lmeS8nO1xuXG5jb25zdCB0ZXh0RGVjb2RlciA9IC8qI19fUFVSRV9fKi9uZXcgVGV4dERlY29kZXIoJ3V0Zi04JywgTnVsbCh7IGZhdGFsOiB0cnVlLCBpZ25vcmVCT006IGZhbHNlIH0pKTtcbmNvbnN0IGJpbmFyeTJzdHJpbmcgPSAoYXJyYXlCdWZmZXJMaWtlICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgPT4ge1xuXHRpZiAoIGlzVmlldyhhcnJheUJ1ZmZlckxpa2UpID8gYXJyYXlCdWZmZXJMaWtlLmxlbmd0aCE9PWFycmF5QnVmZmVyTGlrZS5ieXRlTGVuZ3RoIDogIWlzQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXJMaWtlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBvbmx5IFVpbnQ4QXJyYXkgb3IgQXJyYXlCdWZmZXIgaXMgYWNjZXB0YWJsZWApOyB9XG5cdHRyeSB7IHJldHVybiB0ZXh0RGVjb2Rlci5kZWNvZGUoYXJyYXlCdWZmZXJMaWtlKTsgfVxuXHRjYXRjaCB7IHRocm93IEVycm9yKGBBIFRPTUwgZG9jIG11c3QgYmUgYSAoZnVsLXNjYWxhcikgdmFsaWQgVVRGLTggZmlsZSwgd2l0aG91dCBhbnkgdW5rbm93biBjb2RlIHBvaW50LmApOyB9XG59O1xuY29uc3QgaXNCaW5hcnlMaWtlID0gKHZhbHVlICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gJ2J5dGVMZW5ndGgnIGluIHZhbHVlOy8vL1xuXG5jb25zdCB7IHRlc3Q6IGluY2x1ZGVzTm9uU2NhbGFyIH0gPSB0aGVSZWdFeHAoL1tcXHVEODAwLVxcdURGRkZdL3UpO1xuY29uc3QgYXNzZXJ0RnVsU2NhbGFyID0gKHN0cmluZyAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggY2xlYXJSZWdFeHAoaW5jbHVkZXNOb25TY2FsYXIoc3RyaW5nKSkgKSB7IHRocm93IEVycm9yKGBBIFRPTUwgZG9jIG11c3QgYmUgYSAoZnVsLXNjYWxhcikgdmFsaWQgVVRGLTggZmlsZSwgd2l0aG91dCBhbnkgdW5jb3VwbGVkIFVDUy00IGNoYXJhY3RlciBjb2RlLmApOyB9XG59O1xuXG5sZXQgaG9sZGluZyAgICAgICAgICA9IGZhbHNlO1xuXG5jb25zdCBwYXJzZSA9IChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+IHtcblx0bGV0IHNvdXJjZVBhdGggICAgICAgICA9ICcnO1xuXHRpZiAoIHR5cGVvZiBzb3VyY2U9PT0nb2JqZWN0JyAmJiBzb3VyY2UgKSB7XG5cdFx0aWYgKCBpc0FycmF5KHNvdXJjZSkgKSB7IHRocm93IFR5cGVFcnJvcihpc0xpbmVzRnJvbVN0cmluZ2lmeShzb3VyY2UpID8gYFRPTUwucGFyc2UoYXJyYXkgZnJvbSBUT01MLnN0cmluZ2lmeSgse25ld2xpbmU/fSkpYCA6IGBUT01MLnBhcnNlKGFycmF5KWApOyB9XG5cdFx0ZWxzZSBpZiAoIGlzQmluYXJ5TGlrZShzb3VyY2UpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKHNvdXJjZSk7IH1cblx0XHRlbHNlIHtcblx0XHRcdHNvdXJjZVBhdGggPSBzb3VyY2UucGF0aDtcblx0XHRcdGlmICggdHlwZW9mIHNvdXJjZVBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5wYXRoKWApOyB9XG5cdFx0XHRjb25zdCB7IGRhdGEsIHJlcXVpcmU6IHJlcSA9IHR5cGVvZiByZXF1aXJlPT09J2Z1bmN0aW9uJyA/IHJlcXVpcmUgOiB1bmRlZmluZWQgfSA9IHNvdXJjZTtcblx0XHRcdGlmICggcmVxICkge1xuXHRcdFx0XHRjb25zdCBkaXJuYW1lXyA9IHJlcS5yZXNvbHZlPy5wYXRocz8uKCcnKT8uWzBdPy5yZXBsYWNlKC9ub2RlX21vZHVsZXMkLywgJycpO1xuXHRcdFx0XHRpZiAoIGRpcm5hbWVfICkge1xuXHRcdFx0XHRcdHNvdXJjZVBhdGggPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoJ3BhdGgnKS5yZXNvbHZlKGRpcm5hbWVfLCBzb3VyY2VQYXRoKTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucmVxdWlyZSgncGF0aCcpLnJlc29sdmUpYCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9ICggcmVxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKCdmcycpLnJlYWRGaWxlU3luYyhzb3VyY2VQYXRoKTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0JpbmFyeUxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5yZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYylgKTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBhc3NlcnRGdWxTY2FsYXIoc291cmNlID0gZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0JpbmFyeUxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UuZGF0YSlgKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggZGF0YT09PXVuZGVmaW5lZCApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZS5kYXRhfHNvdXJjZS5yZXF1aXJlKWApOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdzdHJpbmcnICkgeyBhc3NlcnRGdWxTY2FsYXIoc291cmNlID0gZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhPT09J29iamVjdCcgJiYgZGF0YSAmJiBpc0JpbmFyeUxpa2UoZGF0YSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoZGF0YSk7IH1cblx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UuZGF0YSlgKTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHNvdXJjZT09PSdzdHJpbmcnICkgeyBhc3NlcnRGdWxTY2FsYXIoc291cmNlKTsgfVxuXHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHNvdXJjZSlgKTsgfVxuXHRpZiAoIHR5cGVvZiBtdWx0aWxpbmVTdHJpbmdKb2luZXI9PT0nb2JqZWN0JyAmJiBtdWx0aWxpbmVTdHJpbmdKb2luZXIgKSB7XG5cdFx0aWYgKCB1c2VCaWdJbnQhPT11bmRlZmluZWQgfHwgeE9wdGlvbnMhPT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcihgb3B0aW9ucyBtb2RlID8gYXJncyBtb2RlYCk7IH1cblx0XHRsZXQgam9pbmVyICAgICAgICAgICAgICAgICAgICA7XG5cdFx0aWYgKCBoYXNPd24obXVsdGlsaW5lU3RyaW5nSm9pbmVyLCAnam9pbmVyJykgKSB7IGpvaW5lciA9IG11bHRpbGluZVN0cmluZ0pvaW5lci5qb2luZXI7IH1cblx0XHRpZiAoIGhhc093bihtdWx0aWxpbmVTdHJpbmdKb2luZXIsICdiaWdpbnQnKSApIHsgdXNlQmlnSW50ID0gbXVsdGlsaW5lU3RyaW5nSm9pbmVyLmJpZ2ludDsgfVxuXHRcdGlmICggaGFzT3duKG11bHRpbGluZVN0cmluZ0pvaW5lciwgJ3gnKSApIHsgeE9wdGlvbnMgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIueDsgfVxuXHRcdG11bHRpbGluZVN0cmluZ0pvaW5lciA9IGpvaW5lcjtcblx0fVxuXHRsZXQgcm9vdFRhYmxlICAgICAgIDtcblx0bGV0IHByb2Nlc3MgICAgICAgICAgICAgICAgIDtcblx0aWYgKCBob2xkaW5nICkgeyB0aHJvdyBFcnJvcihgcGFyc2luZyBkdXJpbmcgcGFyc2luZy5gKTsgfVxuXHRob2xkaW5nID0gdHJ1ZTtcblx0dHJ5IHtcblx0XHRvcHRpb25zLnVzZShzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKTtcblx0XHRpdGVyYXRvci50b2RvKHNvdXJjZSwgc291cmNlUGF0aCk7XG5cdFx0c291cmNlICYmIHNvdXJjZVswXT09PSdcXHVGRUZGJyAmJiBpdGVyYXRvci50aHJvd3MoVHlwZUVycm9yKGBUT01MIGNvbnRlbnQgKHN0cmluZykgc2hvdWxkIG5vdCBzdGFydCB3aXRoIEJPTSAoVStGRUZGKWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0cm9vdFRhYmxlID0gUm9vdCgpO1xuXHRcdHByb2Nlc3MgPSBvcHRpb25zLlByb2Nlc3MoKTtcblx0fVxuXHRmaW5hbGx5IHtcblx0XHRpdGVyYXRvci5kb25lKCk7Ly9jbGVhcldlYWtTZXRzKCk7XG5cdFx0Y2xlYXJSZWdFeHAoKTtcblx0XHRvcHRpb25zLmNsZWFyKCk7XG5cdFx0aG9sZGluZyA9IGZhbHNlO1xuXHR9XG5cdHByb2Nlc3M/LigpO1xuXHRyZXR1cm4gcm9vdFRhYmxlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL2Fzc2lnbihcblx0KHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT5cblx0XHR0eXBlb2Ygc3BlY2lmaWNhdGlvblZlcnNpb249PT0nbnVtYmVyJ1xuXHRcdFx0PyBwYXJzZShzb3VyY2UsIHNwZWNpZmljYXRpb25WZXJzaW9uLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpXG5cdFx0XHQ6IHBhcnNlKHNvdXJjZSwgMS4wLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICApXG5cdCxcblx0e1xuXHRcdCcxLjAnOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQxLjA6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMS4wLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuNTogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjUsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC40OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNCwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0XHQwLjM6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4zLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMpLFxuXHRcdDAuMjogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjIsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucyksXG5cdFx0MC4xOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zKSxcblx0fVxuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0IFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0IFxuXHQgIFxuICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcblxuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UvJztcbmltcG9ydCBzdHJpbmdpZnksIHsgU2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsIH0gZnJvbSAnLi9zdHJpbmdpZnkvJztcbmltcG9ydCB7IE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSB9IGZyb20gJy4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgaXNJbmxpbmUsIGlzU2VjdGlvbiB9IGZyb20gJy4vdHlwZXMvbm9uLWF0b20nO1xuaW1wb3J0IHsgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMgfSBmcm9tICcuL3R5cGVzL2NvbW1lbnQnO1xuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdCc7XG5leHBvcnQgZGVmYXVsdCAvKiNfX1BVUkVfXyovRGVmYXVsdCh7XG5cdHZlcnNpb24sXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG5cdFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCwgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMsXG5cdE9mZnNldERhdGVUaW1lLCBMb2NhbERhdGVUaW1lLCBMb2NhbERhdGUsIExvY2FsVGltZSxcblx0aXNJbmxpbmUsIGlzU2VjdGlvbixcbn0pO1xuXG5leHBvcnQge1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwsIGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG59O1xuIl0sIm5hbWVzIjpbIlByb3h5IiwiT2JqZWN0X2ZyZWV6ZSIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJzZXRfaGFzIiwic2V0X2FkZCIsImRlbCIsIk51bGwiLCJvcmRlcmlmeV9OdWxsIiwiaXRlcmF0b3IudGhyb3dzIiwiaXRlcmF0b3Iud2hlcmUiLCJnZXQiLCJzZXQiLCJjcmVhdGUiLCJyZWdleHBzLnN3aXRjaFJlZ0V4cCIsIk9iamVjdCIsImZyZWV6ZSIsIm93bktleXMiLCJvcHRpb25zLnplcm9EYXRldGltZSIsInBhcnNlIiwib3B0aW9ucy5tdXN0U2NhbGFyIiwiaXRlcmF0b3IubGluZUluZGV4IiwiVU5ERVJTQ09SRVMiLCJvcHRpb25zLmFsbG93TG9uZ2VyIiwib3B0aW9ucy51c2luZ0JpZ0ludCIsIm9wdGlvbnMuSW50ZWdlck1pbk51bWJlciIsIm9wdGlvbnMuSW50ZWdlck1heE51bWJlciIsIk5hTiIsIl9JbmZpbml0eSIsIm9wdGlvbnMuc0Zsb2F0Iiwib3B0aW9ucy5zRXJyb3IiLCJvcHRpb25zLlRhYmxlIiwib3B0aW9ucy5jb2xsZWN0IiwicmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCIsInJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyIsIm9wdGlvbnMucHJlc2VydmVMaXRlcmFsIiwicmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyIsIml0ZXJhdG9yLm1hcmsiLCJvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmciLCJyZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgiLCJyZWdleHBzLlBSRV9XSElURVNQQUNFIiwicmVnZXhwcy5NVUxUSV9MSU5FX0JBU0lDX1NUUklOR19leGVjXzBfbGVuZ3RoIiwicmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdCIsInJlZ2V4cHMuX19MSVRFUkFMX0tFWV9leGVjIiwicmVnZXhwcy5fX0JBUkVfS0VZX2V4ZWMiLCJyZWdleHBzLklTX0RPVF9LRVkiLCJyZWdleHBzLkRPVF9LRVkiLCJvcHRpb25zLmRpc2FibGVEaWdpdCIsInJlZ2V4cHMuaXNBbWF6aW5nIiwib3B0aW9ucy5lbmFibGVOdWxsIiwib3B0aW9ucy5kaXNhbGxvd0VtcHR5S2V5IiwicmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjIiwib3B0aW9ucy5hc1N0cmluZ3MiLCJvcHRpb25zLmlubGluZVRhYmxlIiwib3B0aW9ucy5hc1RhYmxlcyIsIm9wdGlvbnMuYXNBcnJheXMiLCJyZWdleHBzLlZBTFVFX1JFU1RfZXhlYyIsIm9wdGlvbnMuYXNCb29sZWFucyIsIm9wdGlvbnMuYXNOdWxscyIsIm9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMiLCJvcHRpb25zLm1vcmVEYXRldGltZSIsIm9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyIsIm9wdGlvbnMuYXNMb2NhbFRpbWVzIiwib3B0aW9ucy5hc0xvY2FsRGF0ZXMiLCJvcHRpb25zLmFzRmxvYXRzIiwib3B0aW9ucy5hc0ludGVnZXJzIiwicmVnZXhwcy5TWU1fV0hJVEVTUEFDRSIsIm9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSIsIm9wdGlvbnMucHJlc2VydmVDb21tZW50IiwicmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyIsIml0ZXJhdG9yLnJlc3QiLCJpdGVyYXRvci5uZXh0IiwicmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzIiwiZnJvbUVudHJpZXMiLCJEQVRFIiwiY2xlYXJSZWdFeHAiLCJvcHRpb25zLnVzZSIsIml0ZXJhdG9yLnRvZG8iLCJvcHRpb25zLlByb2Nlc3MiLCJpdGVyYXRvci5kb25lIiwib3B0aW9ucy5jbGVhciIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFjLFFBQVE7Ozs7Ozs7Ozs7Ozs7QUNJZixJQUFJLElBQUksNkNBQTZDLElBQUk7QUFDaEUsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRO0FBQ3RDLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDakIsRUFBRSxPQUFPLFVBQVUsTUFBTSxFQUFFO0FBQzNCLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxN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