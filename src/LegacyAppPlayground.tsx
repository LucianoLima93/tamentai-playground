import { useState } from 'react'
// removed design tokens

// Imports diretos dos componentes-v2
import { Badge } from '@poliedro/tamentai/web'
import { Button } from '@poliedro/tamentai/web'
import { ButtonIcon } from '@poliedro/tamentai/web'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@poliedro/tamentai/web'
import { Progress, ProgressRoot, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from '@poliedro/tamentai/web'
import { ActivityIndicator } from '@poliedro/tamentai/web'
import { SignalBars } from '@poliedro/tamentai/web'
import { Tooltip } from '@poliedro/tamentai/web'
import { ToastProvider, useToast, ToastViewport } from '@poliedro/tamentai/web'
import { Avatar, AvatarGroup } from '@poliedro/tamentai/web'
import { Checkbox } from '@poliedro/tamentai/web'
import { Input } from '@poliedro/tamentai/web'
import { Icon } from '@poliedro/tamentai/web'
import { InputGroup } from '@poliedro/tamentai/web'

import avatarExample1 from './assets/images/avatar-example-1.png'
import avatarExample2 from './assets/images/avatar-example-2.png'
import avatarExample3 from './assets/images/avatar-example-3.png'

// Ícones consumidos via Lucide (Icon Wrapper V2)
const InfoIcon = () => <Icon name="Info" size={16} />
const BellIcon = () => <Icon name="Bell" size={16} />

function CardListExample() {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([1]))
	const cards = [
		{ id: 1, title: 'Documento Fiscal.pdf', size: '2.4 MB' },
		{ id: 2, title: 'Relatório Anual 2024.docx', size: '5.1 MB' },
		{ id: 3, title: 'Apresentação Q1.pptx', size: '15.0 MB' },
	]

	const allSelected = selectedIds.size === cards.length

	const toggleAll = () => {
		if (allSelected) {
			setSelectedIds(new Set())
		} else {
			setSelectedIds(new Set(cards.map(c => c.id)))
		}
	}

	const toggleCard = (id: number) => {
		const newSet = new Set(selectedIds)
		if (newSet.has(id)) {
			newSet.delete(id)
		} else {
			newSet.add(id)
		}
		setSelectedIds(newSet)
	}

	return (
		<div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
				<Checkbox
					aria-label="Selecionar todos os cards"
					checked={allSelected}
					onCheckedChange={toggleAll}
				/>
				<label style={{ fontWeight: 600, color: '#374151', cursor: 'pointer' }} onClick={toggleAll}>
					Selecionar Todos os {cards.length} arquivos
				</label>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				{cards.map(card => (
					<Card key={card.id} row size="compact" className={selectedIds.has(card.id) ? 'selected-card-demo' : ''} style={{ transition: 'all 0.2s' }}>
						<CardHeader>
							<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
								<Checkbox
									checked={selectedIds.has(card.id)}
									onCheckedChange={() => toggleCard(card.id)}
									aria-label={`Selecionar ${card.title}`}
								/>
								<div onClick={() => toggleCard(card.id)} style={{ cursor: 'pointer', flex: 1 }}>
									<CardTitle>{card.title}</CardTitle>
									<CardDescription>{card.size}</CardDescription>
								</div>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>

			<div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
				<h4 style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
					Documentos Selecionados ({selectedIds.size})
				</h4>
				{selectedIds.size === 0 ? (
					<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Nenhum arquivo selecionado.</p>
				) : (
					<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						{cards.filter(c => selectedIds.has(c.id)).map(selected => (
							<li key={selected.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
								<Badge variant="soft" color="green" size="sm">Selecionado</Badge>
								<span><b>{selected.title}</b> ({selected.size})</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<style>{`
				.selected-card-demo {
					border-color: #3b82f6 !important;
					background-color: #eff6ff !important;
				}
			`}</style>
		</div>
	)
}

function ShowcaseContent() {
	const { addToast } = useToast()
	// const [progress, setProgress] = useState(45)

	const handleShowToast = (variant: 'success' | 'error' | 'info' | 'warning' | 'neutral') => {
		const messages = {
			success: { title: 'Tudo Certo!', description: 'Sua ação foi concluída com sucesso.' },
			error: { title: 'Ops! Algo deu errado', description: 'Não foi possível completar a ação. Tente novamente.' },
			info: { title: 'Você sabia?', description: 'Esta é uma mensagem de informação útil para o usuário.' },
			warning: { title: 'Atenção', description: 'Verifique os dados antes de prosseguir com esta ação.' },
			neutral: { title: 'Aviso', description: 'Uma mensagem neutra sem cor semântica.' },
		}

		addToast({
			variant: variant,
			title: messages[variant].title,
			description: messages[variant].description,
			closable: true,
			duration: 3000
		})
	}

	return (
		<div data-theme="light" style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', color: '#111827' }}>
			<style>{`
				@keyframes __playground_spin { 100% { transform: rotate(360deg); } }
				.demo-spin { animation: __playground_spin 2s linear infinite; width: 100%; height: 100%; }
			`}</style>

			<header style={{ marginBottom: '3rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1.5rem' }}>
				<h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>
					Playground Interno Tamentai
				</h1>
				<p style={{ color: '#6b7280', fontSize: '1.125rem', margin: 0 }}>
					Ambiente isolado para testes e experimentações dos componentes v2.
				</p>
			</header>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

				{/* CARD V2: Demonstração da Arquitetura Híbrida */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Card (Arquitetura Híbrida)</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', alignItems: 'start' }}>
						{/* Uso Híbrido Rápido via Props */}
						<Card
							title="Uso via Props (Híbrido)"
							subtitle="Rápido e engessado"
						>
							<div style={{ padding: '1rem', background: 'var(--theme-muted-muted)', borderRadius: '8px' }}>
								<p style={{ margin: 0 }}>Corpo livre injetado automaticamente no CardContent interno.</p>
							</div>
						</Card>

						{/* Uso Puro via Composição com Checkbox (Direita) */}
						<Card>
							<CardHeader>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
									<div>
										<CardTitle>Composição (Dir.)</CardTitle>
										<CardDescription>Checkbox na extrema direita.</CardDescription>
									</div>
									<Checkbox aria-label="Selecionar Card" defaultChecked />
								</div>
							</CardHeader>
							<CardContent>
								<p>Este layout imita o antigo "utility=switch" no topo direito, usando flex-start para alinhar com o título.</p>
							</CardContent>
						</Card>

						{/* Uso Puro via Composição com Checkbox (Esquerda) */}
						<Card>
							<CardHeader>
								<div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
									<Checkbox aria-label="Selecionar Card Esquerda" defaultChecked />
									<div>
										<CardTitle>Composição (Esq.)</CardTitle>
										<CardDescription>Checkbox na extrema esquerda.</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p>Layout bastante comum para listas e bulk-actions, utilizando apenas a flexibilidade do CardHeader.</p>
							</CardContent>
						</Card>
					</div>

					<CardListExample />
				</section>

				{/* TOAST V2: Demonstração e Edge Cases */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Toast (V2 Oficial)</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', alignItems: 'start' }}>
						<Card heading="Toast API Imperativa" subtitle="Usando o useToast() Hook">
							<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
								<Button onClick={() => addToast({ variant: 'success', title: 'Operação salva', description: 'Seus dados foram atualizados com sucesso.', closable: true })}>Success Toast</Button>
								<Button onClick={() => addToast({ variant: 'error', title: 'Falha na conexão', description: 'Não foi possível salvar os dados.', closable: true })}>Error Toast (Alert)</Button>
								<Button onClick={() => addToast({ variant: 'info', appearance: 'solid', title: 'Atualização', description: 'Nova versão disponível para download.', closable: true })}>Solid Info Toast</Button>
								<Button onClick={() => addToast({ variant: 'neutral', appearance: 'white', title: 'Sem Ícone Esquerdo', description: 'Este toast não possui o ícone de apoio principal.', closable: true, showIcon: false })}>Sem Ícone Esq.</Button>
								<Button onClick={() => addToast({ variant: 'warning', appearance: 'soft', title: 'Sem Ícone Direito', description: 'Este toast não possui botão de fechar (fechará sozinho).', closable: false })}>Sem Ícone Dir.</Button>
								<Button onClick={() => addToast({ variant: 'info', appearance: 'soft', title: 'Ação Dupla (Customizada)', description: 'Este toast possui botões estilizados de forma independente.', action: { label: 'Aceitar', onClick: () => alert('Aceito!'), variant: 'solid', color: 'primary' }, actionSecondary: { label: 'Recusar', onClick: () => alert('Recusado!'), variant: 'outline', color: 'secondary' }, closable: true })}>Ações Duplas</Button>
								<Button onClick={() => addToast({ variant: 'success', appearance: 'solid', title: 'Ação com Ícones', description: 'Este toast demonstra o uso de ícones nos botões de ação.', action: { label: 'Download', onClick: () => alert('Baixando!'), leadingIcon: <Icon name="Download" size={16} /> }, actionSecondary: { label: 'Detalhes', onClick: () => alert('Mais informações!'), trailingIcon: <Icon name="ExternalLink" size={16} /> }, closable: true })}>Ações com Ícones</Button>
							</div>
						</Card>

						<Card heading="Edge Cases (Teste de Estresse)" subtitle="Truncamento e textos muito longos">
							<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
								<Button onClick={() => addToast({
									variant: 'warning',
									title: 'Um título de aviso extremamente longo que deve ser tratado pelo CSS para não quebrar o layout do componente Toast em telas menores',
									description: 'Esta descrição também é colossal e tem como objetivo testar os limites do word-break, do flexbox e de qualquer padding mal calculado. A acessibilidade também entra em jogo aqui.',
									closable: true,
									action: 'Entendi'
								})}>
									Testar Texto Longo
								</Button>
							</div>
						</Card>
					</div>
				</section>

				{/* ROW 1: Avatares & Badges */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Identidade Visual</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', alignItems: 'start' }}>
						<Card heading="Avatares">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipos (Image, Initials, Placeholder)</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Avatar size="md" variant="image" src={avatarExample1} alt="Usuário 1" />
										<Avatar size="md" variant="solid" color="blue" initials="AB" />
										<Avatar size="md" variant="soft" color="green" initials="CD" />
										<Avatar size="md" variant="placeholder" />
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tamanhos</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Avatar size="xs" variant="image" src={avatarExample2} />
										<Avatar size="sm" variant="image" src={avatarExample2} />
										<Avatar size="md" variant="image" src={avatarExample2} />
										<Avatar size="lg" variant="image" src={avatarExample2} />
										<Avatar size="xl" variant="image" src={avatarExample2} />
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Formatos & Status</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Avatar shape="rounded" size="lg" variant="image" src={avatarExample3} status="Online" />
										<Avatar shape="circular" size="lg" variant="image" src={avatarExample3} status="Away" />
										<Avatar shape="rounded" size="md" variant="solid" color="red" initials="JD" status="Do Not Disturb" />
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avatar Group</h3>
									<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
										<AvatarGroup max={4}>
											<Avatar shape="circular" variant="image" src={avatarExample1} />
											<Avatar shape="circular" variant="image" src={avatarExample2} />
											<Avatar shape="circular" variant="image" src={avatarExample3} />
											<Avatar shape="circular" variant="solid" color="blue" initials="AB" />
											<Avatar shape="circular" variant="solid" color="green" initials="CD" />
										</AvatarGroup>
									</div>
								</div>
							</div>
						</Card>

						<Card heading="Badges de Status (Code Review)">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>

								{/* 1. All Colors */}
								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Todas as Cores (Solid)</h3>
									<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
										<Badge variant="solid" color="dark">Dark</Badge>
										<Badge variant="solid" color="gray">Gray</Badge>
										<Badge variant="solid" color="green">Green</Badge>
										<Badge variant="solid" color="blue">Blue</Badge>
										<Badge variant="solid" color="red">Red</Badge>
										<Badge variant="solid" color="yellow">Yellow</Badge>
										<Badge variant="solid" color="white">White</Badge>
									</div>
								</div>

								{/* 2. All Variants */}
								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Todas as Variantes (Blue)</h3>
									<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
										<Badge variant="solid" color="blue">Solid</Badge>
										<Badge variant="soft" color="blue">Soft</Badge>
										<Badge variant="outlined" color="blue">Outlined</Badge>
										<Badge variant="white">White Variant</Badge>
									</div>
								</div>

								{/* 3. All Sizes */}
								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tamanhos & Formatos</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Badge variant="soft" color="dark" size="sm" shape="rounded">Small Rounded</Badge>
										<Badge variant="soft" color="dark" size="md" shape="rounded">Medium Rounded</Badge>
										<Badge variant="soft" color="dark" size="lg" shape="rounded">Large Rounded</Badge>

										<div style={{ borderLeft: '1px solid #e5e7eb', height: '24px' }}></div>

										<Badge variant="soft" color="gray" size="md" shape="pilled">Pilled Form</Badge>
									</div>
								</div>

								{/* 4. Edge Cases */}
								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Edge Cases & Slots</h3>
									<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '500px' }}>
										<Badge variant="solid" color="green" size="lg">
											Status de Operação Muito Longo Que Deve Sofrer Truncamento
										</Badge>

										<Badge variant="white" color="red" size="sm">
											Ação Requerida (Leading Icon)
										</Badge>

										<Badge
											variant="outlined"
											color="yellow"
											
											onClose={() => console.log('Badge closed!')}
										>
											Alerta Pendente (Trailing + Close)
										</Badge>
									</div>
								</div>

							</div>
						</Card>
					</div>
				</section>

				{/* ROW 2: Botões e Interações */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Ações e Interações</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
						<Card heading="Button (Matriz Visual)" subtitle="Nova arquitetura usando Base UI">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cores (Primary, Secondary, Destructive)</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
										<Button color="primary" variant="solid">Primary</Button>
										<Button color="secondary" variant="solid">Secondary</Button>
										<Button color="destructive" variant="solid">Destructive</Button>
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Variantes de Preenchimento (Primary)</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Button color="primary" variant="solid">Solid</Button>
										<Button color="primary" variant="soft">Soft</Button>
										<Button color="primary" variant="outline">Outline</Button>
										<Button color="primary" variant="ghost">Ghost</Button>
										<Button color="primary" variant="link">Link</Button>
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tamanhos & Estados</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Button size="sm" color="secondary" variant="outline">Small</Button>
										<Button size="md" color="secondary" variant="outline">Medium</Button>
										<Button size="lg" color="secondary" variant="outline">Large</Button>
										<div style={{ borderLeft: '1px solid #e5e7eb', height: '24px' }}></div>
										<Button color="primary" disabled>Disabled</Button>
										<Button color="primary" loading>Submit</Button>
									</div>
								</div>

							</div>
						</Card>

						<Card heading="ButtonIcon (Matriz Visual)" subtitle="Novo componente padronizado com Base UI">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cores (Primary, Secondary, Destructive)</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
										<ButtonIcon color="primary" variant="solid" aria-label="Ação primária">
											<BellIcon />
										</ButtonIcon>
										<ButtonIcon color="secondary" variant="solid" aria-label="Ação secundária">
											<BellIcon />
										</ButtonIcon>
										<ButtonIcon color="destructive" variant="solid" aria-label="Ação destrutiva">
											<BellIcon />
										</ButtonIcon>
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Variantes de Preenchimento (Primary)</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<ButtonIcon color="primary" variant="solid" aria-label="Solid"><BellIcon /></ButtonIcon>
										<ButtonIcon color="primary" variant="soft" aria-label="Soft"><BellIcon /></ButtonIcon>
										<ButtonIcon color="primary" variant="outline" aria-label="Outline"><BellIcon /></ButtonIcon>
										<ButtonIcon color="primary" variant="ghost" aria-label="Ghost"><BellIcon /></ButtonIcon>
										<ButtonIcon color="primary" variant="link" aria-label="Link"><BellIcon /></ButtonIcon>
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tamanhos & Estados</h3>
									<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<ButtonIcon size="sm" color="secondary" variant="outline" aria-label="Small"><InfoIcon /></ButtonIcon>
										<ButtonIcon size="md" color="secondary" variant="outline" aria-label="Medium"><InfoIcon /></ButtonIcon>
										<ButtonIcon size="lg" color="secondary" variant="outline" aria-label="Large"><InfoIcon /></ButtonIcon>
										<div style={{ borderLeft: '1px solid #e5e7eb', height: '24px' }}></div>
										<ButtonIcon color="primary" disabled aria-label="Disabled"><BellIcon /></ButtonIcon>
										<ButtonIcon color="primary" loading loadingIndicator={<Icon name="Loader" color="currentColor" className="demo-spin" />} aria-label="Loading"><BellIcon /></ButtonIcon>
									</div>
								</div>

							</div>
						</Card>

						<Card heading="Toasts e Notificações" subtitle="Integração do Botão com eventos globais.">
							<div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
								<Button color="primary" variant="solid" size="md" onClick={() => handleShowToast('success')}>
									Toast Success
								</Button>
								<Button color="secondary" variant="outline" size="md" onClick={() => handleShowToast('error')}>
									Toast Error
								</Button>
								<Button color="secondary" variant="ghost" size="md" onClick={() => handleShowToast('warning')}>
									Toast Warning
								</Button>

								<div style={{ borderLeft: '1px solid #e5e7eb', height: '32px', margin: '0 0.5rem' }}></div>

								<Tooltip content="Notificações do Sistema" placement="top" variant="default">
									<ButtonIcon aria-label="Notificações" variant="outline" onClick={() => handleShowToast('info')}>
										<BellIcon />
									</ButtonIcon>
								</Tooltip>

								<Tooltip content="Ajuda e Documentação" placement="bottom" variant="light">
									<ButtonIcon aria-label="Ajuda" variant="ghost" onClick={() => handleShowToast('info')}>
										<InfoIcon />
									</ButtonIcon>
								</Tooltip>
							</div>
						</Card>

						<Card heading="Tooltips (Smart Positioning)" subtitle="Passe o mouse sobre os botões para testar as 12 âncoras nativas do Floating UI.">
							<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
								<Tooltip content="Eixo Top-Start" placement="top-start" variant="default"><Button fullWidth variant="outline">Top Start</Button></Tooltip>
								<Tooltip content="Eixo Top" placement="top" variant="default"><Button fullWidth variant="outline">Top</Button></Tooltip>
								<Tooltip content="Eixo Top-End" placement="top-end" variant="default"><Button fullWidth variant="outline">Top End</Button></Tooltip>

								<Tooltip content="Eixo Bottom-Start" placement="bottom-start" variant="light"><Button fullWidth variant="outline">Bottom Start</Button></Tooltip>
								<Tooltip content="Eixo Bottom" placement="bottom" variant="light"><Button fullWidth variant="outline">Bottom</Button></Tooltip>
								<Tooltip content="Eixo Bottom-End" placement="bottom-end" variant="light"><Button fullWidth variant="outline">Bottom End</Button></Tooltip>

								<Tooltip content="Conteúdo muito extenso para testar word-break e limites máximos da caixa" placement="right" variant="default"><Button fullWidth variant="ghost">Right (Texto Longo)</Button></Tooltip>
								<Tooltip content="Escondido" disabled placement="bottom" variant="default"><Button fullWidth variant="ghost">Tooltip Disabled</Button></Tooltip>
								<Tooltip content="Eixo Left" placement="left" variant="light"><Button fullWidth variant="ghost">Left</Button></Tooltip>
							</div>
						</Card>
					</div>
				</section>

				{/* ROW 3: Formulários */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Controles de Formulário</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
						<Card heading="Checkbox" subtitle="Demonstração dos estados e variações.">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipos (Solid / Soft)</h3>
									<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
										<Checkbox type="solid" defaultChecked label="Solid Checkbox" />
										<Checkbox type="soft" defaultChecked label="Soft Checkbox" />
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estados de Feedback</h3>
									<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Checkbox type="solid" invalid label="Invalid" description="Erro detectado" />
										<Checkbox type="solid" success defaultChecked label="Success" description="Tudo certo" />
										<div style={{ borderLeft: '1px solid #e5e7eb', height: '40px' }}></div>
										<Checkbox type="soft" invalid defaultChecked label="Soft Invalid" />
										<Checkbox type="soft" success defaultChecked label="Soft Success" />
									</div>
								</div>

								<div>
									<h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outros</h3>
									<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
										<Checkbox disabled label="Disabled" />
										<Checkbox disabled defaultChecked label="Disabled Checked" />
										<Checkbox indeterminate label="Indeterminate" />
										<Checkbox boxed label="Boxed Checkbox" endIcon={<InfoIcon />} />
									</div>
								</div>

							</div>
						</Card>

						<Card heading="Input" subtitle="Novos inputs com as variações Bordered, Gray e Underline.">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
								<Input label="E-mail" variant="bordered" placeholder="nome@empresa.com" required />
								<Input label="Busca" variant="gray" placeholder="Pesquisar..." />
								<Input label="Assinatura" variant="underline" placeholder="Digite seu nome completo" />

								<div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
									<Input label="Pilled Input" variant="bordered" shape="pilled" placeholder="Formato pilled..." />
									<Input label="Small Input" variant="bordered" size="sm" placeholder="Tamanho pequeno..." />
								</div>

								<div style={{ display: 'flex', gap: '1rem' }}>
									<Input label="Inválido" variant="bordered" invalid feedbackMessage="Este campo é obrigatório." defaultValue="Valor incorreto" />
									<Input label="Sucesso" variant="bordered" success feedbackMessage="Nome de usuário disponível!" defaultValue="lucia_dev" />
								</div>
							</div>
						</Card>
					</div>
				</section>

				{/* ROW 4: Exibição de Dados */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Visualização de Dados (Progress, Sinais e Tendências)</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
						<Card heading="Progresso (Padrão Híbrido)" subtitle="Progress Bar (V2)">
							<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Base</h4>
									<Progress value={50} />
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Title Label</h4>
									<Progress value={50} label="Progress title" showValue />
								</div>
								<div>
									<h4 style={{ marginBottom: '1.5rem', fontSize: '14px', fontWeight: 600 }}>Floating Label (Top)</h4>
									<Progress value={70} floatingBadge="top" />
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Floating Label (Bottom)</h4>
									<Progress value={70} floatingBadge="bottom" />
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Trailing Label</h4>
									<Progress value={30} showValue="trailing" />
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Within Progress Bar</h4>
									<Progress value={50} size="lg" showValue="inside" />
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Steps</h4>
									<Progress value={50} variant="steps" steps={4} />
								</div>
							</div>
						</Card>

						<Card heading="Progresso (Composição)" subtitle="Customizações extremas">
							<div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
								<p style={{ fontSize: '14px', color: '#64748b' }}>
									Se as opções nativas não atenderem, você pode usar <code>ProgressRoot</code>, <code>ProgressTrack</code>, etc., para construir layouts customizados livremente.
								</p>

								{/* Custom Layout via Composition */}
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Composição Customizada (Ícone Exemplo)</h4>
									<ProgressRoot value={85}>
										<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
											<ProgressLabel style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
												<InfoIcon /> Finalizando...
											</ProgressLabel>
											<ProgressValue />
										</div>
										<ProgressTrack>
											<ProgressIndicator />
										</ProgressTrack>
									</ProgressRoot>
								</div>
							</div>
						</Card>

						<Card heading="Integrações" subtitle="Capacidade (Composição Pura)">
							<div style={{ marginTop: '1.5rem' }}>
								<ProgressRoot value={85} size="lg">
									<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
											<Icon name="Archive" size={16} color="muted" />
											<ProgressLabel style={{ fontWeight: 600 }}>Memória Utilizada</ProgressLabel>
										</div>
										<ProgressValue style={{ color: '#d97706' }} />
									</div>
									<ProgressTrack>
										<ProgressIndicator style={{ backgroundColor: '#f59e0b' }} />
									</ProgressTrack>
								</ProgressRoot>
							</div>
						</Card>

						<Card heading="Etapas" subtitle="Progresso por Passos (Steps)">
							<div style={{ marginTop: '1.5rem' }}>
								<Progress value={50} variant="steps" steps={4} size="md" showValue={true} />
							</div>
						</Card>

						<Card heading="Desempenho da Turma" subtitle="Componente ActivityIndicator isolado">
							<div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
								<ActivityIndicator value={72} label="Engajamento" activityTrend="2.1%" activityTrendDirection="up" />
								<ActivityIndicator
									value={null}
									label="Empty State"
									activityTrendDirection="down"
								/>
								<ActivityIndicator
									value={85}
									label="Faturamento"
									activityTrend="R$ 1.500"
									activityTrendDirection="up"
									formatValue={(val) => `R$ ${val !== null ? val * 100 : 0}`}
									trendUpIcon="🚀"
									trendUpAriaLabel="Subiu"
								/>
							</div>
						</Card>

						<Card heading="Conectividade" subtitle="Componente SignalBars isolado">
							<CardContent>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
									<SignalBars value={10} />
									<SignalBars value={25} />
									<SignalBars value={50} />
									<SignalBars value={100} />
									<h4 style={{ margin: '1rem 0 0.5rem', fontSize: '14px', fontWeight: 600 }}>Com formatLabel customizado</h4>
									<SignalBars
										value={80}
										formatLabel={(val, level) => `Sinal em ${val}% (${level})`}
									/>
									<SignalBars
										value={null}
										formatLabel={() => 'Buscando rede...'}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* ROW 5: Input Group */}
				<section>
					<h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Input Group (Composição de Inputs)</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
						<Card heading="Horizontal — Gaps" subtitle="InputGroup horizontal com diferentes espaçamentos (none, sm, md, lg).">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Gap: none</h4>
									<InputGroup width="100%" layout="horizontal" gap="none">
										<Input rounded="start" variant="bordered" placeholder="Name" startIcon={<Icon name="User" />} startDivider startBackgroundColor />
										<Input rounded="none" variant="bordered" placeholder="Last Name" />
										<Input rounded="end" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									</InputGroup>
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Gap: sm</h4>
									<InputGroup width="100%" layout="horizontal" gap="sm">
										<Input rounded="start" variant="bordered" placeholder="Name" startIcon={<Icon name="User" />} startDivider startBackgroundColor />
										<Input rounded="none" variant="bordered" placeholder="Last Name" />
										<Input rounded="end" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									</InputGroup>
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Gap: md</h4>
									<InputGroup width="100%" layout="horizontal" gap="md">
										<Input rounded="start" variant="bordered" placeholder="Name" startIcon={<Icon name="User" />} startDivider startBackgroundColor />
										<Input rounded="none" variant="bordered" placeholder="Last Name" />
										<Input rounded="end" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									</InputGroup>
								</div>
								<div>
									<h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 600 }}>Gap: lg</h4>
									<InputGroup width="100%" layout="horizontal" gap="lg">
										<Input rounded="start" variant="bordered" placeholder="Name" startIcon={<Icon name="User" />} startDivider startBackgroundColor />
										<Input rounded="none" variant="bordered" placeholder="Last Name" />
										<Input rounded="end" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									</InputGroup>
								</div>
							</div>
						</Card>

						<Card heading="Horizontal — Feedback" subtitle="InputGroup com mensagem de erro.">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
								<InputGroup width="100%" layout="horizontal" gap="sm" feedbackType="error" feedbackMessage="This is an error message with a long text to test the feedback message">
									<Input rounded="start" variant="bordered" placeholder="Name" startIcon={<Icon name="User" />} startDivider startBackgroundColor />
									<Input rounded="none" variant="bordered" placeholder="Last Name" invalid />
									<Input rounded="end" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
								</InputGroup>
							</div>
						</Card>

						<Card heading="Horizontal — Com Botões" subtitle="InputGroup composto com Button.">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
								<InputGroup width="100%" layout="horizontal" gap="none">
									<div style={{ width: '150px' }}>
										<Button rounded="start" leftIcon={<Icon name="Search" />} variant="solid" size="md" fullWidth>Search</Button>
									</div>
									<Input rounded="none" variant="bordered" placeholder="Full Name" />
									<div style={{ width: '150px' }}>
										<Button rounded="none" leftIcon={<Icon name="Trash" />} variant="solid" color="destructive" size="md" fullWidth>Delete</Button>
									</div>
									<div style={{ width: '150px' }}>
										<Button rounded="end" leftIcon={<Icon name="Check" />} variant="solid" color="primary" size="md" fullWidth>Confirm</Button>
									</div>
								</InputGroup>
							</div>
						</Card>

						<Card heading="Vertical — Gaps" subtitle="InputGroup vertical com diferentes espaçamentos.">
							<div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
								<InputGroup width="100%" layout="vertical" gap="none">
									<Input rounded="top" variant="bordered" placeholder="Website" startIcon="http://" startDivider startBackgroundColor />
									<Input rounded="none" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									<Input rounded="bottom" variant="bordered" placeholder="Search" endIcon={<Icon name="Search" />} endDivider endBackgroundColor />
								</InputGroup>
								<InputGroup width="100%" layout="vertical" gap="sm">
									<Input rounded="top" variant="bordered" placeholder="Website" startIcon="http://" startDivider startBackgroundColor />
									<Input rounded="none" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									<Input rounded="bottom" variant="bordered" placeholder="Search" endIcon={<Icon name="Search" />} endDivider endBackgroundColor />
								</InputGroup>
							</div>
						</Card>

						<Card heading="Vertical — Feedback" subtitle="InputGroup vertical com mensagem de erro.">
							<div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
								<InputGroup width="100%" layout="vertical" gap="sm">
									<Input rounded="top" variant="bordered" placeholder="Website" startIcon="http://" startDivider startBackgroundColor />
									<Input rounded="none" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor />
									<Input rounded="bottom" variant="bordered" placeholder="Search" endIcon={<Icon name="Search" />} endDivider endBackgroundColor />
								</InputGroup>
								<InputGroup width="100%" layout="vertical" gap="md" feedbackType="error" feedbackMessage="This is an error message with a long text to test the feedback message">
									<Input rounded="top" variant="bordered" placeholder="Website" startIcon="http://" startDivider startBackgroundColor />
									<Input rounded="none" variant="bordered" placeholder="Mail" startIcon={<Icon name="Mail" />} startDivider startBackgroundColor invalid />
									<Input rounded="bottom" variant="bordered" placeholder="Search" endIcon={<Icon name="Search" />} endDivider endBackgroundColor />
								</InputGroup>
							</div>
						</Card>

						<Card heading="Vertical — Com Botões" subtitle="InputGroup vertical composto com Button.">
							<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
								<InputGroup width="250px" layout="vertical" gap="none">
									<Button rounded="top" leftIcon={<Icon name="Search" />} variant="solid" size="md" fullWidth>Search</Button>
									<Input rounded="none" variant="bordered" placeholder="Full Name" />
									<Button rounded="none" leftIcon={<Icon name="Trash" />} variant="solid" color="destructive" size="md" fullWidth>Delete</Button>
									<Button rounded="bottom" leftIcon={<Icon name="Check" />} variant="solid" color="primary" size="md" fullWidth>Confirm</Button>
								</InputGroup>
							</div>
						</Card>
					</div>
				</section>

			</div>

			{/* Viewport para o Toast no canto inferior direito */}
			<ToastViewport position="bottom-right" />
		</div>
	)
}

export function LegacyAppPlayground() {
	return (
		<ToastProvider>
			<ShowcaseContent />
		</ToastProvider>
	)
}
