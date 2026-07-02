import type { NearbySpecies } from '../../../api';
import { FormProps } from '../types';

export const getGeomSignature = (geom: FormProps['geom']) => {
  if (!geom) return '';

  return JSON.stringify(geom);
};

export const getNearbyPlaceIds = (places?: { id?: number }[]) =>
  Array.from(new Set(places?.flatMap((place) => place.id || []) || []));

export const getNearbySpeciesValues = (species?: NearbySpecies[]) => species || [];

const getNearbySpeciesFeatures = (species?: NearbySpecies[]) =>
  getNearbySpeciesValues(species).flatMap((item) => {
    if (!item.geom) return [];

    const properties = {
      nearbySpecies: true,
      id: item.id,
      speciesId: item.speciesId,
      speciesName: item.speciesName,
      speciesNameLatin: item.speciesNameLatin,
      distance: item.distance,
    };

    if (item.geom.type === 'FeatureCollection') {
      return (item.geom.features || []).map((feature) => ({
        ...feature,
        properties: { ...properties, ...feature.properties },
      }));
    }

    if (item.geom.type === 'Feature') {
      return [{ ...item.geom, properties: { ...properties, ...item.geom.properties } }];
    }

    return [{ type: 'Feature', properties, geometry: item.geom }];
  });

export const mergeGeomWithNearbySpeciesValues = (
  geom: FormProps['geom'],
  species?: NearbySpecies[],
) => {
  const speciesFeatures = getNearbySpeciesFeatures(species);

  if (!geom || !speciesFeatures.length) return geom;

  if (geom.type === 'FeatureCollection') {
    return { ...geom, features: [...(geom.features || []), ...speciesFeatures] };
  }

  if (geom.type === 'Feature') {
    return { type: 'FeatureCollection', features: [geom, ...speciesFeatures] };
  }

  return {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: {}, geometry: geom }, ...speciesFeatures],
  };
};
