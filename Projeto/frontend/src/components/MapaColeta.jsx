import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useEffect, useState } from 'react';
import api from '../services/api';

function MapaColeta({ motorista }) {
    const [rota, setRota] = useState([]);

    useEffect(() => {
        async function carregar() {
            const resposta = await api.get('/lixeiras');

            const cheias = resposta.data.filter(item =>
                Number(item.nivel) >= 80 &&
                item.latitude !== null &&
                item.longitude !== null
            );

            setRota(cheias);
        }

        carregar();
    }, []);

    const pontos = rota.map(item => [
        Number(item.latitude),
        Number(item.longitude)
    ]);

    return (
        <div>
            <p className="motorista-rota">
                Motorista da rota: <strong>{motorista || 'Não selecionado'}</strong>
            </p>

           <MapContainer
    center={[-23.5505, -46.6333]}
    zoom={11}
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

    {rota.map((item) => (
        <Marker
            key={item.id}
            position={[
                Number(item.latitude),
                Number(item.longitude)
            ]}
        >
            <Popup>
                {item.localizacao} - {item.nivel}%
            </Popup>
        </Marker>
    ))}

    {pontos.length > 1 && (
        <Polyline
            positions={pontos}
            color="blue"
        />
    )}

</MapContainer>
        </div>
    );
}

export default MapaColeta;