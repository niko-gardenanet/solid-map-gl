import { onCleanup, createEffect, Component } from 'solid-js'
import { useMap } from '../MapGL'
import type MapboxMap from 'mapbox-gl/src/ui/map'
import type { FogSpecification } from 'mapbox-gl/src/style-spec/types.js'

export const Fog: Component<{
  style: FogSpecification
  visible?: boolean
  children?: any
}> = props => {
  const map: MapboxMap = useMap()
  // Add Fog Layer
  createEffect(() => {
    map().setFog(props.style || {})
  })

  // Remove Fog Layer
  onCleanup(() => map().setFog(null))

  // Update Visibility
  createEffect(() => {
    props.visible !== undefined &&
      map().setFog(props.visible ? props.style : null)
  })

  return props.children
}
