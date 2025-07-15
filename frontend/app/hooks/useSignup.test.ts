import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSignup } from './useSignup';
import * as signupService from '~/services/backendServices/signupService';
import * as navigation from '~/utils/navigateToHome';
import Cookies from 'js-cookie';

vi.mock('~/services/backendServices/signupService');
vi.mock('~/utils/navigateToHome');
vi.mock('js-cookie');

describe('useSignup', () => {
  it('should call signupService, set cookie, and navigateToHome on successful signup', async () => {
    const signupServiceSpy = vi
      .spyOn(signupService, 'signupServiceService')
      .mockResolvedValue('test-token');
    const navigateToHomeSpy = vi.spyOn(navigation, 'navigateToHome');
    const cookieSpy = vi.spyOn(Cookies, 'set');
    global.alert = vi.fn();

    const { result } = renderHook(() => useSignup());

    result.current.setFieldValue('name', 'Test User');
    result.current.setFieldValue('email', 'test@example.com');
    result.current.setFieldValue('password', 'password');

    await result.current.handleSubmit();

    expect(signupServiceSpy).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
    expect(cookieSpy).toHaveBeenCalledWith('token', 'test-token', {
      secure: true,
      sameSite: 'Strict',
    });
    expect(global.alert).toHaveBeenCalledWith('Signup successful!');
    expect(navigateToHomeSpy).toHaveBeenCalled();
  });

  it('should not set cookie or navigate on failed signup', async () => {
    const signupServiceSpy = vi
      .spyOn(signupService, 'signupServiceService')
      .mockResolvedValue(false);
    const navigateToHomeSpy = vi.spyOn(navigation, 'navigateToHome');
    const cookieSpy = vi.spyOn(Cookies, 'set');

    const { result } = renderHook(() => useSignup());

    result.current.setFieldValue('name', 'Test User');
    result.current.setFieldValue('email', 'test@example.com');
    result.current.setFieldValue('password', 'password');

    await result.current.handleSubmit();

    expect(signupServiceSpy).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
    expect(cookieSpy).not.toHaveBeenCalled();
    expect(navigateToHomeSpy).not.toHaveBeenCalled();
  });
});
