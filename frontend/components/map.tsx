import dynamic from "next/dynamic"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"


// Client-only map component
const ClientMap = ({ position }: { position: [number, number] }) => {
  
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-2 h-[600px]">
      <MapContainer center={position as [number, number]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position as [number, number]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        
      </MapContainer>
    </div>
  )
}
export default ClientMap