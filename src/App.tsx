import { useEffect, useState } from 'react';
import { Card, Button, Badge, Spinner, Avatar, Tooltip, Progress, ButtonIcon } from '@poliedro/tamentai/web';
import { useGlobalToast } from './contexts/ToastContext';
import { Trash } from 'lucide-react';

interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
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
  const { showToast } = useGlobalToast();

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

  const handleCapture = (name: string) => {
    const success = Math.random() > 0.3; // 70% de chance de capturar
    if (success) {
      showToast({
        title: 'Sucesso!',
        description: `${name} foi capturado com sucesso!`,
        type: 'success',
        duration: 3000
      });
    } else {
      showToast({
        title: 'Oh não!',
        description: `O ${name} escapou da Pokébola!`,
        type: 'error',
        duration: 4000
      });
    }
  };

  const handleDetails = (name: string) => {
    showToast({
      title: 'Informação',
      description: `Buscando mais dados sobre ${name}...`,
      type: 'info',
      duration: 2500
    });
  };

  const handleRelease = (name: string) => {
    showToast({
      title: 'Atenção',
      description: `${name} foi solto na natureza permanentemente.`,
      type: 'warning',
      duration: 3500
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 500, letterSpacing: '1px' }}>Tamentai Playground</h1>
        <p style={{ color: '#555', margin: 0 }}>Testando mais componentes: Avatar, Badge, Button, ButtonIcon, Card, Progress, Toast e Tooltip.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {pokemons.map((poke) => {
            const formattedName = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
            
            return (
              <Card
                key={poke.id}
                heading={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Tooltip content={`ID na Pokédex: #${poke.id}`} direction="right" color="light">
                      <span style={{ display: 'inline-flex' }}>
                        <Avatar 
                          type="Image" 
                          showPicture={true} 
                          imageSrc={poke.sprites.front_default} 
                          imageAlt={poke.name} 
                          size="Default" 
                          shape="Circular" 
                        />
                      </span>
                    </Tooltip>
                    <span>{formattedName}</span>
                  </span>
                }
                subtitle={`#${poke.id.toString().padStart(3, '0')}`}
                imageSrc={poke.sprites.front_default}
                imageAlt={poke.name}
                actions={
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%', flexDirection: 'column' }}>
                    <Button variant="primary" size="medium" roundness="round" fullWidth onClick={() => handleCapture(formattedName)}>
                      Capturar
                    </Button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button variant="outline" size="small" fullWidth onClick={() => handleDetails(formattedName)}>
                        Detalhes
                      </Button>
                      <ButtonIcon aria-label="Soltar" variant="ghost" color="destructive" size="small" onClick={() => handleRelease(formattedName)}>
                        <Trash size={16} aria-hidden="true" />
                      </ButtonIcon>
                    </div>
                  </div>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
                  
                  <div style={{ marginTop: '0.5rem' }}>
                    <Tooltip content={`Experiência base ao derrotar um ${formattedName} selvagem`} direction="bottom" color="dark">
                      <span style={{ display: 'block' }}>
                        <Progress 
                          value={(poke.base_experience / 300) * 100} 
                          variant="titleLabel" 
                          label={`Base XP: ${poke.base_experience}`} 
                          size="sm" 
                        />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}
