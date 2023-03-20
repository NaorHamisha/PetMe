import { useEffect, useState } from 'react';
import axios from 'axios';
import auth from '../../config/Firebase';
import { SERVER_URL } from '../../config/Server';

export default function usePut(url, requestData, shouldFetch, setShouldFetch, onSuccess = () => {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!shouldFetch || shouldFetch === undefined) {
      (async function () {
        try {
          setLoading(true);
          const user = auth.currentUser;
          const token = user && (await user.getIdToken());
          const response = await axios.put(SERVER_URL + url, requestData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          onSuccess();
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
          if (!!shouldFetch && !!setShouldFetch) {
            setShouldFetch(false);
          }
        }
      })();
    }
  }, [shouldFetch]);

  return { data, error, loading };
}
