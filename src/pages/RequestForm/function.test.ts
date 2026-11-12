import { describe, expect, it } from 'vitest';
import { getDownloadUrl } from './function';

const url = 'https://dev-cdn.biip.lt/rusys/uploads/requests/private/9/abc';

const downloadName = (link: string) => new URL(link).searchParams.get('download');

describe('getDownloadUrl', () => {
  it('names the file after the request', () => {
    expect(downloadName(getDownloadUrl(url, 'Išrašas Nr.0000264', 'pdf'))).toBe(
      'israsas-nr-0000264.pdf',
    );
  });

  it('tells the two zipped formats apart', () => {
    const shp = downloadName(getDownloadUrl(url, 'Išrašas Nr.0000264', 'zip', 'shapefile'));
    const gdb = downloadName(getDownloadUrl(url, 'Išrašas Nr.0000264', 'zip', 'geodatabase'));

    expect({ shp, gdb }).toEqual({
      shp: 'israsas-nr-0000264-shapefile.zip',
      gdb: 'israsas-nr-0000264-geodatabase.zip',
    });
  });

  it('stays empty while the file is still being generated', () => {
    expect(getDownloadUrl('', 'Išrašas Nr.0000264', 'zip', 'shapefile')).toBe('');
  });
});
