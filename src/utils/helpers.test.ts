// Example unit tests for utility functions
import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatDateRange, slugify, truncate, getInitials } from '@/utils/helpers';

describe('helpers', () => {
  describe('cn', () => {
    it('joins class names', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
    });

    it('merges tailwind classes correctly', () => {
      expect(cn('p-2 p-4', 'm-2')).toBe('p-4 m-2');
    });
  });

  describe('formatDate', () => {
    it('formats YYYY-MM correctly', () => {
      expect(formatDate('2024-01')).toBe('enero de 2024');
    });

    it('handles invalid input gracefully', () => {
      expect(formatDate('invalid')).toBe('invalid');
    });
  });

  describe('formatDateRange', () => {
    it('formats range with end date', () => {
      expect(formatDateRange('2023-01', '2024-12')).toContain('2023');
      expect(formatDateRange('2023-01', '2024-12')).toContain('2024');
    });

    it('shows "Presente" when no end date', () => {
      expect(formatDateRange('2023-01')).toContain('Presente');
    });
  });

  describe('slugify', () => {
    it('converts to lowercase and replaces spaces', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Test @#$%^&*()')).toBe('test');
    });

    it('handles accents', () => {
      expect(slugify('café')).toBe('cafe');
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello…');
    });

    it('returns original if shorter', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });
  });

  describe('getInitials', () => {
    it('returns first letters of each word', () => {
      expect(getInitials('John Chitan')).toBe('JC');
    });

    it('handles single word', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('limits to 2 characters', () => {
      expect(getInitials('John Deivid Chitan')).toBe('JD');
    });
  });
});
