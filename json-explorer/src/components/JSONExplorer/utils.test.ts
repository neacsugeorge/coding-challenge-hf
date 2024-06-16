import {describe, expect, test} from 'vitest';
import {previewValueAtPath} from './utils';

describe('previewValueAtPath', () => {
    const jsonData = {
        function: () => {},
        emptyString: '',
        string: 'ABCD',
        number: 1234,
        boolean: false,
        object: {},
        null: null as string,
    };

    test('should return \'undefined\' if path doesn\'t start with res', () => {
        expect(previewValueAtPath(jsonData, 'function')).toBe('undefined');
    });
    test('should return \'undefined\' if value is function', () => {
        expect(previewValueAtPath(jsonData, 'res.function')).toBe('undefined');
    });
    test('should return \'undefined\' if value is object', () => {
        expect(previewValueAtPath(jsonData, 'res.object')).toBe('undefined');
    });
    test('should return \'\' if value is empty string', () => {
        expect(previewValueAtPath(jsonData, 'res.emptyString')).toBe('\'\'');
    });
    test('should return string value correctly', () => {
        expect(previewValueAtPath(jsonData, 'res.string')).toBe('ABCD');
    });
    test('should return number value correctly', () => {
        expect(previewValueAtPath(jsonData, 'res.number')).toBe('1234');
    });
    test('should return boolean value correctly', () => {
        expect(previewValueAtPath(jsonData, 'res.boolean')).toBe('false');
    });
    test('should return null correctly', () => {
        expect(previewValueAtPath(jsonData, 'res.null')).toBe('null');
    });
});