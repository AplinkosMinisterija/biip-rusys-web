import { useState } from 'react';
import api from '../../../api';

export const useGeoJson = (requestId: string) => {
  const [isLoadingGeoJson, setIsLoadingGeoJson] = useState(false);

  const requestGeoJson = async () => {
    setIsLoadingGeoJson(true);
    const data = await api.getGeoJson(requestId);

    if (data) {
      const url = window.URL.createObjectURL(new Blob([JSON.stringify(data)]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${requestId}-geojson.json`);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    }

    setIsLoadingGeoJson(false);
  };
  return { requestGeoJson, isLoadingGeoJson };
};
