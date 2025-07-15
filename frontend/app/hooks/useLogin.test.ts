import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLogin } from './useLogin';
import * as loginService from '~/services/backendServices/loginService';
import * as navigation from '~/utils/navigateToHome';

vi.mock('~/services/backendServices/loginService');
vi.mock('~/utils/navigateToHome');

describe('useLogin', () => {
  it('should call loginService and navigateToHome on successful login', async () => {
    const loginServiceSpy = vi.spyOn(loginService, 'loginService').mockResolvedValue(true);
    const navigateToHomeSpy = vi.spyOn(navigation, 'navigateToHome');
    global.alert = vi.fn();

    const { result } = renderHook(() => useLogin());

    result.current.setFieldValue('email', 'test@example.com');
    result.current.setFieldValue('password', 'password');

    await result.current.handleSubmit();

    expect(loginServiceSpy).toHaveBeenCalledWith('test@example.com', 'password');
    expect(global.alert).toHaveBeenCalledWith('Login successful!');
    expect(navigateToHomeSpy).toHaveBeenCalled();
  });

  it('should log an error on failed login', async () => {
    const loginServiceSpy = vi.spyOn(loginService, 'loginService').mockResolvedValue(false);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLogin());

    result.current.setFieldValue('email', 'test@example.com');
    result.current.setFieldValue('password', 'password');

    await result.current.handleSubmit();

    expect(loginServiceSpy).toHaveBeenCalledWith('test@example.com', 'password');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Login failed.');
  });
});
