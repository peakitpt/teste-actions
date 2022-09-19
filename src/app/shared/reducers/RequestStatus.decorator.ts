export type StatusTypes = 'error' | 'pending' | 'success' | 'default';

export function RequestStatus(status: StatusTypes) {
  return (Class: any)  => {
    Object.defineProperty(Class.prototype, 'status', {
      value: status
    });
  };
}
