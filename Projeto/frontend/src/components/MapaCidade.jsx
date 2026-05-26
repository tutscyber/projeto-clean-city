import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import api from '../services/api';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Corrige o ícone padrão do Leaflet no React
const iconeLixeira = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Faz o mapa centralizar nas lixeiras
function AjustarMapa({ lixeiras }) {
    const mapa = useMap();

    useEffect(() => {
        if (lixeiras.length > 0) {
            const pontos = lixeiras.map(item => [
                Number(item.latitude),
                Number(item.longitude)
            ]);

            mapa.fitBounds(pontos, {
                padding: [40, 40]
            });
        }
    }, [lixeiras, mapa]);

    return null;
}

function MapaCidade() {

    const [lixeiras, setLixeiras] = useState([]);

    useEffect(() => {
        async function carregar() {
            const resposta = await api.get('/lixeiras');

            const filtradas = resposta.data.filter(item =>
                item.latitude !== null &&
                item.longitude !== null &&
                item.latitude !== '' &&
                item.longitude !== ''
            );

            setLixeiras(filtradas);
        }

        carregar();
    }, []);

    return (
        <MapContainer
            center={[-23.5505, -46.6333]}
            zoom={12}
            style={{
                height: '300px',
                width: '100%',
                borderRadius: '12px'
            }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <AjustarMapa lixeiras={lixeiras} />

            {lixeiras.map((item) => (
                <Marker
                    key={item.id}
                    position={[
                        Number(item.latitude),
                        Number(item.longitude)
                    ]}
                    icon={iconeLixeira}
                >
                    <Popup>
                        <strong>{item.localizacao}</strong><br />
                        CEP: {item.cep}<br />
                        Nível: {item.nivel}%<br />
                        Status: {item.status_lixeira}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapaCidade;