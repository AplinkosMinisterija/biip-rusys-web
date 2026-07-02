import { describe, expect, it } from 'vitest';
import {
  getGeomSignature,
  getNearbyPlaceIds,
  getNearbySpeciesValues,
  mergeGeomWithNearbySpeciesValues,
} from './ObservationMapContainer.utils';

describe('ObservationMapContainer nearby places helpers', () => {
  it('does not produce a geometry signature before geom exists', () => {
    expect(getGeomSignature('')).toBe('');
    expect(getGeomSignature(undefined)).toBe('');
  });

  it('creates a stable geometry signature once geom exists', () => {
    const geom = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: { type: 'Point', coordinates: [500000, 6000000] },
        },
      ],
    };

    expect(getGeomSignature(geom)).toBe(JSON.stringify(geom));
  });

  it('maps nearby place rows to unique place ids', () => {
    expect(getNearbyPlaceIds([{ id: 11 }, { id: 12 }, { id: 12 }, {}])).toEqual([11, 12]);
    expect(getNearbyPlaceIds()).toEqual([]);
  });

  it('keeps nearby species rows as map filter values', () => {
    const species = [
      {
        id: 1,
        speciesId: 101,
        speciesName: 'Species name',
        speciesNameLatin: 'Species latin',
        geom: { type: 'Point', coordinates: [1, 2] },
        distance: 25,
      },
    ];

    expect(getNearbySpeciesValues(species)).toEqual(species);
    expect(getNearbySpeciesValues()).toEqual([]);
  });

  it('merges nearby species geometry into the map value', () => {
    const geom = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { selected: true },
          geometry: { type: 'Point', coordinates: [500000, 6000000] },
        },
      ],
    };
    const species = [
      {
        id: 1,
        speciesId: 101,
        speciesName: 'Species name',
        speciesNameLatin: 'Species latin',
        geom: { type: 'Point', coordinates: [1, 2] },
        distance: 25,
      },
    ];

    expect(mergeGeomWithNearbySpeciesValues(geom, species)).toEqual({
      ...geom,
      features: [
        geom.features[0],
        {
          type: 'Feature',
          properties: {
            nearbySpecies: true,
            id: 1,
            speciesId: 101,
            speciesName: 'Species name',
            speciesNameLatin: 'Species latin',
            distance: 25,
          },
          geometry: { type: 'Point', coordinates: [1, 2] },
        },
      ],
    });
  });
});
