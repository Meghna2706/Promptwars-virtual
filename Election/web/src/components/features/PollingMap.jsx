import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import LoadingState from '../common/LoadingState'

const libraries = ['places']
const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
}

const defaultCenter = {
  lat: 40.7128, // Default to New York
  lng: -74.0060
}

const samplePollingStations = [
  { id: 1, name: 'PS 123 Elementary School', position: { lat: 40.7138, lng: -74.0070 } },
  { id: 2, name: 'Community Center', position: { lat: 40.7118, lng: -74.0050 } },
  { id: 3, name: 'Public Library', position: { lat: 40.7148, lng: -74.0040 } },
]

export default function PollingMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  if (loadError) {
    return (
      <div className="p-4 bg-red-50 text-error rounded-lg border border-red-200">
        <p className="font-semibold">Error loading maps</p>
        <p className="text-sm">Please check if your VITE_GOOGLE_MAPS_API_KEY is configured correctly in the .env file.</p>
      </div>
    )
  }

  if (!isLoaded) return <LoadingState message="Loading Map..." />

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Sample Polling Stations</h3>
        <p className="text-gray-600">Find nearby voting locations on the map</p>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={defaultCenter}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {samplePollingStations.map(station => (
          <Marker 
            key={station.id} 
            position={station.position}
            title={station.name}
            animation={window.google?.maps?.Animation?.DROP}
          />
        ))}
      </GoogleMap>
    </div>
  )
}
