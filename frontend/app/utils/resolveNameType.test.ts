import { describe, it, expect } from 'vitest';
import { resolveNameType, type NameTypeToResolve } from './resolveNameType';

describe('resolveNameType', () => {
  it('should return item.name if it is a string', () => {
    const item = { name: 'Simple Name' };
    expect(resolveNameType(item)).toBe('Simple Name');
  });

  it('should return item.commonName if it is a string', () => {
    const item = { commonName: 'Common Name' };
    expect(resolveNameType(item)).toBe('Common Name');
  });

  it('should return item.commonName.default if it exists', () => {
    const item = { commonName: { default: 'Common Default' } };
    expect(resolveNameType(item)).toBe('Common Default');
  });

  it('should return item.name.default if it exists and commonName does not', () => {
    const item = { name: { default: 'Name Default' } };
    expect(resolveNameType(item)).toBe('Name Default');
  });

  it('should prioritize item.name as a string over other properties', () => {
    const item = {
      name: 'Priority Name',
      commonName: 'Common Name',
      nameObject: { default: 'Name Default' },
    };
    expect(resolveNameType(item)).toBe('Priority Name');
  });

  it('should prioritize item.commonName over item.name.default', () => {
    const item = {
      commonName: 'Common Name',
      name: { default: 'Name Default' },
    };
    expect(resolveNameType(item)).toBe('Common Name');
  });

  it('should return an empty string if no valid name property is found', () => {
    const item = {};
    expect(resolveNameType(item)).toBe('');
  });

  it('should return an empty string for complex but invalid objects', () => {
    const item = { name: { notDefault: 'Invalid' } };
    expect(resolveNameType(item as unknown as NameTypeToResolve)).toBe('');
  });
});
