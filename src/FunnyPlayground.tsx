import React, { useState, useEffect } from 'react'
import { Select } from '@poliedro/tamentai/web'
import { Combobox } from '@poliedro/tamentai/web'
import { Card } from '@poliedro/tamentai/web'
import { Icon } from '@poliedro/tamentai/web'

export function FunnyPlayground() {
	const [pokemons, setPokemons] = useState<{ value: string; label: string }[]>([])
	const [loading, setLoading] = useState(false)
	const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
	const [selectedMulti, setSelectedMulti] = useState<string[]>([])

	const [apiSearch, setApiSearch] = useState('')
	const [apiProducts, setApiProducts] = useState<{ value: string; label: string }[]>([])
	const [apiLoading, setApiLoading] = useState(false)

	const [infinitePokemons, setInfinitePokemons] = useState<{ value: string; label: string }[]>([])
	const [infiniteLoading, setInfiniteLoading] = useState(false)
	const [offset, setOffset] = useState(0)
	const LIMIT = 20

	useEffect(() => {
		setInfiniteLoading(true)
		fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
			.then(res => res.json())
			.then(data => {
				const opts = data.results.map((p: any) => ({
					value: p.name,
					label: p.name.charAt(0).toUpperCase() + p.name.slice(1)
				}))
				setInfinitePokemons(prev => {
					const existingIds = new Set(prev.map(p => p.value))
					const newOpts = opts.filter((o: any) => !existingIds.has(o.value))
					return [...prev, ...newOpts]
				})
				setInfiniteLoading(false)
			})
			.catch(() => setInfiniteLoading(false))
	}, [offset])

	const handleLoadMore = () => {
		if (!infiniteLoading) {
			setOffset(prev => prev + LIMIT)
		}
	}

	useEffect(() => {
		if (!apiSearch) {
			setApiProducts([])
			return
		}
		
		setApiLoading(true)
		const timer = setTimeout(() => {
			fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(apiSearch)}`)
				.then(res => res.json())
				.then(data => {
					const opts = data.products.map((p: any) => ({
						value: String(p.id),
						label: p.title
					}))
					setApiProducts(opts)
					setApiLoading(false)
				})
				.catch(() => setApiLoading(false))
		}, 500) // 500ms debounce

		return () => clearTimeout(timer)
	}, [apiSearch])

	useEffect(() => {
		setLoading(true)
		fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
			.then(res => res.json())
			.then(data => {
				const opts = data.results.map((p: any) => ({
					value: p.name,
					label: p.name.charAt(0).toUpperCase() + p.name.slice(1)
				}))
				setPokemons(opts)
				setLoading(false)
			})
			.catch(() => setLoading(false))
	}, [])

	return (
		<div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<h2 style={{ fontSize: '1.5rem', color: 'var(--global-text-default)' }}>Funny Playground - Pokémon Edition</h2>
			
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
				<Card heading="Select API" subtitle="Pesquisa via requisição real (DummyJSON)">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Select 
							label="Buscar Produtos" 
							placeholder="Selecione um produto..."
							options={apiProducts}
							searchable
							searchValue={apiSearch}
							onSearchChange={setApiSearch}
							disableInternalSearch
							loading={apiLoading}
							searchPlaceholder="Ex: phone, laptop..."
							emptyMessage={apiSearch ? 'Nenhum produto encontrado.' : 'Digite algo para buscar.'}
						/>
					</div>
				</Card>

				<Card heading="Select Searchable" subtitle="Pesquisa no dropdown (Local)">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Select 
							label="Selecione um Pokémon" 
							placeholder="Buscar..."
							options={pokemons}
							searchable
							loading={loading}
							searchPlaceholder="Pesquisar..."
						/>
					</div>
				</Card>

				<Card heading="Combobox Paginação" subtitle="Infinite Scroll (PokeAPI)">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Combobox 
							label="Qual Pokémon?" 
							placeholder="Role a lista para carregar mais..."
							leading={<Icon name="Search" color="currentColor" />}
							options={infinitePokemons}
							loading={infiniteLoading}
							onLoadMore={handleLoadMore}
							loadingMessage="Buscando mais Pokémons..."
						/>
					</div>
				</Card>

				<Card heading="Combobox Básico" subtitle="Autocomplete (no trigger)">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Combobox 
							label="Pokémons com autocomplete" 
							placeholder="Digite para buscar..."
							options={pokemons}
						/>
						<Combobox 
							label="Combobox Múltiplo (Responsivo)" 
							placeholder="Busque vários..."
							options={pokemons}
							multiple
							maxChips="responsive"
							value={selectedMulti}
							onValueChange={(val: any) => setSelectedMulti(val)}
						/>

						<Combobox 
							label="Combobox Múltiplo (Wrap / Quebra de linha)" 
							placeholder="Busque vários..."
							options={pokemons}
							multiple
							maxChips="wrap"
							value={selectedMulti}
							onValueChange={(val: any) => setSelectedMulti(val)}
						/>

						<Combobox 
							label="Combobox Múltiplo (Fixo: 2 Chips)" 
							placeholder="Busque vários..."
							options={pokemons}
							multiple
							maxChips="responsive"
							value={selectedMulti}
							onValueChange={(val: any) => setSelectedMulti(val)}
						/>
					</div>
				</Card>

				<Card heading="Select Básico" subtitle="Usando opções estáticas">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Select 
							label="Seu inicial favorito" 
							placeholder="Escolha..."
							options={[
								{ value: 'bulbasaur', label: 'Bulbasaur' },
								{ value: 'charmander', label: 'Charmander' },
								{ value: 'squirtle', label: 'Squirtle' },
							]}
						/>
						<Select 
							label="Com ícone (leading)" 
							placeholder="Pikachu..."
							leading={<Icon name="Search" color="currentColor" />}
							options={[
								{ value: 'pikachu', label: 'Pikachu' },
								{ value: 'raichu', label: 'Raichu' },
							]}
						/>
					</div>
				</Card>

				<Card heading="Combobox API" subtitle="Buscando Pokémons ao vivo">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Combobox 
							label="Qual Pokémon?" 
							placeholder="Buscar Pokémon..."
							leading={<Icon name="Search" color="currentColor" />}
							options={pokemons}
							value={selectedPokemon}
							onValueChange={(val) => setSelectedPokemon(val as string)}
							loading={loading}
						/>
						<p style={{ fontSize: '0.875rem', color: '#64748b' }}>
							Selecionado: {selectedPokemon || 'Nenhum'}
						</p>
					</div>
				</Card>

				<Card heading="Combobox Multi-Select" subtitle="Variação Badge vs Text">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Combobox 
							label="Seu time (Badge)" 
							placeholder="Adicione Pokémons..."
							multiple
							multiSelectVariant="badge"
							maxChips="responsive"
							options={pokemons}
							value={selectedMulti}
							onValueChange={(val) => setSelectedMulti(val as string[])}
						/>
						<Combobox 
							label="Seu time (Text)" 
							placeholder="Adicione Pokémons..."
							multiple
							multiSelectVariant="text"
							options={pokemons}
							value={selectedMulti}
							onValueChange={(val) => setSelectedMulti(val as string[])}
						/>
					</div>
				</Card>

				<Card heading="Variações de Design" subtitle="Tamanhos, Formatos e Estados">
					<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Combobox 
							label="Sem Borda (None) & Underline" 
							shape="none"
							variant="underline"
							placeholder="Formato reto..."
							options={pokemons}
						/>
						<Combobox 
							label="Pequeno (Gray)" 
							size="sm"
							variant="gray"
							placeholder="Formato pequeno..."
							options={pokemons}
						/>
						<Combobox 
							label="Estado de Erro" 
							invalid
							feedbackMessage="Este Pokémon já foi capturado!"
							placeholder="Tente outro..."
							options={pokemons}
						/>
						<Combobox 
							label="Desabilitado" 
							disabled
							placeholder="Não disponível"
							options={pokemons}
						/>
					</div>
				</Card>
			</div>
		</div>
	)
}
