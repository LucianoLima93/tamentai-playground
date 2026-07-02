import { useEffect, useState } from 'react';
import { Card, Button, Badge, Spinner, Avatar, Tooltip } from '@poliedro/tamentai/web';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
        const data = await res.json();
        
        const details = await Promise.all(
          data.results.map(async (p: { url: string }) => {
            const pRes = await fetch(p.url);
            return pRes.json();
          })
        );
        
        setPokemons(details);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Tamentai Playground - Componentes v2</h1>
        <p style={{ color: '#555', margin: 0 }}>Testando componentes como Card, Button, Badge, Avatar e Spinner usando a PokeAPI.</p>
      </div>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner size='lg' />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {pokemons.map((poke) => (
            <Card
              key={poke.id}
              heading={
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Avatar 
                    type="Image" 
                    showPicture={true} 
                    imageSrc={poke.sprites.front_default} 
                    imageAlt={poke.name} 
                    size="Default" 
                    shape="Circular" 
                  />
                  <span>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</span>
                </span>
              }
              subtitle={`#${poke.id.toString().padStart(3, '0')}`}
              imageSrc={poke.sprites.front_default}
              imageAlt={poke.name}
              actions={
                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', flexDirection: 'column' }}>
                  <Button variant="primary" size="medium" roundness="round" fullWidth>
                    Capturar
                  </Button>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" size="small" fullWidth>
                      Ver Detalhes
                    </Button>
                    <Button variant="ghost" size="small" fullWidth>
                      Soltar
                    </Button>
                  </div>
                </div>
              }
            >
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {poke.types.map((t) => {
                  let color: 'dark' | 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'light' = 'gray';
                  const typeName = t.type.name;
                  if (['grass', 'bug'].includes(typeName)) color = 'green';
                  if (['fire', 'fighting', 'dragon'].includes(typeName)) color = 'red';
                  if (['water', 'ice'].includes(typeName)) color = 'blue';
                  if (['electric'].includes(typeName)) color = 'yellow';
                  if (['poison', 'ghost', 'dark'].includes(typeName)) color = 'dark';

                  return (
                    <Tooltip 
                      key={t.type.name} 
                      content={`Tipo elemental: ${typeName}`} 
                      direction="up" 
                      color="dark"
                    >
                      <span style={{ display: 'inline-flex' }}>
                        <Badge type="soft" color={color} shape="pilled">
                          {typeName}
                        </Badge>
                      </span>
                    </Tooltip>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
