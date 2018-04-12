const lightingTypes = {
  POINTLIGHT: 'PointLight',
  SPOTLIGHT: 'SpotLight',
  DIRECTIONALLIGHT: 'DirectionalLight',
  HEMISPHERELIGHT: 'HemisphereLight',
  AMBIENTLIGHT: 'AmbientLight'
};

export const selectOptions = Object.keys(lightingTypes).map(key => ({ title: lightingTypes[key], id: lightingTypes[key] }));

export default lightingTypes;
