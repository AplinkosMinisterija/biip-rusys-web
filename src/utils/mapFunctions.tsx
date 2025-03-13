import { TableRow } from '@aplinkosministerija/design-system';
import TableItem from '../components/fields/TableItem';
import TableStatusRowItem from '../components/fields/TableStatusRowItem';
import FileDownloadContainer from '../components/other/FileDownloadContainer';
import { getDownloadUrl, getFileName } from '../pages/RequestForm/function';
import { FlexEndRow } from '../styles/GenericStyledComponents';
import { Form, Request } from '../types';
import { colorsByStatus } from './constants';
import { formatDate } from './format';
import { canShowResponseDate } from './functions';
import {
  buttonsTitles,
  observationFormStatusLabels,
  requestStatusLabels,
  requestTypeLabels,
} from './texts';

const mapObservationItem = (form: Form) => {
  return {
    id: form.id,
    name: (
      <TableItem label={form?.species?.speciesName} bottomLabel={form?.species?.speciesNameLatin} />
    ),
    createdAt: form.createdAt && formatDate(form.createdAt),
    observedAt: form.observedAt && formatDate(form.observedAt),
    status: (
      <TableStatusRowItem
        info={[
          {
            label: observationFormStatusLabels[form?.status],
            color: colorsByStatus[form?.status],
          },
        ]}
      />
    ),
    respondedAt:
      canShowResponseDate(form?.status) && form.respondedAt && formatDate(form.respondedAt),
    createdBy: `${form?.createdBy?.firstName || '-'} ${form?.createdBy?.lastName || '-'}`,
  };
};

export const mapObservationList = (formList: Form[]): TableRow[] =>
  formList.map(mapObservationItem);

const mapRequestItem = (request: Request) => {
  return {
    id: request.id,
    createdBy: `${request?.createdBy?.firstName || '-'} ${request?.createdBy?.lastName || '-'} `,
    status: (
      <TableStatusRowItem
        info={[
          {
            label: requestStatusLabels[request?.status],
            color: colorsByStatus[request?.status],
          },
        ]}
      />
    ),
    type: requestTypeLabels[request.type],
    createdAt: request.createdAt && formatDate(request?.createdAt),
    deletedAt: request.deletedAt && formatDate(request.deletedAt),
    respondedAt:
      request.respondedAt &&
      canShowResponseDate(request?.status) &&
      formatDate(new Date(request.respondedAt)),
    generatedFiles: (
      <FlexEndRow>
        <FileDownloadContainer
          url={getDownloadUrl(request.generatedFile, getFileName(request.id), 'pdf')}
        />
        <FileDownloadContainer
          downloadButtonTitle={buttonsTitles.downloadGeoJson}
          url={getDownloadUrl(request?.generatedFileGeojson, getFileName(request.id), 'geojson')}
        />
      </FlexEndRow>
    ),
  };
};

export const mapRequestList = (requestList: Request[]): TableRow[] =>
  requestList.map(mapRequestItem);
