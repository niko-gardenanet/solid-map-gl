import { createContext, ParentComponent, Show, useContext } from 'solid-js'
import type { Map } from '../MapGL'

export const MapContext = createContext<[{ map: Map }]>()

export function useMapContext() {
  const context = useContext(MapContext)
  if (context === undefined)
    throw new Error('useMapContext must be used within a MapProvider')
  return context
}

export const MapProvider: ParentComponent<{
  map?: Map
}> = (props) => {
  return (
    <Show when={props.map}>
      {(map) => (
        <MapContext.Provider value={[{ map: map() }]}>
          {props.children}
        </MapContext.Provider>
      )}
    </Show>
  )
}
