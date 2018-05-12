import materialsTypes from '../../../common/constants/materials-types';
import mProps from '../../../common/constants/materials-properties';

const mapedMaterialsProperties = {
  [materialsTypes.LINE_BASIC_MATERIAL]: [mProps.COLOR, mProps.VERTEXCOLORS, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST],
  [materialsTypes.LINE_DASHED_MATERIAL]: [mProps.COLOR, mProps.VERTEXCOLORS, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST],
  [materialsTypes.MESH_BASIC_MATERIAL]: [mProps.COLOR, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.MAP, mProps.ALPHAMAP, mProps.SPECULARMAP, mProps.ENVMAP, mProps.LIGHTMAP, mProps.AOMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_DEPTH_MATERIAL]: [mProps.COLOR, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.MAP, mProps.ALPHAMAP, mProps.DISPLACEMENTMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_LAMBERT_MATERIAL]: [mProps.COLOR, mProps.EMISSIVE, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.MAP, mProps.ALPHAMAP, mProps.SPECULARMAP, mProps.ENVMAP, mProps.LIGHTMAP, mProps.AOMAP, mProps.EMISSIVEMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_NORMAL_MATERIAL]: [mProps.VERTEXCOLORS, mProps.SKINNING, mProps.BUMPMAP, mProps.NORMALMAP, mProps.DISPLACEMENTMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_PHONG_MATERIAL]: [mProps.COLOR, mProps.EMISSIVE, mProps.SPECULAR, mProps.SHININESS, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.MAP, mProps.ALPHAMAP, mProps.BUMPMAP, mProps.NORMALMAP, mProps.DISPLACEMENTMAP, mProps.SPECULARMAP, mProps.ENVMAP, mProps.LIGHTMAP, mProps.AOMAP, mProps.EMISSIVEMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_PHYSICAL_MATERIAL]: [mProps.COLOR, mProps.ROUGHNESS, mProps.METALNESS, mProps.EMISSIVE, mProps.CLEARCOAT, mProps.CLEARCOATROUGHNESS, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.MAP, mProps.ALPHAMAP, mProps.BUMPMAP, mProps.NORMALMAP, mProps.DISPLACEMENTMAP, mProps.ROUGHNESSMAP, mProps.METALNESSMAP, mProps.ENVMAP, mProps.LIGHTMAP, mProps.AOMAP, mProps.EMISSIVEMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_STANDARD_MATERIAL]: [mProps.COLOR, mProps.ROUGHNESS, mProps.METALNESS, mProps.EMISSIVE, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.MAP, mProps.ALPHAMAP, mProps.BUMPMAP, mProps.NORMALMAP, mProps.DISPLACEMENTMAP, mProps.ROUGHNESSMAP, mProps.METALNESSMAP, mProps.ENVMAP, mProps.LIGHTMAP, mProps.AOMAP, mProps.EMISSIVEMAP, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME],
  [materialsTypes.MESH_SHADER_MATERIAL]: [mProps.SHADERS, mProps.VERTEXCOLORS, mProps.SKINNING, mProps.SIDE, mProps.flatShading, mProps.BLENDING, mProps.OPACITY, mProps.TRANSPARENT, mProps.ALPHATEST, mProps.WIREFRAME]
};

export default mapedMaterialsProperties;