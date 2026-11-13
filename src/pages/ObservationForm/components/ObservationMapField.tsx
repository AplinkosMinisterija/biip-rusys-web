import { FieldWrapper } from '@aplinkosministerija/design-system';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import api from '../../../api';
import { validationTexts } from '../../../utils/texts';
import { FormProps } from '../types';

interface ObservationMapFieldProps {
  mapHost: string;
  mapPath: string;
  value?: FormProps['geom'];
  error?: string;
  onChange: (value: FormProps['geom']) => void;
  height?: string;
  allow?: string;
  accessibilityDescription?: string;
  accessibilityContact?: string;
}

export const ObservationMapField = ({
  mapHost,
  mapPath,
  value,
  error,
  onChange,
  height,
  allow,
  accessibilityDescription,
  accessibilityContact,
}: ObservationMapFieldProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastGeom = useRef<string>();
  const [outsideLithuania, setOutsideLithuania] = useState(false);
  const descriptionId = 'observation-map-description';

  const handleMessage = useCallback(
    async (event: MessageEvent) => {
      const data = event?.data?.mapIframeMsg?.data;
      if (event.origin !== mapHost || !data) return;

      const geomText = typeof data === 'string' ? data : JSON.stringify(data);
      if (geomText === lastGeom.current) return;
      lastGeom.current = geomText;

      const geom = JSON.parse(geomText);
      if (!geom?.features?.length) return;

      try {
        const { insideLithuania } = await api.checkObservationFormGeom(geom);
        setOutsideLithuania(!insideLithuania);
        if (!insideLithuania) return onChange('');
      } catch (err) {
        setOutsideLithuania(false);
        console.error('Failed to check whether the location is in Lithuania', err);
      }

      onChange(geom);
    },
    [mapHost, onChange],
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const handleLoad = () => {
    if (!value) return;
    iframeRef.current?.contentWindow?.postMessage({ geom: value }, '*');
  };

  return (
    <FieldWrapper error={error}>
      <VisuallyHidden id={descriptionId}>
        {accessibilityDescription} {accessibilityContact}
      </VisuallyHidden>
      {outsideLithuania && (
        <LocationError role="alert">{validationTexts.geomOutsideLithuania}</LocationError>
      )}
      <Iframe
        ref={iframeRef}
        src={`${mapHost}${mapPath}`}
        $error={!!error || outsideLithuania}
        height={height}
        width="100%"
        allow={allow}
        allowFullScreen
        onLoad={handleLoad}
        aria-label="Interaktyvus žemėlapis"
        aria-describedby={descriptionId}
        title="Žemėlapis"
        tabIndex={0}
      />
    </FieldWrapper>
  );
};

const LocationError = styled.div`
  margin-top: 8px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  background-color: #fff1f3;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  line-height: 1.4;
`;

const Iframe = styled.iframe<{ $error: boolean }>`
  height: 400px;
  width: 100%;
  display: block;
  border: 1px solid ${({ $error, theme }) => ($error ? theme.colors.danger : theme.colors.border)};
  border-radius: 4px;
  margin-top: 8px;
`;

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export default ObservationMapField;
