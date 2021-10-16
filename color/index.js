import blend from './blend.glsl'
import blendModules from './blend/index.js'
import contrastMatrix from './contrastMatrix.glsl'
import hueShift from './hueShift.glsl'
import lut from './lut.glsl'
import vibrance from './vibrance.glsl'
import saturationMatrix from './saturationMatrix.glsl'
import brightnessMatrix from './brightnessMatrix.glsl'
import brightnessContrast from './brightnessContrast.glsl'
import desaturate from './desaturate.glsl'
import luma from './luma.glsl'
import daltonize from './daltonize.glsl'
import palette from './palette.glsl'
import space from './space.glsl'
import spaceModules from './space/index.js'
import paletteModules from './palette/index.js'

export default {
  blend: Object.assign(blend, blendModules),
  contrastMatrix,
  brightnessContrast,
  hueShift,
  lut,
  saturationMatrix,
  brightnessMatrix,
  desaturate,
  daltonize,
  luma,
  vibrance,
  palette: Object.assign(palette, paletteModules),
  space: Object.assign(space, spaceModules),
}
