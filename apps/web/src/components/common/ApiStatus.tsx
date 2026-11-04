import { useQuery } from '@tanstack/react-query';

import { getHealthStatus } from '../../services/health.service';

const ApiStatus = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['health'],
    queryFn: getHealthStatus,
    refetchInterval: 15000,
  });

  if (isLoading) {
    return (
      <div className="status-card">
        <h3>Checking infrastructure...</h3>
        <p>Please wait while we contact the backend.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="status-card error">
        <h3>Backend connection failed</h3>
        <p>{error instanceof Error ? error.message : 'Unable to connect to the API.'}</p>

        <button onClick={() => void refetch()}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="status-card success">
      <h3>CollabFlow Infrastructure</h3>

      <p>{data?.message}</p>

      <div className="service-list">
        <p>
          API: <strong>{data?.services.api}</strong>
        </p>

        <p>
          MongoDB: <strong>{data?.services.mongodb}</strong>
        </p>

        <p>
          Redis: <strong>{data?.services.redis}</strong>
        </p>
      </div>

      <p className="timestamp">Last checked: {new Date(data!.timestamp).toLocaleTimeString()}</p>

      <button onClick={() => void refetch()} disabled={isFetching}>
        {isFetching ? 'Checking...' : 'Check Again'}
      </button>
    </div>
  );
};

export default ApiStatus;
